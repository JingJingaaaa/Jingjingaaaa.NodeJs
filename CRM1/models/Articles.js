const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let ArticlesSchema = mongoose.Schema({
    show:Boolean,
    aID:Number,//编号
    title: String,//客户名称 Project name
    leader: String,//负责人分类 Project leader
    // cat_id: { // 负责人分类
    //     type: mongoose.Schema.Types.ObjectId,//引用Object集合
    //     ref: "CategoryA"//引用CategoryA表
    // },
    address: String,// 针对群体  Target groups
    tel: String,// 联系方式 Email
    description:String, // 简介 Project brief
    cooperativeCustomer:String, // 合作客户 Cooperative Customer
    customerBrief:String, // 合作客户 Customer Brief
    create_date: {//添加日期
        type: Date,
        default: Date.now()
    }
});
//定义模型
let ArticlesModel=mongoose.model('Articles',ArticlesSchema);
module.exports=ArticlesModel;//把它暴露出来
