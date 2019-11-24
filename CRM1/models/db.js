/**
 * schema 结构
 * model  模型
 * Entity  实体
 *
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:数据库连'));
db.once('open', function () {
    console.log("数据库连接成功")
});

module.exports = db;


