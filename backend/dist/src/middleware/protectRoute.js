import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ error: ' Unauthorized - Not token provide...' });
            return;
        }
        const decode = jwt.verify(token, (process.env.JWT_SECRET || ''));
        if (!decode) {
            res.status(401).json({ error: ' Unauthorized - Not token provide...' });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { id: decode.userId },
            select: { id: true, username: true, fullName: true, profilePic: true }
        });
        if (!user) {
            res.status(401).json({ error: ' User not found...' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log('Error in signup controller ', error.message);
        res.status(500).json({ error: ' Internal server error...' });
    }
};
export default protectRoute;
