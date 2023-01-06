import { defineStore } from 'pinia'
import _isEqual from 'lodash/isEqual'

const rootView = {
  fullPath: '/home',
  path: '/home',
  name: 'Home',
  title: '全景地图',
  hash: '',
}

export const useViewStore = defineStore({
  id: 'app-view',
  state() {
    return {
      cachedViews: [],
      visitedViews: [
        {
          ...rootView,
        },
      ],
    }
  },
  getters: {},
  actions: {
    // TODO
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view) {
      const {
        fullPath, hash, path, name, title, meta, query, params,
      } = view
      const viewTemp = {
        fullPath,
        hash,
        path,
        name,
        title,
        meta,
        query,
        params,
      }
      const viewIndex = this.visitedViews.findIndex(
        (v) => v.path === view.path,
      )
      let isEqual = false
      if (viewIndex > -1) {
        isEqual = _isEqual(this.visitedViews[viewIndex].query, view.query)
        if (isEqual) {
          return
        }
        if (viewIndex > -1 && !isEqual) {
          this.visitedViews[viewIndex] = {
            ...viewTemp,
            title: view.meta.title || 'no-name',
          }
          return
        }
      }
      if (this.visitedViews.length > 7) {
        this.visitedViews.splice(1, 1)
      }
      this.visitedViews.push({
        ...viewTemp,
        title: view.meta.title || 'no-name',
      })
    },
    addCachedView(view) {
      if (this.cachedViews.some((item) => item === view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    async delView(view) {
      try {
        await this.delVisitedView(view)
        await this.delCachedView(view)
      } catch (error) {
        console.log('delView.err', error)
      }
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      }
    },
    async delVisitedView(view) {
      const i = this.visitedViews.findIndex((v) => v.path === view.path)
      if (i > -1) {
        this.visitedViews.splice(i, 1)
      }
      return [...this.visitedViews]
    },
    async delCachedView(view) {
      for (const i of this.cachedViews) {
        if (i === view.name) {
          const index = this.cachedViews.indexOf(i)
          this.cachedViews.splice(index, 1)
          break
        }
      }
      return [...this.cachedViews]
    },

    async delOthersViews(view) {
      try {
        await this.delOthersVisitedViews(view)
        await this.delOthersCachedViews(view)
      } catch (error) {
        console.log('delOthersViews.err', error)
      }
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      }
    },
    async delOthersVisitedViews(view) {
      const visitedViews = []
      this.visitedViews.forEach((v) => {
        if (v.path === view.path || v.name === rootView.name) {
          visitedViews.push(v)
        }
      })
      this.visitedViews = visitedViews
      return [...this.visitedViews]
    },
    async delOthersCachedViews(view) {
      const cachedViews = []
      this.cachedViews.forEach((i) => {
        if (i === view.name || i === rootView.name) {
          cachedViews.push(i)
        }
      })
      this.cachedViews = cachedViews

      return [...this.cachedViews]
    },

    async delAllViews(view) {
      try {
        await this.delAllVisitedViews(view)
        await this.delAllCachedViews(view)
      } catch (error) {
        console.log('delAllViews,err', error)
      }

      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      }
    },
    async delAllVisitedViews() {
      this.visitedViews = [
        {
          ...rootView,
        },
      ]
      return [...this.visitedViews]
    },
    async delAllCachedViews() {
      this.cachedViews = []
      return [...this.cachedViews]
    },
    async updateVisitedView(view) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
      return false
    },
  },
})
