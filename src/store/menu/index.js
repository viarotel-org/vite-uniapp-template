import { defineStore } from 'pinia'
import { getRemoteMenu, transformerMenu } from './helpers'
import { tree2List } from '@/utils/treeSimple'
import localMenu from '@/configs/menu/index.js'
import { useRemoteMenu } from '@/configs/index'

export const useMenuStore = defineStore({
  id: 'app-menu',
  state() {
    return {
      useRemoteMenu,
      subKey: '',
      treeMenu: [],
      permission: {},
    }
  },
  getters: {
    flatMenu: state => tree2List(state.treeMenu),
    mapMenu(state) {
      const value = state.flatMenu.reduce((obj, item) => {
        obj[item.path] = item
        return obj
      }, {})
      return value
    },
    subMenus: (state) => {
      let value = []
      if (state.subKey) {
        const findMenu = state.treeMenu.find(
          item => item.path === state.subKey,
        )
        value = findMenu?.children || []
      }
      return value
    },
  },
  actions: {
    async getUserMenu() {
      if (!this.useRemoteMenu) {
        this.treeMenu = localMenu
        return this.treeMenu
      }

      const params = {}
      const data = await getRemoteMenu(params)
      const { menu, permission } = transformerMenu(data)
      console.log('menu', menu)
      console.log('permission', permission)
      this.treeMenu = menu
      this.permission = permission
      return this.treeMenu
    },
  },
})
