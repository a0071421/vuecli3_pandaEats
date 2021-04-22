<template>
  <div id="scrollButton" class="scrollTop" @click="scrollToTop">
    <i class="fas fa-2x fa-angle-double-up"></i>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {}
  },
  methods: {
    scrollToTop () {
      $('html, body').animate({ scrollTop: 0 }, 1000)
    }
  },
  mounted () {
    $(window).scroll(() => {
      if ($(window).scrollTop() > 600) {
        $('#scrollButton').fadeIn()
      } else {
        $('#scrollButton').fadeOut()
      }
    })
  }
}
</script>
