const express = require('express');
const router = express.Router();
const Navs= require('../models/Navs');
const Managers= require('../models/Managers');
const CategoryP= require('../models/CategoryP');
const CategoryA= require('../models/CategoryA');
const Products= require('../models/Products');
const Articles= require('../models/Articles');

//渲染首页/admin
router.get('/', function(req, res) {
    if(!req.session.username){
        res.redirect('/admin/login')
    }else {
       res.render('back/index')
    }
});
// 首页获取数据
router.get('/getDatas',function(req, res){

    Articles.find().then(ca => {
        CategoryP.find().then(cp=> {
            Navs.find().then(result=>{
                if (result) {
                    res.json({
                        articles: ca,
                        categoryP: cp,
                    })
                    res.render({
                        navs: result,
                    })
                }
            })
        })
    })
})
// 传递username
router.get('/username',function(req, res){
    if(req.session.username){
        console.log(req.session.username)
        res.json({
            name:req.session.username
        })
    }
})

//渲染登录页面/admin/login
router.get('/login', function(req, res) {
    res.render('back/login')
});
//管理员登录Operate
router.post('/login', function(req, res){
    //接收Submit上来的数据
    let userInfo=req.body;
    console.log(userInfo);
    let username=userInfo.username;
    let password=userInfo.password;
    //与后台数据库做对比
    Managers.findOne({
        username :username,
        password :password
    }).then(result=>{
        if(result){
            req.session.cookie.maxAge=3000000;
            req.session.username=username;
            //登录成功,
            res.json( {
                status:0,
                msg:"Login successful"
            })
        }else{
            res.json( {
                status:1,
                msg:"Login failed"
            })
        }
    })
});


//渲染公告列表页面/admin/navs
router.get('/navs', function(req, res) {
    Navs.find().then(result => {
        if(result){
            res.render('back/navs',{
                navs: result
            })
        }
    })
});
//渲染公告添加页面/admin/navsAdd
router.get('/navsAdd', function(req, res) {
    res.render('back/navsAdd')
});
//公告添加Operate
router.post('/navsAdd', function(req, res) {
    console.log(req.body);
    let info=req.body;
    let obj={
        title:info.title,
        content:info.content,
        create_date:info.create_date
    };
    Navs.findOne({title:info.title})
        .then(result=>{//将结果返回
            if(result){//判断是查找到
                res.json({
                    status:1,
                    msg:"公告名称重复"
                })
            }else{
                Navs.create(obj).then(result=>{
                    if(result){
                        res.json({
                            status:0,
                            msg:'公告添加成功'
                        })
                    }else{
                        res.json({
                            status:1,
                            msg:'添加失败，请稍后再试'
                        })
                    }
                })
            }
        })
});
//公告DeleteOperate
router.get('/Ndelete', (req, res) => {
    let title = req.query.title;
    Navs.remove({title:title}).then((result=>{
        if(result){
            res.redirect('/admin/navs')
        }
    }))
})
//渲染管理员列表页面/admin/manager
router.get('/manager', function(req, res) {
    Managers.find().then(result => {
        if(result){
            res.render('back/manager',{
                managers: result
            })
        }
    })
});
//渲染管理员添加页面/admin/managerAdd
router.get('/managerAdd', function(req, res) {
    res.render('back/managerAdd')
});
//渲染管理员Edit页面/admin/managerAdd
router.get('/Medit', function(req, res) {
    let _id=req.query._id;//拿到id然后将id在CategoryA中查找，将结果返还出来
    Managers.findOne({_id:_id}).then(result => {
        res.render('back/managerEdit',{
            managers: result
        })
    });
});
//管理员添加Operate
router.post('/managerAdd', function(req, res) {
    console.log(req.body);
    let info=req.body;
    let obj={
        username:info.username,
        password:info.password,
        password_confirm:info.password_confirm,
        create_date:info.create_date
    };
    Managers.findOne({username:info.username})
        .then(result=>{//将结果返回
            if(result){//判断是查找到
                res.json({
                    status:1,
                    msg:"Username already exists"
                })
            }else{
                Managers.create(obj).then(result=>{
                    if(result){
                        res.json({
                            status:0,
                            msg:'Administrator added successfully'
                        })
                    }else{
                        res.json({
                            status:1,
                            msg:'Administrator added failed, please try again later'
                        })
                    }
                })
            }
        })
});
//管理员DeleteOperate
router.get('/Mdelete', (req, res) => {
    let username = req.query.username;
    Managers.remove({username:username}).then((result=>{
        if(result){
            res.redirect('/admin/manager')
        }
    }))
});
//管理员EditOperate
router.post('/Medit', (req, res) => {
    let obj = {
        username: req.body.username,
        password: req.body.password,
        p_c: req.body.p_c
    };
    console.log(obj,req.body._id)
    Managers.update({_id:req.body._id},obj).then(result => {
        if(result){
            res.json({
                status: 0,
                msg: "Successfully modified"
            })
        }else{
            res.json({
                status: 1,
                msg: "Fail to edit"
            })
        }
    })
});


