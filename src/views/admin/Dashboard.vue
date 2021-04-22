<template>
  <div>
    <nav
      class="navbar navbar-expand-md bg-primary navbar-light sticky-top flex-md-nowrap shadow"
    >
      <button class="navbar-toggler bg-secondary p-1" type="button" @click="sidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/"
        ><img src="@/assets/images/logo-lg.png" alt="logo"
      /></router-link>
    </nav>

    <div class="container-fluid">
      <div class="row overflow-hidden">
        <Sidebar></Sidebar>
        <div class="container-fluid">
          <div class="row justify-content-end">
            <main class="main col-md-10 px-5">
              <router-view></router-view>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import $ from 'jquery'
export default {
  components: {
    Sidebar
  },
  methods: {
    sidebarToggle () {
      $('body').toggleClass('show')
    }
  }
}
</script>
