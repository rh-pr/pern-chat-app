import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const emailVerification = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: 'Invalide credentionals'});
            return;
        }

        const userId = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email
                }
            },
            select: {id: true}
        });

        if (!userId) {
            res.status(404).json({error: 'Users with this email does not exist in bd'});
        }
           
    } catch (err) {
        console.log('Can not find user with this email ', err)
        res.status(500).json({error: ' Internal server error...'})
    }
}

export const codeConfirmation = (req: Request, res: Response) => {

}

export const passwordReset = (req: Request, res: Response) => {

}



// app.use("/api/password/sendEmail", (req, res) => {
//   res.status(201)
//   res.json({data: {
//     expireAt: new Date (Date.now() + 5 * 60 * 1000)
//     // error: 'This email not found'
//   }})
// })

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