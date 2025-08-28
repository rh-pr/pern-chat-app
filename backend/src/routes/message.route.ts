import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessages } from '../controllers/messages.controller.js';

const router = express.Router();

router.get('/getMessages', protectRoute, getMessages)
router.post('/sendMessage', protectRoute, sendMessage)


export default router;