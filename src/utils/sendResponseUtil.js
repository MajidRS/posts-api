function sendResponse (res, statusCode, response = {}) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        success: true,
        ...response,
        date: new Date().toISOString()
    }));
}
export {sendResponse}