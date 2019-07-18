const express = require('express');
const router = express.Router();
const query = require("../db.js");
const path = require("path")
const url = require('url');
const uuidv1 = require('uuid/v1');

//http请求工具
const myUtil = require("../utils/tool/myUtils")

//微信解密
const WXBizDataCrypt = require('../utils/tool/WXBizDataCrypt')


/**
 * 根据js_code获取openid ,session_key, unionid
 * @param {*} js_code
 */
const getOpenId = async (js_code, appIcCode = {}) =>{
    try {
        if(!js_code){
            throw new Error("缺少 js_code ")
        }

        let cobj = {
            appId:'wxa189ba1203698cd9',
            secret:'7ea54f8f2f6a4b82ecc2cab78eb7db10'
        };
        let myUrl = url.format({
            protocol: 'https',
            hostname: 'api.weixin.qq.com',
            pathname: '/sns/jscode2session',
            query: {
                appid:cobj.appId,
                secret:cobj.secret,
                js_code:js_code,
                grant_type:"authorization_code"
            }
        });
        let result = await myUtil.myAjax(myUrl);
        if(result){
            if(!result.openid){
                if(result.errmsg){
                    throw new Error(result.errmsg)
                }
            }
        }else{
            throw new Error(" 获取微信 openid 网络出现错误 ")
        }
        return result;
    } catch (error) {
        throw error;
    }
}




// getUnionId
const getUnionId = async (p = {}) =>{
    try {
        console.log('请求参数', p);
        let cobj = {
            appId:"wxa189ba1203698cd9"
        }
        let session_key = "";
        let result = await getOpenId(p.js_code);
        console.log('获取session_key结果：', result);

        if(result && result.session_key){
            session_key = result.session_key
        }

        try {

            let x = new WXBizDataCrypt(cobj.appId, session_key);
            let result2 = x.decryptData(p.encryptedData, p.iv);

            if(result2 && result2.unionId){
                result2.unionid  = result2.unionId;
                result2.openid   = result2.openId;
                result2.avatar   = result2.avatarUrl;
                result2.sex      = result2.gender == 1? "male" : "female";

                return result2;
            }
            throw new Error("decryptionFalse")
        } catch (error) {
            throw new Error("decryptionFalse")
        }
    } catch (error) {
        throw error;
    }
}



router.post("/api/login",async (req,res)=>{
    let body  = req.body;
    if(!body.encryptedData){
        throw new Error("缺少 encryptedData ");
    }
    if(!body.iv){
        throw new Error("缺少 iv ");
    }
    if(!body.js_code){
        throw new Error("缺少 js_code ");
    }
    let result =  await getUnionId(body);
    res.send({
        nickName        :result.nickName,
        sex             :result.sex,
        avatar          :result.avatarUrl,
        wxType          :"SAPP",
        unionid         :result.unionid,
        openid          :result.openid
    })
})



module.exports = router