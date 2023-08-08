# vite-uniapp-template

🚀 基于 vitejs 驱动的 uniapp 最佳实践的集成模板

🚀 The integrated template based on the best practice of UniPP driven by VITEJS

[查看演示](https://vite-uniapp-template.netlify.app/)

## 特点

- 💪 Assets: 提供了全局静态资源加载工具，无感切换加载本地静态资源/远程静态资源，解决小程序环境下包大小限制问题。
- 📦 SubPackages: 符合心智模型的分包风格，合理的 pages 目录结构，与分包配置轻松实现功能分包。
- 🛣 Router: 使用 uniapp-router-next，并通过优化封装，API 同 VueRouter 类似，扩展了拦截器、中间件、路由别名功能。
- 📊 Store: 使用 Pinia 强力驱动，轻松实现应用状态管理。
- ⚡️Request: 请求库使用 uni-network 完全基于 uniapp API 编写的高性能请求库 API 同 axios
- 👇 Z-paging: 内置了高性能且易于使用的业务常用下拉分页组件模块，轻松实现下拉刷新、上拉加载等功能。
- 💅 Unocss: 使用原子化 CSS 引擎，小程序环境下依然完美支持原子化的 class 命名书写规则。
- 🎨 UI-libs: 预设了 uivew-plus 和 uni-ui 两者相辅相成，轻松满足绝大多数业务场景。
- 📝 NoTs: 只使用 JavaScript，在常规业务场景或人员水平差距过大情况下，TypeScript 并不会提升开发体验。

## 使用方法

### 克隆项目

```shell
git clone https://github.com/viarotel/vite-uniapp-template.git
```

### 安装项目依赖

> 打开并进入克隆的项目根目录下执行以下命令
> 以下命令推荐 使用 pnpm 进行操作 不过你依然可以使用 npm/yarn

```shell
pnpm install
```

### 运行项目

#### 任意编辑器直接运行本项目

```shell
# h5端
pnpm dev:h5
# 微信小程序端
pnpm dev:mp-weixin
#... 更多端请参阅 package.json/script
```

#### 在 HBuilder 中运行本项目

1. 将项目拖动到 HBuilder 中
2. 使用 pnpm install 安装好依赖
3. 点击项目 /src 目录中的任意文件
4. 点击编辑器上方点击运行选择需要运行的环境

### 代码示例

#### 静态资源处理

```js
// 使用远程静态资源
import { useAssets } from './utils/assets/remote'

// 使用本地静态资源
import { useAssets } from './utils/assets/local'

// 全局挂载
app.config.globalProperties.$assets = useAssets

// template中使用
//  <img :src="$assets('/temp.png')" />
```

#### 路由间功能跳转

```js
// 跳转页面
const methods = {
  routerDemo() {
    this.$Router.push({
      path: '/login',
      query: {
        id: 'id',
      },
    })
    // 获取页面参数
    this.$Route.query.id

    // 关闭当前页面跳转到某个页面
    this.$Router.replace('/login')
    // 关闭所有打开的页面跳转到某个页面
    this.$Router.replaceAll('/login')
  },
}

// 为路由设置别名
// pages.config.js 中
const aliasConfig = {
  path: 'pages/login/index',
  // 通过添加 aliasPath 字段
  aliasPath: '/login',
}
```

#### 使用路由守卫

> 位于 router/guards 中

```js
import store from '@/store/index.js'

const homePath = '/pages/index/index'
const loginPath = '/pages/login/index'

const whiteList = [loginPath]

export default (router) => {
  const userStore = store.useUserStore()

  const loginRoute = to => ({
    path: loginPath,
    navType: 'reLaunch',
    force: true,
    query: {
      redirect: {
        path: to.path,
        query: to.query,
      },
    },
  })

  router.beforeEach((to, from, next) => {
    console.log('permission.beforeEach.to', to)
    console.log('permission.beforeEach.from', from)

    const token = userStore.token
    const userId = userStore.userId

    console.log('token', token)
    console.log('userId', userId)

    if (from.fullPath === to.fullPath) {
      next(false)
    }
    else if (token) {
      if (to.path === loginPath) {
        next(homePath)
      }
      else if (userId) {
        next()
      }
      else {
        userStore
          .getUserInfo()
          .then(() => {
            next()
          })
          .catch((error) => {
            console.warn(error)
            userStore.logout({ silented: true })
            next(loginRoute(to))
          })
      }
    }
    else if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(loginRoute(to))
    }
  })

  router.afterEach(() => {})
}
```

#### 使用基于路由的中间件

> postcss.config.js 中

```js
// 使用名为 realname 的中间件
const pageConfig = {
  path: '/pages/personal/index',
  aliasPath: '/personal',
  meta: {
    middleware: ['realname'],
  },
}
```

定义中间件

> router/guards/index.js 中

```js
// 使用 defineMiddleware 定义并包装为中间件
import realname from './realname/index.js'
import { defineMiddleware } from '$uni-router/middleware'

export default (app, router) => {
  // 使用 defineMiddleware 定义了路由中间件
  defineMiddleware(realname, { router, app })
}
```

编写路由中间件代码

> router/guards/realname/index.js 中

```js
import store from '@/store/index.js'
import { useDialog, useToast } from '@/utils/modals'

export default (router) => {
  const userStore = store.useUserStore()

  router.beforeEach((to, from, next) => {
    console.log('realname.beforeEach.to', to)
    console.log('realname.beforeEach.from', from)

    const realStatus = userStore.userInfo.realStatus

    switch (realStatus) {
      case 3:
        next()
        break
      case 2:
        useToast('实名审核中, 请稍后再试').then(() => {
          next(false)
        })
        break
      case 4:
        useDialog(`${userStore.userInfo.auditResult || '提交的实名信息不符'}`, {
          title: '实名失败',
          showCancelButton: true,
          confirmText: '重新认证',
        })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
      default:
        useDialog('请先进行实名认证', { showCancelButton: true })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
    }
  })
  // router.afterEach(() => {})
}
```

### 主要使用的框架和库

- vitejs
- uniapp
- pinia
- uview-plus
- uni-ui
- @uni-helper/uni-network
- uniapp-router-next
- z-paging
- unocss
- unocss-applet

### 常见问题

#### 无法正常安装依赖/无法启动

删除 pnpm-lock.yaml / yarn.lock / package-lock.json 文件后重新安装依赖

### 获得帮助

> 因为是开源项目 全靠爱发电 所以支持有限 更新节奏不固定

- issues: [issues](https://github.com/viarotel-org/vite-uniapp-template/issues)
- email: viarotel@qq.com
- weixin: viarotel
- qq: 523469508

### 支持我

> 如果该项目帮到你的话, 可以请我吃包辣条, 可以使我更有动力完善该项目

<div style="display:flex;">
  <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79dcbc40246743e2b6870419e88e0392~tplv-k3u1fbpfcp-watermark.image?" alt="payment-weixin" style="width: 45%;">
  <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e5e69b83dd746deade95afd4a6864ec~tplv-k3u1fbpfcp-watermark.image?" alt="payment-alipay" style="width: 45%;">
</div>