<script>
export default {
  async onLaunch() {
    console.log('App Launch')

    this.$store.app.getSystemInfo()
  },
  async onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import "./styles/css/index.css";
@import "uview-plus/index.scss";
</style>
