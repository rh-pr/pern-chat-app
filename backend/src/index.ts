import express from 'express';
import doten from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'

doten.config();
const PORT = 5000;


const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})