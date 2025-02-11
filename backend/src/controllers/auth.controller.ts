import { Request, Response } from "express";
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';

import generateToken  from '../utils/generateToken.js';

// for default avatar use site:  https://avatar-placeholder.iran.liara.run/

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if ( !fullName || !username || !password || !confirmPassword || !gender ) {
            res.status(400).json({ error: 'Pliease fill in all fields'});
            return;
        }

        if (password !== confirmPassword) {
            res.status(400).json({error: 'Passwords do not match'});
            return;
        }

        const user = await prisma.user.findUnique({where: { username }});

        if ( user ) {
            res.status(400).json({error: 'User already exist...'});
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
            }
        });

        if ( newUser ) {

            generateToken( newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: 'Invalid user data'});
        }

    } catch(error: any) {
        console.log('Error in signup controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const { username, password } = req.body;

        const user = await prisma.user.findUnique({ where: { username }});
      
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
      
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if ( !isPasswordCorrect ) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch(error: any) {
        console.log('Error in login controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const logout = async (req: Request, res: Response)=> {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({message: 'Logged out successfully...'})
    } catch(error: any) {
        console.log('Error in logout controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.id}});

        if( !user ) {
            res.status(401).json({error: ' User not found..'});
            return;
        }

        res.status(200).json({
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        });

    } catch(error: any) {
        console.log('Error in logout controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}