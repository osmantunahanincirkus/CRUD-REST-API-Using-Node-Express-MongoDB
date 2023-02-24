const {Todo} = require("../models/todoModel");
const {ApiError} = require("../utils/api.error");

exports.create = async (body) => {
    const todo = await Todo.findOne({name: body.name}).catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
    if (todo) {
        throw new ApiError(400, 'There is a record with this name !');
    }

    return await Todo.create(body).catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
}

exports.update = async (id, body) => {
    let todo = await Todo.findById(id).catch((err)=>{
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
    if (!todo) {
        throw new ApiError(404, 'Todo not found !');
    }
    
    Object.keys(body).map((key) => {
        todo[key] = body[key];
    })

    return await todo.save().catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
}

exports.deleteTodo = async (id) => {
    const todo = await Todo.findById(id).catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
    if (!todo) {
        throw new ApiError(404, 'Todo not found !');
    }

    return await todo.delete().catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
}

exports.get = async (id) => {
    const todo = await Todo.findById(id).catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
    if (!todo) {
        throw new ApiError(404, 'Todo not found !');
    }

    return todo;
}

exports.gets = async () => {
    return await Todo.find({}).catch((err) => {
        throw new ApiError(500, 'An unexpected error has occurred !', err);
    });
}