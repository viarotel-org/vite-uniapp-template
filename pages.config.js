import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { appName } from './src/settings/index.mjs'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/index/index',
      aliasPath: '/index',
      name: 'index',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '主页',
      },
    },
    {
      path: 'pages/index/example/index',
      aliasPath: '/example',
      name: 'example',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '示例',
      },
    },
    {
      path: 'pages/index/user/index',
      aliasPath: '/user',
      name: 'user',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '我的',
      },
    },
    {
      path: 'pages/login/index',
      aliasPath: '/login',
      name: 'login',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '登录',
      },
    },
  ],
  subPackages: [
    {
      root: 'pages/common',
      pages: [
        {
          path: 'web-view/index',
          aliasPath: '/web-view',
          name: 'web-view',
          style: {
            navigationBarTitleText: 'web-view',
            transparentTitle: 'auto',
          },
        },
        {
          path: 'rich-view/index',
          aliasPath: '/rich-view',
          name: 'rich-view',
          style: {
            navigationBarTitleText: 'rich-view',
          },
        },
      ],
    },
    {
      root: 'pages/tips',
      pages: [
        {
          path: 'middleware/index',
          aliasPath: '/tips-middleware',
          name: 'tips-middleware',
          meta: {
            middleware: ['test'],
          },
          style: {
            navigationBarTitleText: '中间件',
          },
        },
      ],
    },
    {
      root: 'pages/template',
      pages: [
        {
          path: 'paging/index',
          aliasPath: '/template-paging',
          name: 'template-paging',
          style: {
            navigationBarTitleText: '通用列表',
          },
        },
      ],
    },
    {
      root: 'pages/personal',
      pages: [
        {
          path: 'index',
          aliasPath: '/personal',
          name: 'personal',
          style: {
            navigationBarTitleText: '个人资料',
            transparentTitle: 'auto',
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
          name: 'contact',
          style: {
            navigationBarTitleText: '联系我们',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/preference',
      pages: [
        {
          path: 'index',
          aliasPath: '/preference',
          name: 'preference',
          style: {
            navigationBarTitleText: '偏好设置',
          },
        },
      ],
    },
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#FFFFFF',
    list: [
      {
        iconPath: 'static/images/tabbar/home.png',
        selectedIconPath: 'static/images/tabbar/home-active.png',
        pagePath: 'pages/index/index',
        text: '主页',
      },
      {
        iconPath: 'static/images/tabbar/example.png',
        selectedIconPath: 'static/images/tabbar/example-active.png',
        pagePath: 'pages/index/example/index',
        text: '示例',
      },
      {
        iconPath: 'static/images/tabbar/user.png',
        selectedIconPath: 'static/images/tabbar/user-active.png',
        pagePath: 'pages/index/user/index',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    navigationBarTitleText: appName,
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F8F8F8',
  },
})
