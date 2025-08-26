import express from "express";
import { login, logout, signup, getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import multer from 'multer';

const router = express.Router();

const upload = multer({ dest: "dist" });

router.get('/profile', protectRoute, getMe);
router.post('/signup', upload.single("profilePic"), signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;