import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      // '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/index/home/index',
      aliasPath: '/',
      style: {
        navigationBarTitleText: '主页',
      },
    },
    {
      path: 'pages/index/example/index',
      aliasPath: '/example',
      style: {
        navigationBarTitleText: '示例',
      },
    },
    {
      path: 'pages/index/personal/index',
      aliasPath: '/personal',
      style: {
        navigationBarTitleText: '我的',
      },
    },
    {
      path: 'pages/login/phone/index',
      aliasPath: '/login',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/errors/404/index',
      aliasPath: '/404',
      style: {
        navigationBarTitleText: '404',
      },
    },
  ],
  subPackages: [
    {
      root: 'pages/webview',
      pages: [
        {
          path: 'index',
          aliasPath: '/webview',
          style: {
            navigationBarTitleText: 'webview',
          },
        },
      ],
    },
    {
      root: 'pages/middleware',
      pages: [
        {
          path: 'index',
          aliasPath: '/middleware',
          meta: {
            middleware: ['realname'],
          },
          style: {
            navigationBarTitleText: '路由中间件',
          },
        },
      ],
    },
    {
      root: 'pages/statement',
      pages: [
        {
          path: 'index',
          aliasPath: '/statement',
          style: {
            navigationBarTitleText: '产品服务协议',
          },
        },
      ],
    },
    {
      root: 'pages/realname',
      pages: [
        {
          path: 'index',
          aliasPath: '/realname',
          style: {
            navigationBarTitleText: '实名认证',
          },
        },
      ],
    },
    {
      root: 'pages/contact',
      pages: [
        {
          path: 'index',
          aliasPath: '/contact',
          style: {
            navigationBarTitleText: '联系我们',
          },
        },
      ],
    },
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    list: [
      {
        iconPath: 'static/tabbar/tab-home.png',
        selectedIconPath: 'static/tabbar/tab-home-active.png',
        pagePath: 'pages/index/home/index',
        text: '主页',
      },
      {
        iconPath: 'static/tabbar/tab-example.png',
        selectedIconPath: 'static/tabbar/tab-example-active.png',
        pagePath: 'pages/index/example/index',
        text: '示例',
      },
      {
        iconPath: 'static/tabbar/tab-personal.png',
        selectedIconPath: 'static/tabbar/tab-personal-active.png',
        pagePath: 'pages/index/personal/index',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'vite-uniapp-template',
    navigationBarBackgroundColor: '#ffffff',
    backgroundColor: '#f8f8f8',
  },
  // condition: {
  //   current: 0,
  //   list: [
  //     {
  //       name: 'pages/contact/index',
  //       path: 'pages/contact/index',
  //     },
  //   ],
  // },
})
