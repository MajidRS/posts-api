import {Buffer} from 'buffer';
import {handelErrors, AppError} from '../middlewares/errorMiddleware.js';
import {readFileJSON} from '../utils/fileUtils.js';
import {generateToken} from '../utils/tokenUtils.js';
import { sendResponse } from "../utils/sendResponseUtil.js";

async function handelLogin (req, res) {
    try {
        let authBasic = req.headers["authorization"];
        if (!authBasic || !authBasic.startsWith ("Basic ")) {
            throw new AppError(401, 'Missing Authorization Header');
        }
        const [username, password] = Buffer.from(authBasic.split(" ")[1], "base64").toString().split(":");
        const users = await readFileJSON ('src/data/users.json');
        const user = users.find(user => user.username === username);
        if (!user || user.password !== password) {
            throw new AppError(401, "Not Authorized");
        }
        const token = generateToken (user.id);
        const response =  {
            message: "login successfly",
            token: token,
            expirIn: 35000
        }
        sendResponse (res, 200, response);
    } catch (error) {
        handelErrors (res, error);
    }
}

export {handelLogin}