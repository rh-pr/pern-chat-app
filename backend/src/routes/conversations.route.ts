import express from "express";
import { addConversation } from "../controllers/conversations.controller.js";


const router = express.Router();

router.get('/create', addConversation);

export default router;