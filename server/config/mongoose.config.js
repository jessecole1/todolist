const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://colejjesse:<"renderpassword123!">@cluster0.qxixjla.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(() => console.log("Establish a connection to the database."))
    .catch(err => console.log("Error - Something went wrong when connecting to the database", err));