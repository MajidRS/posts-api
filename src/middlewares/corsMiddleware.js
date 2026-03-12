const corsOptions = {
    origin: [`localhost:3000`, `http://rabsal.com`],
    methodes :['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers:['authorization', 'Content-Type'],
    credentials: true
}
function handleCors(req, res) {
    const origin = req.headers.origin;
    if (origin && corsOptions.origin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-methods', corsOptions.methodes.join(', '));
        res.setHeader('Access-Control-Allow-headers', corsOptions.headers.join(', '));
        res.setHeader('Access-Control-Allow-credentials', 'true');
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