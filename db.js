var mysql = require('mysql');
const config = require("./utils/config.js");
var pool;
var query = function(sql, params, callback){
    if (!pool){
        pool= mysql.createPool({
            connectionLimit : 10,
            host            : 'localhost',
            user            : 'root',
            password        : '123456789012345678901234567890',
            database        : 'mybase'
        });
    }
    pool.getConnection(function(err, conn){
        if(err){
            callback(err, null, null);
        }else{
            conn.query(sql, params, function(qerr, result, fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, result);
            })
        }
    })
}

module.exports = query;