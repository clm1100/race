const express = require("express");
const app = express();
const bodyParser = require("body-parser");


let usersRouter = require("./routes/users");

app.use(bodyParser.urlencoded({extend:false}));


app.use(usersRouter)

app.listen(3000,()=>{
    console.log("running http://127.0.0.1:3000");
})