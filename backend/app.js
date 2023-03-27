const express = require("express")
const app = express()
require("dotenv").config()
require("./src/config/databaseConnection")
const {errorConverter, errorHandler} = require("./src/middlewares/error");
const {ApiRouter} = require("./src/routers/api");
const {ApiError} = require("./src/utils/api.error");
const cors= require("cors")


app.use(cors())
app.use(express.json());
app.use("/api", ApiRouter);
app.get("/", (req,res) => {
    res.send("Welcome...");
});
app.use((req,res,next)=>{
    next(new ApiError(404, 'Page not found !'))
})
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;