import express from 'express';
import { emailVerification, codeConfirmation, passwordReset } from '../controllers/passwordController.js';

const router = express.Router();

console.log('email hehrehrefesh');

router.post('/sendEmail', emailVerification);
router.post('/confirm', codeConfirmation);
router.post('reset', passwordReset);

export default router;