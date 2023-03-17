const {catchAsync} = require("../utils/catch-async");
const {createTodo, updateTodo, deleteTodo, getAllTodos, getTodoById} = require("../services/todoService");

exports.createTodo = catchAsync(async (req, res) => {
   const result = await createTodo(req.body);
   return res.status(201).send(result);
});

exports.updateTodo = catchAsync(async (req, res) => {
   const result = await updateTodo(req.params.id, req.body);
   return res.status(200).send(result);
});

exports.deleteTodo = catchAsync(async (req, res) => {
   await deleteTodo(req.params.id);
   return res.status(204).send();
});

exports.getAllTodos = catchAsync(async (req, res) => {
   const result = await getAllTodos();
   return res.status(200).send(result);
});

exports.getTodoById = catchAsync(async (req, res) => {
   const result = await getTodoById(req.params.id);
   return res.status(200).send(result);
});