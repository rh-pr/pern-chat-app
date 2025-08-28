import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { body } = req.body;
        const  receiverId  = req.query.receiverId as string;
        const senderId = req.user.id;

        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId]
                }
            }
        });

        if ( !conversation ) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId]
                    }
                }
            })
        };

        const newMsg = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversation.id,
                body: body
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
        const chatId = req.query.chatId as string;
        const senderId = req.user.id;

        if (!chatId || !senderId) {
            console.log('chat: ', chatId);
            console.log('senderId: ', senderId);
            
            res.status(404).json({error: 'Invalid credentials'});
            return;
        }

        const data = await prisma.message.findMany({
            where: {
                senderId: {
                    equals: senderId
                },
                conversationId: {
                    equals: chatId
                }
            }
        });


        if ( !data ) {
            res.status(400).json({error: 'Error by retrieving data from db...'});
            return;
        }
        
        res.status(200).json(data);


    }  catch(error: any) {
        console.log('Error in signup controller ', error.message)
        res.status(500).json({error: ' Internal server error...'})
    }
}


