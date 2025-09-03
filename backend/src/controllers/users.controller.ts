import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userId  = req.query.userId as string;

        if (!userId) {
            res.status(400).json({ error: 'Pliease fill in all fields'});
            return;
        }

        const userConversations = await prisma.conversation.findMany({
            where: {
                participantIds: { has: userId },
            },
            select: { id: true },
        });

        const conversationIds = userConversations.map((c: {id: string }) => c.id) || [];

        const data = await prisma.user.findMany({
            where: {
                id: { not: userId }, 
                conversations: {
                none: { id: { in: conversationIds } }, 
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
                converationsIds: true
            }
        });

        if(!data) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        res.status(200).json(data);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Can not retrieve all users ', err.message);
        } else {
            console.log('Can not retrieve all users ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    }
}
