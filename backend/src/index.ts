import express from 'express';
import doten from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'

doten.config();

const app = express();

const PORT = 50000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})