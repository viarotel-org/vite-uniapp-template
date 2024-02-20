import { appName, homePage } from '@/configs/index'

export default {
  data() {
    return {
      shareAppMessageProps: {},
      shareTimelineProps: {},
    }
  },
  onShareAppMessage() {
    return {
      title: appName,
      path: homePage,
      ...this.shareAppMessageProps,
    }
  },
  onShareTimeline() {
    return {
      title: appName,
      query: '',
      ...this.shareTimelineProps,
    }
  },
}
