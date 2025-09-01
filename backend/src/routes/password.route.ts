import express from 'express';
import { emailVerification, codeConfirmation, passwordReset } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/sendEmail', emailVerification);
router.post('/confirm', codeConfirmation);
router.post('reset', passwordReset);



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

export default router;