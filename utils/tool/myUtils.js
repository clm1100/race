

/**
 * Created by jack on 2019/7/18.
 */
const superagent = require("superagent")

const myAjax = (url) =>{
    return new Promise((resolve, reject)=>{
        superagent.get(url).end(function(err, result) {
            if (err) {
                return reject(err)
            } else {
                if(result && result.text){
                    let res = JSON.parse(result.text)
                    return resolve(res)
                }else{
                    reject(new Error("等待验证接口验证无响应body"))
                }
            }
        })
    })
}







module.exports = {
    myAjax
}
