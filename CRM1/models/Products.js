const  mongoose=require('mongoose');
const db=require('./db');

//定义结构
let ProducesSchema = mongoose.Schema({
    name:{//客户名称分类
        type: mongoose.Schema.Types.ObjectId,//引用Object集合
        ref: "Articles"
    },//名称
    price: Number,//价格
    cat_id: {//联系人
        type: mongoose.Schema.Types.ObjectId,//引用Object集合
        ref: "CategoryP"//引用CategoryA表
    },
    theState:String,//跟进状态
    num: Number,//订单量
    create_date: {//添加日期
        type: Date,
        default: Date.now()
    },
    description:String//简单描述
});
//定义模型
let ProducesModel=mongoose.model('Produces',ProducesSchema);
module.exports=ProducesModel;//把它暴露出来
