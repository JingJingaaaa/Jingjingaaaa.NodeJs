const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let NavsSchema = mongoose.Schema({
    name:String,
    url:String,
    sort:Number
});
//定义模型
let NavsModel=mongoose.model('Navs',NavsSchema);
module.exports=NavsModel;//把它暴露出来
