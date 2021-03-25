<template>
  <div id="scrollButton" class="scrollTop">
    <i class="fas fa-2x fa-angle-double-up"></i>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {}
  },
  mounted () {
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
          $('#scrollButton').fadeIn()
        } else {
          $('#scrollButton').fadeOut()
        }
      })

      $('#scrollButton').click(function () {
        $('html, body').animate(
          {
            scrollTop: 0
          },
          1000
        )
      })
    })
  }
}
</script>
