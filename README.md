# mis-go
mis 管理系统的前端解决方案

### 目录结构
```
/
├── api/            本地模拟数据
│ └── **/*.json
├── static/         前端所有的静态资源
│ ├── modules/      业务相关
│ │ ├── common/     公共模块
│ │ ├── config.js   项目配置
│ │ ├── index.js    入口模块
│ │ └── routers.js  路由表
│ ├── ui/           样式相关
│ │ ├── css/        样式库
│ │ ├── fonts/      字体库
│ │ ├── imgs/       图片库
│ │ │ └── icons/    需要合并的小图标
│ │ └── scss/       .scss 样式库(最终会把这里面的打包到css文件夹下)
│ └── views/        视图模板
├── gulpfile.js
├── index.html      入口
└── package.json
```

### 初始化
```shell
# 所有的依赖包建议用 淘宝镜像的地址安装
# 先检查是否安装全局的 gulp
npm install
npm run init
npm run dev
```

### git 常用命令
```shell
git status
git pull --rebase
# 只修改没有添加文件
git commit -am 'fix ...'
git pull --rebase
git push origin master
# 添加了文件
git add .
git commit -m 'add ...'
git pull --rebase
git push origin master
```
[这里是工作中记录的常用命令](https://paddywang.gitbooks.io/workspace/content/git.html)

### 命名规则
- 文件命名: 全小写 `e.g: http.service.js`
- 模块命名: 全小写 `e.g: stutas.code`
- 服务命名: 大驼峰 `e.g: ApiService`
- 
