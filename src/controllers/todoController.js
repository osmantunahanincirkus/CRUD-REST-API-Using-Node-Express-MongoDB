const {catchAsync} = require("../utils/catch-async");
const {create, update, deleteTodo, gets, get} = require("../services/todoService");

exports.create = catchAsync(async (req, res) => {
   const result = await create(req.body);
   return res.status(201).send(result);
});

exports.update = catchAsync(async (req, res) => {
   const result = await update(req.params.id, req.body);
   return res.status(200).send(result);
});

exports.delete = catchAsync(async (req, res) => {
   await deleteTodo(req.params.id);
   return res.status(204).send();
});

exports.gets = catchAsync(async (req, res) => {
   const result = await gets();
   return res.status(200).send(result);
});

exports.get = catchAsync(async (req, res) => {
   const result = await get(req.params.id);
   return res.status(200).send(result);
});