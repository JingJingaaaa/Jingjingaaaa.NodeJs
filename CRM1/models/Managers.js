const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let ManagersSchema = mongoose.Schema({
    username:String,
    password:String,
    password_confirm:String,
    create_date:{
        type: Date,
        default: new Date()
    }
});
//定义模型
let ManagersModel=mongoose.model('Managers',ManagersSchema);
module.exports=ManagersModel;//把它暴露出来
