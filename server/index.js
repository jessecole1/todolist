const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin:"http://localhost:3000"}));

require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended : true }));

const AllMyTodoRoutes = require("./routes/todo.routes");
AllMyTodoRoutes(app);

app.listen(8000, () => console.log("The server is fired up and running on port 8000"));