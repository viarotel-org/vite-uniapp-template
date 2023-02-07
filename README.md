# vite-uniapp-template

> 基于 vite 驱动的 uniapp 最佳实践的集成模板 <br/>

💡 [查看预览地址](https://static-mp-9c74f872-c4fb-44a1-88c6-7b6d8cd0b4fa.next.bspapp.com/) (请将浏览器切换为手机模式打开, 此处为模拟手机号快捷登录, 不需要验证手机号直接点击登录即可, 由于是免费的服务器,如遇打不开的情况,请多刷新几次)<br/>
💕 css 框架 使用 [unocss](https://uno.antfu.me/)<br/>
💕 request 库 使用 [uni-network](https://github.com/uni-helper/uni-network/) (api 同 axios)<br/>
💕 router 路由 使用 [uni-native-router](https://github.com/Gertyxs/uni-native-router/) (通过二次封装 api 同 vue-router)<br/>
💕 store 库 使用 [pinia](https://pinia.vuejs.org/)<br/>
💕 ui 库 使用 [uview](https://v1.uviewui.com/) (已配置全自动按需导入)

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/viarotel/vite-uniapp-template">
    <img src="src/assets/images/logo.png" alt="viarotel" height="80">
  </a>
  <h3 align="center">vite-uniapp-template</h3>
  <p align="center">
    基于vite驱动的uniapp最佳实践的集成模板
    <br />
    <a href="https://github.com/viarotel/vite-uniapp-template"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://static-mp-9c74f872-c4fb-44a1-88c6-7b6d8cd0b4fa.next.bspapp.com/">查看Demo</a>
    ·
    <a href="https://github.com/viarotel/vite-uniapp-template/issues">报告Bug</a>
    ·
    <a href="https://github.com/viarotel/vite-uniapp-template/issues">提出新特性</a>
  </p>

## 目录

- [上手指南](#上手指南)
  - [获取本项目](#获取本项目)
  - [运行本项目](#运行项目)
    - [任意编辑器直接运行本项目](#任意编辑器直接运行本项目)
    - [在 HBuilder 中运行本项目](#在HBuilder中运行本项目)
  - [打包发行](#打包发行)
    - [任意编辑器发行本项目](#任意编辑器发行本项目)
    - [在 HBuilder 中发行本项目](#在HBuilder中发行本项目)
- [注意事项](#注意事项)
- [文件目录说明](#文件目录说明)
- [使用到的框架和库](#使用到的框架和库)
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

#### 获取本项目

1. clone 本项目 或 直接下载 main 包

```powershell
git clone https://github.com/viarotel/vite-uniapp-template.git
```

#### 运行项目

##### 任意编辑器直接运行本项目

1. 安装依赖
2. 运行项目

```powershell
# 安装依赖 其他方式 yarn install | npm install
pnpm install
# 启动开发模式运行项目 其他方式 yarn dev:h5 | npm run dev:h5
pnpm dev:h5
```

##### 在 HBuilder 中运行本项目

1. 将项目拖动到 HBuilder 中
2. 使用 pnpm install | yarn install | npm install 安装好依赖
3. 点击项目 src 目录中的任意文件
4. 点击编辑器上方点击运行选择需要运行的环境

#### 打包发行

##### 任意编辑器发行本项目

1. 安装依赖
2. 打包项目

```powershell
# 安装依赖 yarn install | npm install
pnpm install
# 打包 yarn build:h5 | npm run build:h5 更多环境命令请参考 package.json 中的 scripts字段
pnpm build:h5
```

##### 在 HBuilder 中发行本项目

1. 将项目拖动到 HBuilder 中
2. 使用 pnpm install | yarn install | npm install 安装好依赖
3. 点击项目 src 目录中的任意文件
4. 点击编辑器上方点击发行选择需要打包的环境

### 注意事项

- 遇到 app 端 dev 运行时无法正常运行请尝试使用较高的安卓版本, 经测试 android x 及以上版本可以正常运行 android 6 版本及以下版本无法正常运行

### 文件目录说明

```
filetree
├── /dist // 打包生成的静态资源文件，用于生产部署。
├── /node_modules // 存放 npm 命令下载的开发环境和生产环境的依赖包。
├── /patches/ // node_modules 包补丁文件
├── /public/ //存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到 dist 文件夹中
│  ├── /index.html // 入口模板文件
├── /src/ // 存放项目源码及需要引用的资源文件。
│  ├── /api/ // 接口配置
│  ├── /assets/ // 存放项目中需要用到的资源文件，css、js、images 等 支持树摇
│  ├── /components/ // 存放 vue 开发中一些公共组件：header.vue、footer.vue 等。
│  ├── /configs/ // 全局配置文件
│  ├── /directives/ // 全局指令注册
│  ├── /icons/ // 存放图标的地方
│  ├── /pages/ // 存在 vue 页面组件的文件夹。
│  ├── /plugins/ // 项目常用的插件集合
│  ├── /router/ // 路由配置
│  ├── /static/ // 存放应用引用静态资源（如图片、视频等）的目录 存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到 dist 文件夹中 无法树摇
│  ├── /store/ // 存放 pinia 为 vue 专门开发的状态管理器。
│  ├── /styles/ // 存放全局样式
│  ├── /uni_modules/ // uni-app 的插件模块化规范
│  ├── /utils/ // 存放开发过程中一些常用的 .js 方法。
│  ├── /App.vue // 项目入口文件
│  ├── /ext.json // 小程序作为第三方开发需要用到的配置文件 动态切换 appid 等功能
│  ├── /main.js // 入口文件
│  ├── /manifest.json // uniapp 管理各个环境下的的配置
│  ├── /pages.json // 页面和路由配置文件
│  ├── /uni.scss // uni.scss 是一个特殊文件，在代码中无需 import 这个文件即可在 scss 代码中使用这里的样式变量
├── .eslintignore // eslint 忽略文件配置
├── .eslintrc.cjs // eslint 文件配置
├── .gitignore // git 忽略文件配置
├── index.html // 入口 html 模板文件
├── jsconfig.json // JavaScript 语言服务的配置文件 代码提示 文件索引等问题
├── LICENSE // MIT许可证
├── manifest.config.js // uniapp 管理各个环境下的的配置的js配置模式 此配置将合并到 src/manifest.json 中
├── package.json //包管理配置文件
├── pages.config.js // uniapp 页面和路由配置文件的js配置模式 此配置将合并到 src/pages.json 中
└── pnpm-lock // pnpm 锁定依赖版本
├── README.md
├── unocss.config.js // unocss 的配置文件
├── postcss.config.js // 对 css 文件进行编译转换增强的配置文件
├── vite.config.js // vite 配置文件
```

### 使用到的框架和库

- [vite](https://cn.vitejs.dev/)
- [uniapp](https://uniapp.dcloud.io/)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-prest-weapp/)
- [@uni-helper/uni-network](https://github.com/uni-helper/uni-network/)
- [uni-native-router](https://github.com/Gertyxs/uni-native-router/)
- [pinia](https://pinia.vuejs.org/)
- [uview](https://www.uviewui.com/)

### 关键字

- template
- vue
- vite
- uniapp
- unocss
- axios
- router
- pinia
- uview
- applet
- app

### 版本控制

该项目使用 Git 进行版本管理。

### 作者

viarotel@qq.com

_您也可以在贡献者名单中参看所有参与该项目的开发者。_

### 版权说明

该项目签署了 MIT 授权许可，详情请参阅 [LICENSE](LICENSE)

### 鸣谢

- 感谢 [unocss-preset-weapp](https://github.com/MellowCo/unocss-prest-weapp/) 提供的 css 方案
- 感谢 [@uni-helper/uni-network](https://github.com/uni-helper/uni-network/) 提供的 request 方案, 及 uniapp 系列插件
- 感谢 [uni-native-router](https://github.com/Gertyxs/uni-native-router/) 提供的 router 方案
- 感谢 [pinia](https://pinia.vuejs.org/) 提供的 store 方案

<!-- links -->

[your-project-path]: viarotel/vite-uniapp-template
[contributors-shield]: https://img.shields.io/github/contributors/viarotel/vite-uniapp-template.svg?style=flat-square
[contributors-url]: https://github.com/viarotel/vite-uniapp-template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/viarotel/vite-uniapp-template.svg?style=flat-square
[forks-url]: https://github.com/viarotel/vite-uniapp-template/network/members
[stars-shield]: https://img.shields.io/github/stars/viarotel/vite-uniapp-template.svg?style=flat-square
[stars-url]: https://github.com/viarotel/vite-uniapp-template/stargazers
[issues-shield]: https://img.shields.io/github/issues/viarotel/vite-uniapp-template.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/viarotel/vite-uniapp-template.svg
[license-shield]: https://img.shields.io/github/license/viarotel/vite-uniapp-template.svg?style=flat-square
[license-url]: https://github.com/viarotel/vite-uniapp-template/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/viarotel
