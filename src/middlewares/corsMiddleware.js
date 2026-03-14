const corsOptions = {
    origin: [`http://localhost:3000`, `http://rabsal.com`],
    methods :['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers:['Authorization', 'Content-Type'],
    credentials: true
}
function handleCors(req, res) {
    const origin = req.headers.origin;
    if (origin && corsOptions.origin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(', '));
        res.setHeader('Access-Control-Allow-Headers', corsOptions.headers.join(', '));
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.method === "OPTIONS") {
            res.statusCode = 204;
            res.end();
            return true;
        }
        return false;
    } else {
        res.statusCode = 403;
        res.end('Forbidden: Origin not allowed');
        return true;
    }
}
export {handleCors}