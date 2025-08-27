import { Request, Response,RequestHandler  } from "express";
import prisma from "../db/prisma.js";

export const addConversation  = async (req: Request, res: Response) => {
    try {
        const firstParticipant = req.query.firstParticipant as string;
        const secondParticipant = req.query.secondParticipant as string;

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

         if (!data || !data.id) {
             res.status(500).json({ error: "Conversation creation failed" });
             return;
        } 


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

export const getActiveConversation = async (req: Request, res: Response) => {
    try {
        
        const userId = req.query.userId as string;

        if (!userId) {
            res.status(400).json({error: 'Invalid credentionals'});
            return;
        }

        const data = await prisma.conversation.findMany({
            where: {
                participantIds: {
                    has: userId
                }
            },
            select: {
                id: true,
                participants: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true
                    }
                },
                messages: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 1,
                    include: {
                        sender: {
                            select: {
                                id: true,
                                fullName: true,
                                profilePic: true
                            }
                        }
                    }
                }
            }
        });

         const conversations = data.filter(c => c.participants.length > 0);

        if (conversations.length === 0) {
             res.status(404).json({ error: 'No conversations found' });
             return;
        }

        res.status(200).json(data);
    

    } catch (err:any) { 
        console.log('Error by retrieving conversations ', err.message)
        res.status(500).json({error: ' Internal server error whz...'})
    }
}


