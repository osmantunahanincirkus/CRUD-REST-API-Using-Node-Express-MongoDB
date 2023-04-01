const  Todo  = require("../models/todoModel");
const { ApiError } = require("../utils/api.error");

exports.createTodo = async (body) => {
  try {
    const existingTodo = await Todo.findOne({ name: body.name });
    
    if (existingTodo) {
      throw new ApiError(400, "There is already a todo with this name.");
    }
    
    return await Todo.create(body);
  } catch (err) {
    throw new ApiError(500, "Could not create todo.", err);
  }
};

exports.updateTodo = async (id, body) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      throw new ApiError(404, "Todo not found.");
    }
    
    return todo;
  } catch (err) {
    throw new ApiError(500, "Could not update todo.", err);
  }
};

exports.deleteTodo = async (id) => {
  try {
    const todo = await Todo.findById(id);
    
    if (!todo) {
      throw new ApiError(404, "Todo not found.");
    }
    
    await todo.remove();
  } catch (err) {
    throw new ApiError(500, "Could not delete todo.", err);
  }
};

exports.getTodoById = async (id) => {
  try {
    const todo = await Todo.findById(id);
    
    if (!todo) {
      throw new ApiError(404, "Todo not found.");
    }
    
    return todo;
  } catch (err) {
    throw new ApiError(500, "Could not get todo.", err);
  }
};

exports.getAllTodos = async () => {
  try {
    return await Todo.find({});
  } catch (err) {
    throw new ApiError(500, "Could not get todos.", err);
  }
};