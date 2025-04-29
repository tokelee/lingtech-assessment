import {ErrorRequestHandler} from "express"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const status_code = err.status_code || 500; // Default to 500 if no status code
    const message = err.message || "Internal Server Error";

    res.status(status_code).json({
        success: false,
        status_code,
        message,
        stack: err.stack,
    });
};

export default errorHandler;