//渲染客户管理列表页面/admin/categoryP
router.get('/categoryP', function(req, res) {
    CategoryP.find().then(result => {
        if(result){
            res.render('back/product_category',{
                categoryP: result

            })
        }
    })
});
//渲染客户管理添加页面/admin/categoryPAdd
router.get('/categoryPAdd', function(req, res) {
    res.render('back/product_categoryAdd')
});
//渲染客户管理Edit页面/admin/PCedit
router.get('/PCedit', (req, res) => {
    let _id=req.query._id;//拿到id然后将id在CategoryP中查找，将结果返还出来
    CategoryP.findOne({_id:_id}).then(result => {
        res.render('back/product_categoryEdit',{
            categoryP: result
        })
    })
});

//渲染销售详情页面/admin/products
router.get('/products', function(req, res) {
    let start=req.query.start-0;
    Products.find().count().then(n=>{
        Products.find().populate("cat_id","cat_name").populate("name","cooperativeCustomer").skip(start).limit(5).then(result => {
            if(result){
                CategoryP.find().then(r=>{
                    res.render('back/products',{
                        categoryP:r,
                        products: result,
                        n:n,
                    })
                })
            }
        });
    })

});

//渲染销售详情添加页面/admin/productsAdd
router.get('/productsAdd', function(req, res) {
    CategoryP.find().then(result=>{
        Articles.find().then(r => {
            res.render('back/productsAdd',{
                categoryP:result,
                articles:r
            })
        })
    });
});



//渲染项目进程列表页面/admin/categoryA
router.get('/categoryA', function(req, res) {
    Articles.find().then(r=>{
        if(r) {
            CategoryA.find().populate("cat_name","leader").populate("unique_id","title").then(result => {
                if(result){
                    res.render('back/article_category',{
                        categoryA: result
                    })
                }
            })
        }
    })
   
});
//渲染项目进程添加页面/admin/categoryAAdd
router.get('/categoryAAdd', function(req, res) {
    Articles.find().then(r => {
        res.render('back/article_categoryAdd',{
            articles:r
        })
    })
   
});
//渲染项目进程Edit页面/admin/ACedit
router.get('/ACedit', (req, res) => {
    let _id=req.query._id;//拿到id然后将id在CategoryA中查找，将结果返还出来
    CategoryA.findOne({_id:_id}).populate("cat_name","leader").populate("unique_id","title").then(result => {
        console.log(result)
        res.render('back/article_categoryEdit',{
            categoryA: result
        })
    })
});
//渲染项目管理页面/admin/articles
router.get('/articles', function(req, res) {
    let start=req.query.start-0;
    Articles.find().count().then(n=> {
        Articles.find().skip(start).limit(5).then(result => {
            if (result) {
                CategoryA.find().then(r=> {
                    res.render('back/articles', {
                        categoryA: r,
                        articles: result,
                        n:n
                    })
                })
            }
        });
    })
});
//渲染项目管理添加页面/admin/articlesAdd
router.get('/articlesAdd', function(req, res) {
    CategoryA.find().then(result=>{
        res.render('back/articlesAdd',{
            categoryA:result
        })
    })
});


