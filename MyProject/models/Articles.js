const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let ArticlesSchema = mongoose.Schema({
    show:Boolean,
    aID:Number,//编号
    title: String,//名称
    cat_id: {//分类
        type: mongoose.Schema.Types.ObjectId,//引用Object集合
        ref: "CategoryA"//引用CategoryA表
    },
    create_date: {//添加日期
        type: Date,
        default: Date.now()
    },
    description:String//简单描述
});
//定义模型
let ArticlesModel=mongoose.model('Articles',ArticlesSchema);
module.exports=ArticlesModel;//把它暴露出来
