import { AppError } from "./errorMiddleware.js";
import {verifyToken} from "../utils/tokenUtils.js";

function authenticateToken(req, res) {
    try {
        let authBearer = req.headers["authorization"];
        if (!authBearer || !authBearer.startsWith('Bearer ')) {
            throw new AppError (401, "Token Required");
        }
        const token = authBearer.split(' ')[1];
        req.userId = verifyToken (token);
        return true;
    } catch (error) {
        throw error;
    }
}

export {authenticateToken}