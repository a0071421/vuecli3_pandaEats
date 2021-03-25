<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="sidebar col-md-2 bg-light">
      <div class="sidebar-sticky">
        <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">
              <i class="icon fas fa-cart-plus"></i> 產品管理</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              <i class="icon far fa-sticky-note"></i> 訂單管理</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">
              <i class="icon far fa-laugh-wink"></i> 優惠券管理</router-link
            >
          </li>
        </ul>
        <div class="logout">
          <button class="btn nav-link" type="button" @click="logout">
            <i class="icon fas fa-sign-out-alt"></i>登出
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    logout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.isLoading = true
      vm.$http.post(api).then(response => {
        vm.$bus.$emit('message:push', '登出成功', 'success')
        vm.isLoading = false
        vm.$router.push('/')
      })
    }
  }
}
</script>
