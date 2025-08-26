import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const addConversation = async (req: Request, res: Response) => {
    try {
        const firstParticipant = req.query.firstParticipant as string;
        const secondParticipant = req.query.secondParticipant as string;

        console.log('I am here', firstParticipant, secondParticipant);
        

        if(!firstParticipant || !secondParticipant) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const data = await prisma.conversation.create({
            data: {
                participantIds: [firstParticipant, secondParticipant],
                participants: {
                    connect: [
                        { id: firstParticipant },
                        { id: secondParticipant }
                    ]
                },
            },
            include: {
                participants: true
            }
        });

        if (!data) {
            res.status(400).json({error: 'Invalid credentials'});
            return;
        }

        const newConv = {
            id: data.id,
            participants: data.participants,
            lastMessage: null
        }

        res.status(201).json(newConv);

        await prisma.user.updateMany({
            where: {
                id: { in: [firstParticipant, secondParticipant] }
            },
            data: {
                    converationsIds: {
                    push: data.id 
                }
            }
        });

    } catch(err:any) {
        console.log('Error by adding conversation ', err.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}