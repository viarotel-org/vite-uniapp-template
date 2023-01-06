<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
    this.$store.userStore.getUserInfo()
  },
  onHide() {
    console.log('App Hide')
  },
}
</script>

<style lang="scss"></style>
