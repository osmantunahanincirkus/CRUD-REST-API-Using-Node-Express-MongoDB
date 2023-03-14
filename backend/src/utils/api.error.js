exports.ApiError = class ApiError extends Error {
    constructor(statusCode, message, errorConst = null, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.errorConst = errorConst;
        this.isOperational = isOperational;
        console.log(errorConst);
        if (stack){
            this.stack = stack;
        }else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}