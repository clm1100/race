// const crypto = require('crypto')
// // let data = { session_key: "embaQ/wJ3Xy8IJgLzu8Qlg==", openid: "oDyGv4sYzfxcviMbwozPh5WNHGCU" }

// let sekey = "";

// let encryptedData = `HiXEyxQVqkW4wReBJZQHZZ/DOWBq7xShjcAO8p1FBJ272ePG39Xur58kE54pwjIXTwmLy53hDbjH+t1XQRxm0DSIe8a6/ZMWytnRYJIJMWvRoIITbJCeEYwM2NcPhyWHDDlFKNIFLYBsrFJVmIIuPA1QvzqwDYmwSAlUUzTvKdo6xGFyO5d4xHp3rZb+rMnEQ7xMJppbqTdxrx9ge6iSbawLTzit0wd2B3sk3XGutKJ6wTBYp/z60/1v5ECjxqpTMnelPJ1Kb5t2gBu5L7sLC9zXUPkIlSUmmIDxnKHmhU+hHRJObbtepA8iLy29lNhaGhweJT0jaT4XPF50oY6TiIpxo8atQwzoXYwayDzAXgEwYV0KqfvOrb6+31ds26lG14/L0Ii0wOnn+wZJp97fU4lS5GYGIvW7kfzHTQG+WX+1am38pSaoSEpVtLDtLaxoBMokanrUTTq7vQLAoTEzsf712Wnu2PTLF7brfgBqJPM=`

// let iv = '+wrrbsRnTRxtcc1xrZCW5A=='

// var s = Buffer.from(sekey, 'base64')
// e = Buffer.from(encryptedData, 'base64')
// i = Buffer.from(iv, 'base64');

// var decipher = crypto.createDecipheriv('aes-128-cbc', s, i)
// // 设置自动 padding 为 true，删除填充补位
// decipher.setAutoPadding(true)
// var decoded = decipher.update(e, 'binary', 'utf8')
// decoded += decipher.final('utf8');

// decoded = JSON.parse(decoded)

// console.log(decoded);




// // const WXBizDataCrypt = require('./WXBizDataCrypt')



// // let x = new WXBizDataCrypt("wxa189ba1203698cd9", sekey);

// // let res = x.decryptData(encryptedData,iv)

// // console.log(res);
