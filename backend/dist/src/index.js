import express from 'express';
import doten from 'dotenv';
import cors from 'cors';
import path from "path";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import usersRoutes from './routes/users.route.js';
import conversationsRoutes from './routes/conversations.route.js';
import passwordRoutes from './routes/password.route.js';
import { app, server } from "./socket/socket.js";
import prisma from './db/prisma.js';
doten.config();
const PORT = 5000;
const __dirname = path.resolve();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/password", passwordRoutes);
if (process.env.NODE_ENV !== "development") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
