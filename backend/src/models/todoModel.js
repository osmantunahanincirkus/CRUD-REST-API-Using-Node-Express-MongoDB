const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {NewDate} = require("../helpers/date");

const schemaName = "Todo";
const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    complated: {
        type: Boolean,
        default: false
    }
}, {
    collection: schemaName,
    timestamps: {
        createdAt: 'created_at', // TODO: changes to created_at.
        updatedAt: 'updated_at', // TODO: changes to updated_at.
        currentTime: () => NewDate() // TODO: changes UTC+00 to UTC+03.
    }
});
const Todo = mongoose.model(schemaName, schema);

module.exports=Todo;