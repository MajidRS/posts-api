import 'dotenv/config'
import http from "http"
import {handelErrors, AppError} from './src/middlewares/errorMiddleware.js';
import {handelLogin} from './src/controllers/authController.js';
import {authenticateToken} from './src/middlewares/authMiddleware.js';
import {handelGetPosts, handelGetPost, handelCreatePost, handelUpdatePost, handelDeletePost} from './src/controllers/postController.js'
import {handleCors} from './src/middlewares/corsMiddleware.js';
const port = process.env.PORT || 3000;
http.createServer(async (req, res) => {
    try {
        if (handleCors(req, res)) {
            return;
        }
        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname;
        if (req.method === "POST" && path === '/login') {
            await handelLogin(req, res);
        }
        else if (req.method === "GET" && path === '/posts') {
            await handelGetPosts(req, res);
        }
        else if (req.method === "GET" && path.startsWith('/posts/')) {
            await handelGetPost(path, req, res);
        }
        else if (req.method === "POST" && path === '/posts'){
            if (!authenticateToken(req, res)) return;
            await handelCreatePost(req, res);
        }
        else if (req.method === "PUT" && path.startsWith('/posts/')){
            if (!authenticateToken(req, res)) return;
            await handelUpdatePost (path, req, res);
        }
        else if (req.method === "DELETE" && path.startsWith('/posts/')){
            if (!authenticateToken(req, res)) return;
            await handelDeletePost (path, req, res);
        }
        else {
            throw new AppError (404, "Not Found");
        }
    } catch (error) {
        handelErrors (res, error);
    }
}).listen(port, () => console.log(`Server Running On http://localhost:${port}`));
