const express = require("express");
const router = express.Router();

router
    .use('/todo', require("./todoRouter"));

exports.ApiRouter = router;
