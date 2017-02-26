# mis-go
mis 管理系统的前端解决方案

### 目录结构
```
/
├── api/   本地模拟数据
│ └── **/*.json
├── static/    前端所有的静态资源
│ ├── modules/    业务相关
│ │ ├── common/    公共模块
│ │ ├── config.js    项目配置
│ │ ├── index.js    入口模块
│ │ └── routers.js    路由表
│ ├── ui/    样式相关
│ │ ├── css/    样式库
│ │ ├── fonts/    字体库
│ │ ├── imgs/    图片库
│ │ │ └── icons/    需要合并的小图标
│ │ └── scss/    .scss 样式库(最终会把这里面的打包到css文件夹下)
│ └── views/    视图模板
├── gulpfile.js
├── index.html    入口
└── package.json
```
