import { readFileJSON, writeFileJSON} from "../utils/fileUtils.js";
import { AppError, handelErrors } from "../middlewares/errorMiddleware.js";
import { sendResponse } from "../utils/sendResponseUtil.js";

async function handelGetPosts (req, res) {
    try {
        const posts = await readFileJSON("src/data/posts.json");
        sendResponse(res, 200, posts);
    } catch (error) {
        handelErrors(res, error);
    }
}
async function handelGetPost (path, req, res) {
    const postId = path.split('/')[2];
    const posts = await readFileJSON("src/data/posts.json");
    const post = posts.find(post => post.id === +postId);
    if (!post) {
        throw new AppError (404, "Post Not Found");
    }
    sendResponse(res, 200, post);
}
async function handelCreatePost (req, res) {
    try {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        })
        req.on('end', async () => {
            try {
                body = JSON.parse(body);
            } catch {
                throw new AppError(400, "Invalid JSON");
            }
            body.id = Date.now();
            body.userId = req.userId ;
            body.createdAt = new Date().toISOString();
            let posts = await readFileJSON("src/data/posts.json");
            posts.push(body);
            posts = JSON.stringify(posts, null, 2);
            await writeFileJSON("src/data/posts.json", posts);
            sendResponse(res, 201,{message: "Post Created successfly"});
        })
    } catch (error) {
        throw new AppError(500, error.message);
    }
}
async function handelUpdatePost (path, req, res) {
    try {
        const id = path.split("/")[2];
        const userId = req.userId;
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', async () => {
            try {
                try {
                    body = JSON.parse(body);
                } catch {
                    throw new AppError(400, "Invalid JSON");
                }
                let posts = await readFileJSON("src/data/posts.json");
                let postIndex = posts.findIndex(post => post.id === +id);
                if (postIndex === -1) {
                    throw new AppError(404, "Post Not Found");
                }
                if (posts[postIndex].userId !== userId) {
                    throw new AppError(403, "You Can Only Edit Your Own Posts");
                }
                posts[postIndex] = {
                    ...posts[postIndex],
                    ...body,
                    userId: posts[postIndex].userId,
                    id: posts[postIndex].id,
                    createdAt: posts[postIndex].createdAt,
                    updatedAt: new Date().toISOString()
                }
                posts = JSON.stringify(posts, null, 2);
                await writeFileJSON("src/data/posts.json", posts);
                sendResponse(res, 200,{message: "Post Updated successfly"});
            } catch (error) {
                handelErrors(res, error);
            }
        })
    } catch (error) {
        throw new AppError(500, 'Error In Internal Server');
    }
}
async function handelDeletePost (path, req, res) {
    try {
        const[, ,id] = path.split("/");
        const userId = req.userId;
        let posts = await readFileJSON("src/data/posts.json");
        let postIndex = posts.findIndex(post => post.id === +id);
        if (postIndex === -1) {
            throw new AppError(404, "Post Not Found");
        }
        if (posts[postIndex].userId !== userId) {
            throw new AppError(403, "You Can Only Delete Your Own Posts");
        }
        posts.splice(postIndex, 1); 
        posts = JSON.stringify(posts, null, 2);
        await writeFileJSON("src/data/posts.json", posts);
        sendResponse(res, 200,{message: "Post Deleted successfly"});
    } catch (error) {
        handelErrors(res, error);
    }
}

export {handelGetPosts, handelGetPost, handelCreatePost, handelUpdatePost, handelDeletePost};