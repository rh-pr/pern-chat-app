import express from 'express';
import doten from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import usersRoutes from './routes/users.route.js';
import conversationsRoutes from './routes/conversations.route.js';

import prisma from './db/prisma.js';

doten.config();
const PORT = 5000;

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL  || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/conversations", conversationsRoutes)
app.use("/api/password", (req, res) => {
  res.status(201)
  res.send('Password reset endpoint');
})



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
