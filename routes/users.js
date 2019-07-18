const express = require('express');
const router = express.Router();
const query = require("../db.js");
const multer  = require('multer');
const path = require("path")
const uuidv1 = require('uuid/v1');

// 生成一个对象,凡是用这个对象生成的中间件,文件都会保存到uploads文件中

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../upload"))
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, uuidv1()+ext)
    }
})


var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype.indexOf('image')>-1){
            cb(null, true)
        }else{
            cb(null,false)
        }
}
});
// 生成中间件,只能处理avatar的文件,文件的name只能是avatar,不是的话会报错
var dealavatar = upload.single('avatar');

function sendData(res,err,result){
    if(!err){
        res.send({
            code:200,
            msg:"success",
            data:result
        })
    }else{
        res.send({
            code:"500",
            msg:"查询错误",
            err:err
        })
    }
}


router.get("/users",(req,res)=>{
    console.log(req.body);
    res.send({success:true});
})

router.get("/",(req,res)=>{
    console.log(123);
    res.render("index.html",{})
})



router.get("/addrace",(req,res)=>{
    res.render("addrace",{})
})

router.get("/races",(req,res)=>{
    res.render('races',{})
})

router.get("/api/races",(req,res)=>{
    let sql = `select r.id,r.address,r.created, t.name as home,t2.name as away  
                from races r,teams t,teams t2 
                where r.home_teamid=t.id 
                and r.away_teamid=t2.id`;
    query(sql,null,(err,result)=>{
        sendData(res,err,result)
    })
})

router.post("/api/addrace",(req,res)=>{
    let body = req.body;
    console.log(body);
    let sql = `insert into races set ?`;
    query(sql,body,(err,result)=>{
        sendData(res,err,result)
    })
})


router.get("/comments",(req,res)=>{
    res.render('comments',{})
})

router.get("/teams",(req,res)=>{
    res.render('teams',{})
})

router.get("/api/teams",(req,res)=>{
    let sql = "select * from teams order by id desc";
    query(sql,null,(err,result)=>{
        sendData(res,err,result)
    })
})

router.post('/api/addteams',(req,res)=>{
    let body = req.body||{};
    let sql = `insert into teams set ?`;
    query(sql,body,(err,result)=>{
        sendData(res,err,result);
    })
})

router.post("/api/upload",dealavatar,(req,res)=>{
    res.send({
        code:200,
        src:`/upload/${req.file.filename}`
    })
})


router.get("/api/comments",(req,res)=>{
    let sql = `select c.id,c.content,u.nickname,r.created,r.address,t1.name as away,t2.name as home 
                from comment c,races r,users u,teams t1,teams t2
                where c.race_id=r.id 
                and c.user_id=u.id 
                and r.away_teamid = t1.id 
                and r.home_teamid = t2.id`;
    query(sql,null,(err,result)=>{
        sendData(res,err,result);
    })
})

module.exports = router;