/**
 * schema 结构
 * model  模型
 * Entity  实体
 *
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myproject');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("数据库连接成功")
});

module.exports = db;


