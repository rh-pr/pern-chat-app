import express from "express";
import { addConversation, getActiveConversation } from "../controllers/conversations.controller.js";


const router = express.Router();


router.get('/', getActiveConversation);
router.get('/create', addConversation);

export default router;