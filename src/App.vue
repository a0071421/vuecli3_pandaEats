<template>
  <div id="app">
    <Alert />
    <router-view class="vHeight"></router-view>
    <Footer />
  </div>
</template>

<script>
import Alert from './components/AlertMessage.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Alert,
    Footer
  }
}
</script>

<style lang="scss">
@import "@/assets/all";
html, body, #app {
  height: 100%;
}
</style>
