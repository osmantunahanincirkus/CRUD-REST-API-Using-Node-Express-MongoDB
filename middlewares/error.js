const {ApiError} = require("../utils/api.error");
const mongoose = require("mongoose");

exports.errorConverter = (err, req, res, next) => {
    let error = err;
    console.log(!(error instanceof ApiError));
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message = error.message || 'An unexpected error has occurred !';
        error = new ApiError(statusCode, message, null, false, err.stack);
    }
    next(error);
}

exports.errorHandler = (err, req, res, next) => {
    let {statusCode, message} = err;
    res.locals.errorMessage = err.message;
    res.status(statusCode).send({message: message});
}