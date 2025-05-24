import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { appName } from './src/settings/index.js'

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
      aliasPath: '/',
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
      root: 'pages/webview',
      pages: [
        {
          path: 'index',
          aliasPath: '/webview',
          name: 'webview',
          style: {
            navigationBarTitleText: 'webview',
            transparentTitle: 'auto',
          },
        },
      ],
    },
    {
      root: 'pages/parse',
      pages: [
        {
          path: 'index',
          aliasPath: '/parse',
          name: 'parse',
          style: {
            navigationBarTitleText: 'parse',
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
      root: 'pages/settings',
      pages: [
        {
          path: 'index',
          aliasPath: '/settings',
          name: 'settings',
          style: {
            navigationBarTitleText: '系统设置',
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
    backgroundColor: '#F8F8F8',
  },
})
