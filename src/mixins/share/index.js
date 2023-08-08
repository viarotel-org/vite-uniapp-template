import { appName } from '@/configs/index'

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
      path: '/pages/index/index',
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
