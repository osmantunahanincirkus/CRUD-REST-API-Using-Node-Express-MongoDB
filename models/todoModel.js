const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {NewDate} = require("../helpers/date");

const schemaName = "Todo";
const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    description: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    complated: {
        type: Schema.Types.String,
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

exports[schemaName] = mongoose.model(schemaName, schema);