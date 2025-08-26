import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userId  = req.query.userId as string;

        if (!userId) {
            res.status(400).json({ error: 'Pliease fill in all fields'});
            return;
        }
        const data = await prisma.user.findMany({
            where: {
                id: {not: userId}
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true
            }
        });

        if(!data) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        res.status(200).json(data);

    } catch (err:any) {
        console.log('Can not retrieve all users ', err.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}
