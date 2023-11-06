const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todo_list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(() => console.log("Establish a connection to the database."))
    .catch(err => console.log("Error - Something went wrong when connecting to the database", err));