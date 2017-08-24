const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let CategoryPSchema = mongoose.Schema({
    cat_name:String,//分类名
    unique_id:String,//别名
    description:String,//描述
    sort:Number//排序
});
//定义模型
let CategoryPModel=mongoose.model('CategoryP',CategoryPSchema);
module.exports=CategoryPModel;//把它暴露出来
