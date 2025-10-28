import { Request, Response } from "express";
import prisma from "../db/prisma.js";


export const updateSettings = async (req: Request, res: Response) => {
    try {
        const body = req.body;
    

        if (!body) {
            res.status(400).json({ error: 'Please fill in all fields'});
            return;
        }

        const data = await prisma.userSettings.update({
            where: {
                userId: body.userId,
            },
            data: {
                sound: body.sound,
                thema: body.thema,
            }
         });

         if (!data) {
            res.status(404).json({error: 'Failed updating '});
            return;
         }

         res.status(200).json({
            sound: data.sound,
            thema: data.thema
         });


    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Can not update settings: ', err.message);
        } else {
            console.log('Can not update settings: ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    }
}

export const getSettings = async (req: Request, res: Response) => {
    try {
        const userId  = req.query.userId as string;

        if (!userId) {
            res.status(400).json({error: 'Cannot find user ', userId});
            return;
        }

        const data = await prisma.userSettings.findFirst({
            where: {
                userId: userId
            }
        });

        if (!data) {
            res.status(404).json({error: 'Failed retrieving settings'});
            return;
        }


        res.status(200).json({data: data});

    } catch (err: unknown) {
        if (err instanceof Error) {
             console.log('Can not update settings: ', err.message);
        } else {
            console.log('Can not update settings: ', err);
        }
        res.status(500).json({ error: 'Internal server error...' });
    }
}