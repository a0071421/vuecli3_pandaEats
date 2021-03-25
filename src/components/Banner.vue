<template>
  <div id="carouselIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li
        data-target="#carouselIndicators"
        data-slide-to="0"
        class="active"
      ></li>
      <li data-target="#carouselIndicators" data-slide-to="1"></li>
      <li data-target="#carouselIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div
        class="carousel-item active banner-carousel-item bg-cover"
        style="background-image: url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');"
      >
        <div class="carousel-caption bg-light-dark px-2">
          <h5>一個人，田野間的輕鬆美味</h5>
        </div>
      </div>
      <div
        class="carousel-item banner-carousel-item bg-cover"
        style="background-image: url('https://images.unsplash.com/photo-1495461199391-8c39ab674295?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');"
      >
        <div class="carousel-caption bg-light-dark px-2">
          <h5>大口的放縱，毫無保留</h5>
        </div>
      </div>
      <div
        class="carousel-item banner-carousel-item bg-cover"
        style="background-image: url('https://images.unsplash.com/photo-1453831362806-3d5577f014a4?dpr=2&auto=format&fit=crop&w=1500&h=1016&q=80&cs=tinysrgb&crop=');"
      >
        <div class="carousel-caption bg-light-dark px-2">
          <h5>愛戀的赤裸裸辣辣</h5>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselIndicators"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselIndicators"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {}
</script>
