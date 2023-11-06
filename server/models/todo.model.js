const mongoose = require('mongoose');

const sub = {
    message: {
        type: String, 
        minLength: [2, "At least 2 characters long"]
    }, complete: {
        type: Boolean
    }
}

const TodoSchema = new mongoose.Schema({
    message: {
        type: String,
        required : [true , "Enter a valid task"],
        minlength : [2, "At least 2 characters long"]
    }, complete: {
        type: Boolean
    }, subItems: [sub]
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;