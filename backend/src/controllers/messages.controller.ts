import { Request, Response } from "express"
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { body, conversationId } = req.body;
        const senderId = req.user.id;

        
        if ( !senderId || !conversationId) {
            res.status(404).json({error: "Invalid credentionals"});
            return;
        }

        const uploadFiles = req.files as {
            [filename: string]:Express.Multer.File[];
        }

        const files = uploadFiles?.file || [];
        const fotos = uploadFiles?.foto || [];

        
        const newMsg = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversationId,
                body: body,
            }
        });



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


