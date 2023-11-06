const Todo = require('../controllers/todo.controller');

module.exports = app => {

    app.get('/api', Todo.index);
    app.post('/api/todo', Todo.createTodo);
    app.put('/api/todo/add/:id', Todo.addItemsToTodo);
    app.get('/api/todos', Todo.findAllTodos);
    app.get('/api/todo/:id', Todo.findOneTodo);
    // app.get('/api/todos/:id', Todo.findOneAndUpdate);
    app.patch('/api/todo/:id', Todo.findOneAndUpdate);
    app.delete('/api/todo/:id', Todo.deleteTodo);

}