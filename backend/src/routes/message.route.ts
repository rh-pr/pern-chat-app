import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessages } from '../controllers/messages.controller.js';
import multer from 'multer';


const upload = multer({ dest: "dist" });
const fields =  upload.fields([
    {name:"foto", maxCount: 5},
    {name:"file", maxCount: 5},
    {name:"audio", maxCount: 10}
  ]);

const router = express.Router();

router.get('/getMessages', protectRoute, getMessages)
router.post('/sendMessage', protectRoute, fields,  sendMessage)


export default router;