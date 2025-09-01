import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { sendEmailToUser } from "../utils/sendEmailToUser.js";

export const emailVerification = async (req: Request, res: Response) => {
    try {        
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Invalide credentionals'});
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email
                }
            },
            select: {id: true}
        }) ;


        if (!user) {
            res.status(404).json({error: 'Users with this email does not exist in bd'});
            return;
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        const data = await prisma.temporaryCode.upsert({
            where: {
                userId: user.id
            },
            update: {
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                code: `${otp}`,
                type: 'generated'
            },
            create: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                code:  `${otp}`,
                type: 'generated'
            }
        });

        if (!data) {
            res.status(401).json({error: 'Internal error. Try again later'})
            return;
        }

        await sendEmailToUser(email, otp);
        
        res.status(200).json({
            data: {
                expireAt: data.expiresAt,
                userId: data.userId
            }
        });

    } catch (err) {
        console.log('Can not find user with this email ', err)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const codeConfirmation = async(req: Request, res: Response) => {
try {        
        const { code, userId } = req.body;

        
        if (!code || !userId) {
            res.status(400).json({ error: 'Invalide credentionals'});
            return;
        }

        const data = await prisma.temporaryCode.findFirst({
            where: {
                userId
            }
        });

        if (!data) {
            res.status(401).json({success: true})
            return;
        }

        if (code !== data.code.toString()) {
            res.status(401).json({error: 'Code is incorrect'})
            return;
        }

        if (data.expiresAt < new Date()) {
            res.status(401).json({error: 'Time is expired... Try again'})
            return;
        }

        await prisma.temporaryCode.update({
            where: {
                userId: userId
            },
            data: {
                type: 'confirmed'
            }
        })
        
        res.status(200).json({succsess: true});

    } catch (err) {
        console.log('Can not find code ', err)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const passwordReset = (req: Request, res: Response) => {

}

// app.use("/api/password/confirm", (req, res) => {
//   res.status(201)
//   res.json({data: {
//     userId: '11'
//     // error: 'This email not found'
//   }})
// })

// app.use("/api/password/reset", (req, res) => {
//   res.status(201)
//   res.json({data: {
//     success: 'true'
//     // error: 'This email not found'
//   }})
// })