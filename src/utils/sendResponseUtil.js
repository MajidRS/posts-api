function sendResponse (res, satutsCode, response) {
    res.satutsCode = satutsCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        success: true,
        ...response,
        date: new Date().toISOString()
    }));
}
export {sendResponse}