//项目进程添加功能
router.post('/categoryAAdd', function(req, res) {
    let info=req.body;
    let obj={
        cat_name:info.cat_name,
        unique_id:info.unique_id,
        description:info.description,
        sort:info.sort - 0
    };
    CategoryA.create(obj)
        .then(result=>{
        if(result){
            res.json({
                status:0,
                msg:'Created successfully'
            })
        }else{
            res.json({
                status:1,
                msg:'Creation failed, please try again later'
            })
        }
    })
           
});
//项目进程Delete功能
router.get('/ACdelete', (req, res) => {
    let _id = req.query._id;
    CategoryA.remove({_id:_id}).then((result=>{
        if(result){
            res.redirect('/admin/categoryA')
        }
    }))
});
//项目进程Edit功能
router.post('/ACedit', (req, res) => {
    let obj = {
        cat_name: req.body.cat_name,
        unique_id: req.body.unique_id,
        description: req.body.description,
        sort: req.body.sort - 0
    };
    console.log(obj)
    CategoryA.update({_id:req.body._id},obj)
        .then(result => {
            if(result){
                res.json({
                    status: 0,
                    msg: "Successfully modified"
                })
            }else{
                res.json({
                    status: 1,
                    msg: "Fail to edit"
                })
            }
        })
});
//项目进程移动功能
router.post("/MoveType",(req,res)=>{
    let strID = req.body.strID;
    let type = req.body.type;
    let arr=strID.split(",");
    for(var i=0;i<arr.length;i++) {
        Articles.update({_id:arr[i]}, {leader:type})
            .then(result => {
                if (result) {
                    res.json({
                        status: 0,
                        msg: "移动成功"
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: "移动失败"
                    })
                }
            })
    }
});
//项目管理Delete功能
router.get('/Adelete', (req, res) => {
    let title = req.query.title;
    Articles.remove({title:title}).then((result=>{
        if(result){
            res.redirect('/admin/articles')
        }
    }))
});
//项目管理添加功能
router.post('/articlesAdd', function(req, res) {
    let info=req.body;
    let obj={
        aID:info.aID,
        title:info.title,
        leader: info.leader,
        cat_id:info.cat_id,
        address:info.address,
        tel:info.tel,
        create_date:info.create_date,
        description:info.description,
        cooperativeCustomer:info.cooperativeCustomer,
        customerBrief:info.customerBrief,
    };
    Articles.findOne({title:info.title})
        .then(result=>{//将结果返回
            if(result){//判断是查找到
                res.json({
                    status:1,
                    msg:"Project already exists"
                })
            }else{
                Articles.create(obj).then(result=>{
                    if(result){
                        res.json({
                            status:0,
                            msg:'Project added successfully'
                        })
                    }else{
                        res.json({
                            status:1,
                            msg:'Project addition failed, please try again later'
                        })
                    }
                })
            }
        })
});
//项目管理搜索功能
router.post('/Asearch', function(req, res) {
    let sel = req.body.sel;
    let selGroup = req.body.selGroup;
    Articles.find({
        leader: sel,
    }).then(result => {
        console.log('result', result, Articles, Articles.find())
        res.json({
            data: result
        })
    })
});

//项目管理批量Delete
router.post('/AllDelete', (req, res) => {
    let str = req.body.arrDel;
    let arr=str.split(",");
    console.log(req.body,str);
    console.log("1"+arr);
    for(var i=0;i<arr.length;i++){
        Articles.remove({title:arr[i]}).then((result=>{
            if(result){
                res.json({
                    status: 0,
                    msg: "successfully deleted"
                })
            }else{
                res.json({
                    status: 1,
                    msg: "failed to delete"
                })
            }
        }))
    }
});


