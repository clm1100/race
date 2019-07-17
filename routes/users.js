const express = require('express');
const router = express.Router();

router.get("/users",(req,res)=>{
    console.log(req.body);
    res.send({success:true});
})

router.get("/",(req,res)=>{
    res.render("index.html",{})
})



router.get("/addrace",(req,res)=>{
    res.render("addrace",{})
})

router.get("/races",(req,res)=>{
    res.render('races',{})
})

router.get("/comments",(req,res)=>{
    res.render('comments',{})
})

router.get("/teams",(req,res)=>{
    res.render('teams',{})
})

module.exports = router;