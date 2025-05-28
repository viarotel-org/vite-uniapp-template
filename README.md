# Vite Uniapp Template

🚀 **以实用为先的 uni-app 模板。** [查看演示](https://vite-uniapp-template.netlify.app/)

该模板为您的 uniapp 项目提供了一个强大的起点，集成了现代化工具和精心设计的约定，以简化开发流程。

## 核心特性

- 💪 优化的资源管理: 无缝切换本地与远程静态资源。这对于克服小程序包大小限制至关重要。
- 📦 智能分包: 清晰直观的 pages 目录结构，结合便捷的配置，轻松实现基于功能的分包。
- 🛣 类 VueRouter 路由: 使用 [uniapp-router-next](https://www.npmjs.com/package/uniapp-router-next) 并进行了增强，如拦截器、中间件和路由别名，提供熟悉的 API 体验。
- 📊 Pinia 状态管理: 借助 [Pinia](https://pinia.vuejs.org/) 实现强大且直观的应用状态管理。
- ⚡️ 现代化请求工作流: 采用 [Alova](https://alova.js.org/)，一个下一代请求库，简化数据获取流程。
- 👇 内置 Z-Paging: 集成了高性能、易用的下拉分页组件，轻松实现下拉刷新和上拉加载更多等功能。
- 💅 Unocss 原子化 CSS: 使用原子化 CSS 类名书写规范，即使在小程序环境下也完美支持。
- 🎨 轻量级 UI 与主题化: 集成 [wot-design-uni](https://netlify.wot-design-uni.cn/)，提供更轻量的 UI，满足绝大多数业务场景，并支持主题定制。
- 📝 专注 JavaScript: 使用 JavaScript 构建，在常规业务场景或团队技能水平差异较大时，确保更平滑的开发体验。

## 快速上手

### 1. 克隆项目

```shell
git clone https://github.com/viarotel-org/vite-uniapp-template.git
cd vite-uniapp-template
```

### 2. 安装依赖

> 请使用 node@20.0 及以上版本。

推荐使用 `pnpm`。当然，也可以使用 `npm` 或 `yarn`。

```shell
pnpm install
```

> **注意：** 如果遇到安装问题，尝试删除 `pnpm-lock.yaml`、`yarn.lock` 或 `package-lock.json` 文件后重新安装依赖。

### 3. 运行项目

#### 使用代码编辑器 (例如 VS Code)

在项目根目录下执行以下命令：

```shell
# H5 平台
pnpm dev:h5

# 微信小程序
pnpm dev:mp-weixin

# Android App
pnpm dev:app-android

# 更多平台请参阅 package.json 中的 `scripts` 部分。
```

#### 使用 HBuilderX

- 将项目文件夹拖拽到 HBuilderX 中。
- 确保已安装依赖 (如果尚未安装，请在项目根目录运行 `pnpm install`)。
- 点击项目 `/src` 目录下的任意文件。
- 在 HBuilderX 菜单中，导航至“运行”并选择您的目标运行环境。

## 功能示例

### 静态资源处理

通过 `.env` 文件配置静态资源的加载方式：

- **加载本地静态资源：**

```bash
# 转换过程: ~@assets/images/logo.png -> /src/assets/images/logo.png
VITE_ASSETS_MODE=local
```

- **加载远程静态资源：**

```bash
# 转换过程: ~@assets/images/logo.png -> `${process.env.VITE_ASSETS_CDN}/images/logo.png`
VITE_ASSETS_MODE=remote
```

更多配置请参考 `vite.config.plugins.js` 中的 `useAssetPathResolver` 插件

### 全局主题定制

由 `unocss-preset-shades` 提供支持。轻松应用您的主题颜色：

```html
<div class="text-primary-500"></div>

<div class="bg-primary-500"></div>

<!-- 仅在小程序中生效，具体使用方法请参考 [unocss-preset-uni](https://github.com/uni-helper/unocss-preset-uni)  -->
<div class="uni-mp:border uni-mp:border-primary-500"></div>
```

### 页面导航

与 Vue Router 类似，您可以通过编程方式进行导航：

- **在模板中：**

  ```javascript
  // 跳转到登录页并携带查询参数
  this.$Router.push({
    path: '/login',
    query: {
      id: 'someId',
    },
  })

  // 获取路由参数
  const userId = this.$Route.query.id

  // 替换当前页面
  this.$Router.replace('/dashboard')

  // 关闭所有页面并跳转
  this.$Router.replaceAll('/home')
  ```

- **在脚本中 (支持自动导入)：**

  ```javascript
  // 已预置自动导入该部分可省略
  // import { useRoute, useRouter } from '$uni-router'

  const router = useRouter()
  const route = useRoute()

  router.push('/settings')
  console.log(route.query)
  ```

- **路由别名 (`pages.config.js`)：**

  ```javascript
  const aliasConfig = {
    path: 'pages/login/index', // 实际路径
    aliasPath: '/login', // 别名
  }
  ```

### 路由守卫

实现导航守卫以处理权限验证等逻辑：

```javascript
// 示例: src/permission/login/index.js
router.beforeEach((to, from, next) => {
  // 在此编写你的逻辑 (例如：检查用户是否已认证)
  // if (to.path === '/profile' && !isAuthenticated) {
  //   next('/login');
  // } else {
  //   next();
  // }
  next() // 默认继续导航
})

router.afterEach((to, from) => {
  // 导航后逻辑
})
```

> 具体实现请参阅 `src/permission` 目录。

### 路由中间件

对特定路由应用中间件以实现精细化控制。

- **使用中间件 (`pages.config.js`)：**

  ```javascript
  // 对用户页面应用 'test' 中间件
  const pageConfig = {
    path: '/pages/user/index',
    aliasPath: '/user',
    meta: {
      middleware: ['test'],
    },
  }
  ```

- **定义中间件：**
  中间件代码结构与路由守卫基本一致，但仅拦截在其声明的路由中配置的中间件。

  ```javascript
  // 示例: src/permission/test/index.js
  import { defineMiddleware } from '$uni-router'
  import testMiddlewareLogic from './test/index.js'

  export default (app, router) => {
    defineMiddleware('test', testMiddlewareLogic, { router, app })
  }
  ```

## 常见问题

- **依赖安装/启动失败**:
  如果遇到问题，尝试删除 `pnpm-lock.yaml`、`yarn.lock` 或 `package-lock.json` 文件，然后重新运行安装命令 (例如 `pnpm install`)。
- **路由守卫陷入循环**:
  路由守卫中页面跳转不支持路径别名，请使用实际路径，避免使用别名(aliasPath)。

## 获取支持

这是一个依靠热爱驱动的开源项目，因此支持会根据时间情况提供，更新节奏可能不固定。

- **项目问题与反馈**: [在 GitHub 上提交 Issue](https://github.com/viarotel-org/vite-uniapp-template/issues)
- **联系方式**: viarotel@qq.com

## 支持本项目

如果该项目帮到你的话，可以请我喝杯咖啡，让我更有精神完善该项目 😛

<div style="display:flex;">
  <img src="https://cdn.jsdelivr.net/gh/viarotel-org/escrcpy@main/src/assets/sponsor/viarotel-wepay.png" alt="viarotel-wepay" width="30%">
  <img src="https://cdn.jsdelivr.net/gh/viarotel-org/escrcpy@main/src/assets/sponsor/viarotel-alipay.png" alt="viarotel-alipay" width="30%">
  <img src="https://cdn.jsdelivr.net/gh/viarotel-org/escrcpy@main/src/assets/sponsor/viarotel-paypal.png" alt="viarotel-paypal" width="30%">
</div>
