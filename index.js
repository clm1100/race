const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();
let usersRouter = require("./routes/users");
let loginRouter = require("./routes/index");
// const template = require("express-art-template");
const ejs =require('ejs')

app.set("views",path.join(__dirname,"views"));
app.engine('html',ejs.__express)
app.set("view engine","html");

app.use(express.static(path.join(__dirname,"public")))
app.use('/upload',express.static(path.join(__dirname,"upload")))
app.use(bodyParser.urlencoded({extended:false}));

app.use(usersRouter)
app.use(loginRouter)

console.log(process.env.NODE_ENV);

app.listen(3000,()=>{
    console.log("running http://127.0.0.1:3000");
})