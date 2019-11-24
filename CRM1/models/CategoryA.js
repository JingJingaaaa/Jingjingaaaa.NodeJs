const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let CategoryASchema = mongoose.Schema({
    // cat_name:String,//分类名
    // unique_id:String,//别名

    cat_name: { // 负责人
        type: mongoose.Schema.Types.ObjectId,//引用Object集合
        ref: "Articles"//引用CategoryA表
    },
    unique_id: { // 关联项目
        type: mongoose.Schema.Types.ObjectId,//引用Object集合
        ref: "Articles"//引用CategoryA表
    },
    description:String,//描述
});
//定义模型
let CategoryAModel=mongoose.model('CategoryA',CategoryASchema);
module.exports=CategoryAModel;//把它暴露出来
