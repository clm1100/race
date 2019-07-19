const express = require('express');
const router = express.Router();
const query = require("../db.js");
const getOpenId = require("../utils/tool/getopenid");
const jwt = require("jsonwebtoken");

//微信解密
const WXBizDataCrypt = require('../utils/tool/WXBizDataCrypt')

// getUnionId
const getUnionId = async (p = {}) =>{
        console.log('请求参数', p);
        let cobj = {
            appId:"wxa189ba1203698cd9"
        }
        let session_key = "";
        let result = await getOpenId(p.js_code);
        console.log('openid与session_key：', result);
        if (result && result.session_key) {
            session_key = result.session_key
        }
        let x = new WXBizDataCrypt(cobj.appId, session_key);
        let result2 = x.decryptData(p.encryptedData, p.iv);
        console.log("result2", result2); 
        return result2;
}

router.post("/api/login",async (req,res)=>{
    let body  = req.body;
    if(!body.encryptedData){
        return res.send({
            code:"500",
            msg:"参数不完整"
        })
    }
    if(!body.iv){
        return res.send({
            code: "500",
            msg: "参数不完整"
        })
    }
    if(!body.js_code){
        return res.send({
            code: "500",
            msg: "参数不完整"
        })
    }
    let result =  await getUnionId(body);
    res.send(result);
})


module.exports = router