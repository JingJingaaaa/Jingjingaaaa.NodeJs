const express = require('express');
const CategoryA = require('../../models/CategoryA');
const Articles = require('../../models/Articles');
const router = express.Router();

let resData = {};

router.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:63342');
    res.header("Access-Control-Allow-Credentials", "true");
    console.log(req.session,'index')

    if(req.session.email){
        resData.email = req.session.email
    }else{
        resData.email = ''  // 未登录
    }
    next()
});

router.get('/', (req,res) => {
    /*设置跨域访问
    Access-Control-Allow-Origin
    浏览器的确发出了请求，只有当目标页面的response中，包含了 Access-Control-Allow-Origin 这个header，并且它的值里有我们自己的域名时，浏览器才允许我们拿到它页面的数据进行下一步处理。*/
    res.header("Access-Control-Allow-Origin", 'http://localhost:63342');
    res.header("Access-Control-Allow-Credentials", "true");
    CategoryA.find().then(result => {
        let typeArr = [];
        result.forEach(function (item,index) {
            typeArr.push(item.cat_name)
        })
        resData.types = typeArr;
        //回调函数真正的问题在于他剥夺了我们使用 return 和 throw 这些关键字的能力。而 Promise 很好地解决了这一切。
        return new Promise(function (resolve,reject) {
            //.populate('cat_id','cat_name')，填充cat_id为cat_name
            Articles.find().populate('cat_id','cat_name').then(result => {
                if(result){
                    resolve(result)
                }else{
                    reject("查询文章失败")
                }
            })
        }).then(result => {
            resData.articles = result;
            res.json(resData)
        })

    })
});




module.exports = router;
