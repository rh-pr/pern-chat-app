import { Request, Response } from "express"
import prisma from "../db/prisma.js";
import { uploadAndDelete } from "../utils/uploadAndDelete.js";

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
        
       
        const filesUrl = await Promise.all(    
            files.map( async (file) => {
                const originalName = file.originalname.split('.').slice(0, -1).join('.');
                const customName = `${originalName}_${Date.now()}`;
                return await uploadAndDelete(file.path, `files/${conversationId}`, customName);
            })
        );
        
        const imagesUrl = await Promise.all(
            fotos.map( async(foto) => {
                 const originalName = foto.originalname.split('.').slice(0, -1).join('.');
                const customName = `${originalName}_${Date.now()}`;
                return await uploadAndDelete(foto.path, `images/${conversationId}`, customName);
            })
        );
        

        const newMsg = await prisma.message.create({
            data: {
                senderId,
                conversationId: conversationId,
                body: body,
                images: imagesUrl,
                files: filesUrl,
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


