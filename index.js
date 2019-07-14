const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extend:false}));

app.listen(3000,()=>{
    console.log("running http://127.0.0.1:3000");
})