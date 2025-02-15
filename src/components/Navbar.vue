<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light shadow">
    <loading :active.sync="isLoading"></loading>
    <button
      class="navbar-toggler p-1"
      type="button"
      data-toggle="collapse"
      data-target="#navbarItem"
      aria-controls="navbarItem"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="logo navbar-brand mr-0 mr-md-3" to="/"></router-link>
    <div class="d-flex order-md-1 navbar-icon align-items-end">
      <router-link to="/favorite" href="#" class="nav-link py-3">
        <i class="fas fa-heart fa-lg"></i>
      </router-link>
      <div class="dropdown cart">
        <button type="button"
          class="dropdown btn nav-link py-3"
          data-toggle="dropdown"
          :disabled="disable"
        >
          <i class="fas fa-cart-arrow-down fa-lg"></i>
          <span
            v-if="carts.carts.length !== 0"
            class="cart-badge badge badge-pill badge-danger"
            >{{ carts.carts.length }}</span
          >
        </button>
        <div class="dropdown-menu dropdown-menu-right" @click="clickHandler($event)">
          <div v-if="carts.carts.length !== 0" class="cart-product-wrap">
            <div class="mx-2 text-right">
              <button
                @click="removeCart()"
                type="button"
                class="btn btn-sm btn-danger"
              >
                全部清空
              </button>
            </div>

            <div
              class="cart-product"
              v-for="item in carts.carts"
              :key="item.id"
            >
              <router-link :to="'/product/' + item.id">
                <div
                  v-if="Object.keys(carts.carts).length != 0"
                  class="cart-product-img bg-cover"
                  :style="{
                    backgroundImage: `url(${item.imageUrl})`
                  }"
                ></div
              ></router-link>

              <div class="product-price ml-2 px-2">
                <h5 class="text-truncate product-title">
                  {{ item.title }}
                </h5>

                <div class="clearfix">
                  <span>{{ item.qty }} x </span>
                  <span>NT{{ item.price | currency }}</span>
                  <div class="ml-3 float-right">
                    <span class="h6 text-highlight"
                      >NT{{ item.price * item.qty | currency }} </span
                    >
                    <a
                      class="removeCart"
                      href="#"
                      @click.prevent="removeCart(item.id)"
                    >
                      <i class="far fa-trash-alt fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-total d-flex justify-content-between p-2">
              <span>總計</span>
              <span v-if="carts.total === carts.finalTotal" class="h5 text-highlight">
                NT{{ carts.finalTotal | currency }}
              </span>
              <del v-else class="h6">
                NT{{ carts.total | currency }}
              </del>
            </div>
            <div v-if="carts.total !== carts.finalTotal" class="cart-total d-flex justify-content-between p-2">
              <span class="h5 text-highlight">折扣後</span>
              <span class="h5 text-highlight">
                NT{{ carts.finalTotal | currency }}
              </span>
            </div>
          </div>

          <div class="cart-product-wrap m-1" v-else>
            <h4 class="text-center">購物車尚未有商品喔</h4>
          </div>

          <div class="px-2">
            <router-link
              v-if="carts.carts.length !== 0"
              class="btn btn-sm btn-primary btn-block"
              to="/checkout"
              >結帳去</router-link
            >
            <router-link
              v-else
              class="btn btn-sm btn-highlight btn-block"
              to="/products"
              >去逛逛</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="navbarItem" data-toggle="collapse" data-target=".collapse.show">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            ><i class="fas fa-home"></i> 首頁</router-link
          >
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products"
            ><i class="fas fa-utensils"></i> 美味餐點</router-link
          >
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/login"
            ><i class="fas fa-users"></i> 後臺管理員</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      disable: false,
      isLoading: false,
      carts: JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    }
  },
  methods: {
    signout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    },
    removeCart (id = '') {
      this.$bus.$emit('removeCarts', id)
    },
    enableDropdown () {
      const orderid = this.$route.params.orderId
        ? this.$route.params.orderId
        : ''
      if (
        this.$route.path === '/checkout' ||
        this.$route.path === `/payment/${orderid}`
      ) {
        this.disable = true
      } else {
        this.disable = false
      }
    },
    clickHandler (e) {
      e.stopPropagation()
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('updateCarts', () => {
      vm.carts = JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    })
    vm.enableDropdown()
  },

  watch: {
    $route (to, from) {
      this.enableDropdown()
    }
  }
}
</script>
