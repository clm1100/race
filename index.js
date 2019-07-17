const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();
let usersRouter = require("./routes/users");
const template = require("express-art-template");

app.set("views",path.join(__dirname,"views"));
app.engine('html',template)
app.set("view engine","html");

app.use(express.static(path.join(__dirname,"public")))

app.use(bodyParser.urlencoded({extend:false}));


app.use(usersRouter)

app.listen(3000,()=>{
    console.log("running http://127.0.0.1:3000");
})