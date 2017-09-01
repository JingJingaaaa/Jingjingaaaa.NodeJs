# 如何使用
+ 克隆
```
$ git clone https://github.com/JingJingaaaa/Jingjingaaaa.NodeJs.git

```
+ 安装并运行
```
$ npm install
$ npm start

```
+ 建议使用WebStorm开发工具
+ 要确保您要有MongoDB数据库
+ 打开MyProject
    - 复制文件db路径
+ 打开命令窗口
```
$ mongod --dbpath="文件db的路径"

```
+ 打开MongoDB
    - 建立链接
+

+ 恭喜您可以使用啦（撒花）

+ "start": "node ./bin/www"
    - 在浏览器打开
    ```
    localhost:3000
    ```
+ 查看前台你页面需要修改一些内容
- 修改文件路径：MyProject/routes/api/api.js
- 修改内容（将跨域端口号修改成您自己的端口号）：
```
 res.header("Access-Control-Allow-Origin", 'http://localhost:63342');//第25行
 res.header("Access-Control-Allow-Origin", 'http://localhost:您自己的端口号')
```


# 后台主要功能
+ 文章分类
     - 新增
     - 删除
     - 修改
     - 查询
     - 移动分类至
+ 产品分类
     - 新增
     - 删除
     - 修改
     - 查询
     - 移动分类至
+ 管理员登陆
+ 管理员添加

# 前台web
+ 首页
    - 可以获得后台数据并渲染出来
+ 注册、登录

## 这个Demo主要是用来巩固日常所学，功能简陋让各位见笑了
+ 静静会一直努力的^-^
- 不要在该奋斗的年纪选择了安逸



