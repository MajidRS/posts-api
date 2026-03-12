import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/errorMiddleware.js';

function generateToken (userId) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1h"});
    return token;
}
function verifyToken (token) {
    try {
        const encoded = jwt.verify(token, process.env.JWT_SECRET);
        return encoded.userId;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AppError(401, 'Token Expired')
        }
        if (error.name === "JsonWebTokenError") {
            throw new AppError(401, 'Invalid Token')
        }
        throw error;
    }
}

export {generateToken, verifyToken}