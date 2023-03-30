import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { title } from './src/configs/index'

export default defineUniPages({
  // middleware: ['permission'],
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@/uni_modules/uni-$1.vue',
      '^u-(.*)': 'vk-uview-ui/components/u-$1/u-$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/login/phone/index',
      shortcut: '/login',
      style: {
        navigationBarTitleText: '',
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: '#ffffff',
      },
    },
    {
      path: 'pages/home/tab-home/index',
      shortcut: '/tab-home',
      style: {
        navigationBarTitleText: '项目简介',
        // navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/home/tab-personal/index',
      shortcut: '/tab-personal',
      style: {
        navigationBarTitleText: '我的',
        navigationStyle: 'custom',
      },
    },
  ],
  // 分包配置
  subPackages: [
    {
      root: 'pages/connect',
      pages: [
        {
          path: 'index',
          style: {
            navigationBarTitleText: '联系我们',
          },
        },
      ],
    },
    {
      root: 'pages/statement',
      pages: [
        {
          path: 'index',
          style: {
            navigationBarTitleText: '特别声明',
          },
        },
      ],
    },
  ],
  // 预加载
  preloadRule: {
    // @ts-ignore
    'pages/connect/index': {
      network: 'all',
      packages: ['__APP__'],
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#2b9939',
    backgroundColor: '#F8F8F8',
    list: [
      {
        iconPath: 'static/images/tabbar/tab-home.png',
        selectedIconPath: 'static/images/tabbar/tab-home-active.png',
        pagePath: 'pages/home/tab-home/index',
        text: '首页',
      },
      {
        iconPath: 'static/images/tabbar/tab-personal.png',
        selectedIconPath: 'static/images/tabbar/tab-personal-active.png',
        pagePath: 'pages/home/tab-personal/index',
        text: '我的',
      },
    ],
  },
  globalStyle: {
    navigationBarTextStyle: 'white',
    navigationBarTitleText: title,
    navigationBarBackgroundColor: '#2b9939',
    backgroundColor: '#F8F8F8',
  },
  condition: {
    current: 0,
    list: [
      {
        name: 'pages/home/tab-home/index',
        path: 'pages/home/tab-home/index',
        query: '',
      },
      {
        name: 'pages/statement/index',
        path: 'pages/statement/index',
        query: '',
      },
      {
        name: 'pages/login/phone/index',
        path: 'pages/login/phone/index',
        query: '',
      },
    ],
  },
})
