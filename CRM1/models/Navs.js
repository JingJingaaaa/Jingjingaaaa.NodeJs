const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let NavsSchema = mongoose.Schema({
    title:String,
    content:String,
    create_date:{
        type: Date,
        default: Date.now()
    }
});
//定义模型
let NavsModel=mongoose.model('Navs',NavsSchema);
module.exports=NavsModel;//把它暴露出来
