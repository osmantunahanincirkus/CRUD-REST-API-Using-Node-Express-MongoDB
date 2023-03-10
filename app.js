import Home from './src/components/home'
import Add from './src/components/add';
import Edit from './src/components/edit';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const express = require("express")
const app = express()
require("dotenv").config()
require("./src/config/databaseConnection")
const {errorConverter, errorHandler} = require("./src/middlewares/error");
const {ApiRouter} = require("./src/routers/api");
const {ApiError} = require("./src/utils/api.error");

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

function app(){
    return(
        <div className="app">
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/create" element={<Add />} />
                    <Route path="/edit" element={<Edit />} />
                </Routes>
            </Router>
        </div>
    );
}

module.exports = app;