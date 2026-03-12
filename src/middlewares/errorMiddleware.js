class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
};

function sendError (res, statusCode, err) {
    const errorResponse = {
        success: false,
        message: err.message
    };
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(errorResponse));
}

function handelErrors (res, error) {
    if (error instanceof AppError) {
        return sendError(res, error.statusCode, error);
    }
    sendError(res, 500, error);
}

export {handelErrors, AppError}