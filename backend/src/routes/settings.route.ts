import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";

const router = express.Router();

router.post('/updateSettings', updateSettings);
router.get('/getSettings', getSettings);

export default router;