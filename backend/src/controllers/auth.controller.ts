import { Request, RequestHandler, Response } from "express";
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';

import generateToken  from '../utils/generateToken.js';
import { uploadAndDelete } from "../utils/uploadAndDelete.js";


// for default avatar use site:  https://avatar-placeholder.iran.liara.run/

export const signup = async (req:  Request, res: Response) => {
    try {
        const { fullname, username, password, confirm, email, gender } = req.body;

        if ( !fullname || !username || !password || !confirm || !gender ||  !email ) {
            res.status(400).json({ error: 'Pliease fill in all fields'});
            return;
        }

        if (password !== confirm) {
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

        let profilePic = gender === 'male' ? boyProfilePic : girlProfilePic;


        if (req.file) {
            profilePic = await uploadAndDelete(req.file.path, 'profilePics', `${username}_${Date.now()}`);
        }

        const newUser = await prisma.user.create({
            data: {
                fullName: fullname,
                username,
                password: hashedPassword,
                email,
                gender,
                profilePic: profilePic
            }
        });

        if ( newUser && newUser.id) {

            generateToken( newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                fullname: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: 'Invalid user data'});
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error in signup controller ', err.message);
        } else {
            console.log('Error in signup controller ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {  password, username } = req.body;

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

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error in login controller ', err.message);
        } else {
            console.log('Error in login controller ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });

    }
}

export const logout = async (req: Request, res: Response)=> {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({message: 'Logged out successfully...'})

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error in logout controller ', err.message);
        } else {
            console.log('Error in logout controller ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    } 
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user?.id}});

        if( !user ) {
            res.status(401).json({error: ' User not found..'});
            return;
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            gender: user.gender,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Can not find the user ', err.message);
        } else {
            console.log('Can not find the user ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    }  
}

export const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        const {id, fullName, username, email, gender } = req.body;
        let profilePic;

        
        if ( !fullName || !username || !gender ||  !email ) {
           res.status(400).json({ error: 'Please fill in all fields'});
            return;
        }

        if (req.file) {
           profilePic = await uploadAndDelete(req.file.path, 'profilePics', `${username}_${Date.now()}`);
        }

         const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                fullName: fullName,
                username,
                email,
                gender,
                ...(profilePic ? { profilePic } : {})
            }
         })

         res.status(200).json({
            id: updatedUser.id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            email: updatedUser.email,
            gender: updatedUser.gender,
            profilePic: updatedUser.profilePic
         })

    } catch(err: unknown) {
        if (err instanceof Error) {
            console.log('Can not update the user', err.message);
        } else {
            console.log('Can not update the user', err);
        }
        res.status(500).json({ error: 'Internal server error...'})
    }
}