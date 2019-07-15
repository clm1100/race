const express = require('express');
const router = express.Router();

router.get("/users",(req,res)=>{
    console.log(req.body);
    res.send({success:true});
})

module.exports = router;