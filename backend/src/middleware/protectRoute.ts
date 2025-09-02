import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from'jsonwebtoken';
import prisma from '../db/prisma.js';

interface DecodedToken extends JwtPayload {
    userId: string
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string
            }
        }
    }
}


const protectRoute =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({error: ' Unauthorized - Not token provide...'})
            return;
        }

        const decode = jwt.verify(token, (process.env.JWT_SECRET || '')) as DecodedToken;

        if(!decode) {
            res.status(401).json({error: ' Unauthorized - Not token provide...'})
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: decode.userId },
            select: { id: true, username: true, fullName: true, profilePic: true }
        });

        if (!user) {
            res.status(401).json({error: ' User not found...'})
            return;
        }

        req.user = user;

        next();

    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log('Error in signup controller ', error.message)
        } else {
            console.log('Error in signup controller ', error)
        }
        res.status(500).json({error: ' Internal server error...'})
    }

}

export default protectRoute;