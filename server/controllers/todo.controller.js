const Todo = require('../models/todo.model');

module.exports.index = (req, res) => {
    res.json({
        message: "Hello word"
    });
}

module.exports.findAllTodos = (req, res) => {
    Todo.find()
    .then((allTodos) => {
        res.json({todo : allTodos})
    })
    .catch((err) => {
        res.json({message : "Something went wrong", error : err})
    });
}

module.exports.findOneTodo = (req, res) => {
    Todo.findOne({_id : req.params.id})
    .then(oneSingleTodo => {
        res.json(oneSingleTodo);
    })
    .catch((err) => {
        res.json(err)
    });
}

module.exports.createTodo = (req, res) => {
    Todo.create(req.body)
    .then(newlyCreatedTodo => {
        res.json({ todo : newlyCreatedTodo })
    })
    .catch((err) => {
        res.json({ message : "Something went wrong", error : err })
    });
}

module.exports.addItemsToTodo = (req, res) => {
    Todo.updateOne( {_id:req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
        .then(updatedTodo => {
            res.json({todo:updatedTodo})
        })
        .catch((err) => {
            res.json({message:"Something went wrong", error: err})
        });
}

module.exports.findOneAndUpdate = (req,res) => {
    Todo.findOneAndUpdate(
        { _id : req.params.id },
        req.body,
        { new : true, runValidators : true}
    )
        .then(updatedTodo => {
            res.json({ todo : updatedTodo })
        })
        .catch((err) => {
            res.json({ message : "Something went wrong", error : err})
        });
}

module.exports.deleteTodo = (req, res) => {
    Todo.deleteOne({ _id : req.params.id })
    .then(result => {
        res.json({ result : result })
    })
    .catch(err => {
        res.json({ message : "Something went wrong", error : err })
    });
}