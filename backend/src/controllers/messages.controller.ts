import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: reseiverId } = req.params;
        const senderId = req.user.id;

        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, reseiverId]
                }
            }
        });

        if ( !conversation ) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, reseiverId]
                    }
                }
            })
        };

        const newMsg = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversation.id,
                body: message
            }
        });

        if (newMsg) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    messages: {
                        connect: {
                            id: newMsg.id
                        }
                    }
                }
            })
        }

        res.status(201).json(newMsg);



    }  catch(error:any) {
        console.log('Error in signup controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const getMessages = async (req: Request, res: Response ) => {
    try {
        const { id: chatId } = req.params;
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, chatId]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        if ( !conversation ) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(conversation.messages);
        

    }  catch(error: any) {
        console.log('Error in signup controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}