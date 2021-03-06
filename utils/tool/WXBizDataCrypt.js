const crypto = require('crypto')


function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
    console.log('=======1、初始化=======')
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = Buffer.from(this.sessionKey, 'base64')
    encryptedData = Buffer.from(encryptedData, 'base64')
    iv = Buffer.from(iv, 'base64')

    console.log("=======2解密开始=========")

    // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    console.log("decipher")
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    console.log("decode")
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)

    console.log("=====3、解析得到数据=====", decoded);

    return decoded
}

module.exports = WXBizDataCrypt
