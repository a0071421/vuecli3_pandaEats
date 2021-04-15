<template>
  <div>
    <ScrollTop />
    <Navbar />
    <router-view></router-view>
    <RemoveModal />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
// import Footer from '@/components/Footer.vue'
import RemoveModal from '@/components/RemoveCarts.vue'
import ScrollTop from '@/components/ScrollTop.vue'
export default {
  components: {
    ScrollTop,
    Navbar,
    RemoveModal
  }
}
</script>