//客户管理分类移动功能
router.post("/MoveTypeP",(req,res)=>{
    let strID = req.body.strID;
    let type = req.body.type;
    let arr=strID.split(",");
    for(var i=0;i<arr.length;i++) {
        Products.update({_id:arr[i]}, {cat_id:type})
            .then(result => {
                if (result) {
                    res.json({
                        status: 0,
                        msg: "移动成功"
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: "移动失败"
                    })
                }
            })
    }
});
//客户管理分类Edit功能
router.post('/PCedit', (req, res) => {
    let obj = {
        cat_name: req.body.cat_name,
        unique_id: req.body.unique_id,
        description: req.body.description,
        sort: req.body.sort - 0
    };
    console.log(obj)
    CategoryP.update({_id:req.body._id},obj)
        .then(result => {
            if(result){
                res.json({
                    status: 0,
                    msg: "Successfully modified"
                })
            }else{
                res.json({
                    status: 1,
                    msg: "Fail to edit"
                })
            }
        })
});
//客户管理分类Delete功能
router.get('/PCdelete', (req, res) => {
    let cat_name = req.query.cat_name;
    CategoryP.remove({cat_name:cat_name}).then((result=>{
        if(result){
            res.redirect('/admin/categoryP')
        }
    }))
});
//客户管理分类添加功能
router.post('/categoryPAdd', function(req, res) {
    let info=req.body;
    let obj={
        cat_name:info.cat_name,
        unique_id:info.unique_id,
        description:info.description,
        sort:info.sort - 0
    };
    console.log(obj);
    CategoryP
        .findOne({cat_name:obj.cat_name})
        .then(result=>{//将结果返回
            console.log(result);
            if(result){//判断是查找到
                res.json({
                    status:1,
                    msg:"联系人已存在"
                })
            }else{
                CategoryP.create(obj)
                    .then(result=>{
                        if(result){
                            res.json({
                                status:0,
                                msg:'创建成功'
                            })
                        }else{
                            res.json({
                                status:1,
                                msg:'创建失败，请稍后再试'
                            })
                        }
                    })
            }
        })
});
//销售详情列表添加功能
router.post('/productsAdd', function(req, res) {
    console.log(req.body);
    let info=req.body;
    let obj={
        name:info.name,
        price:info.price,
        cat_id:info.cat_id,
        description:info.description,
        theState:info.theState,
        num:info.num
    };
    Products.findOne({name:info.name})
        .then(result=>{//将结果返回
            if(result){//判断是查找到
                res.json({
                    status:1,
                    msg:"客户已被管理"
                })
            }else{
                Products.create(obj).then(result=>{
                    if(result){
                        res.json({
                            status:0,
                            msg:'客户管理成功'
                        })
                    }else{
                        res.json({
                            status:1,
                            msg:'客户管理失败，请稍后再试'
                        })
                    }
                })
            }
        })
});
//销售详情列表批量Delete
router.post('/AllDeleteP', (req, res) => {
    let str = req.body.strID;
    let arr=str.split(",");
    console.log(req.body,str);
    console.log(arr,"-arr");
    for(var i=0;i<arr.length;i++){
        Products.remove({_id:arr[i]}).then((result=>{
            if(result){
                res.json({
                    status: 0,
                    msg: "successfully deleted"
                })
            }else{
                res.json({
                    status: 1,
                    msg: "failed to delete"
                })
            }
        }))
    }
});
//销售详情列表搜索功能
router.post('/search', function(req, res) {
    let sel = req.body.sel;
    Products.find({
        cat_id: sel
    }).populate('cat_id','cat_name').populate('name','cooperativeCustomer').then(result => {
        res.json({
            data: result
        })
    })
});
//销售详情列表Delete功能
router.get('/Pdelete', (req, res) => {
    let _id = req.query._id;
    Products.remove({_id:_id}).then((result=>{
        if(result){
            res.redirect('/admin/products')
        }
    }))
});































module.exports = router;