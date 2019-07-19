const myUtil = require("./myUtils")
const url = require('url');
const getOpenId = async (js_code) => {
    let cobj = {
        appId: 'wxa189ba1203698cd9',
        secret: '7ea54f8f2f6a4b82ecc2cab78eb7db10'
    };
    let myUrl = url.format({
        protocol: 'https',
        hostname: 'api.weixin.qq.com',
        pathname: '/sns/jscode2session',
        query: {
            appid: cobj.appId,
            secret: cobj.secret,
            js_code: js_code,
            grant_type: "authorization_code"
        }
    });
    let result = await myUtil.myAjax(myUrl);
    return result;
}

module.exports = getOpenId