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

    <router-link to="/favorite" href="#" class="nav-link order-md-1"
      ><i class="fas fa-heart fa-lg"></i
    ></router-link>

    <div class="dropdown order-md-2 cart">
      <button type="button"
        class="dropdown btn nav-link order-md-2"
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
      <div class="dropdown-menu dropdown-menu-right" @click.prevent="">
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
            class="cart-product d-flex m-1 p-2"
            v-for="item in carts.carts"
            :key="item.id"
          >
            <router-link :to="'/product/' + item.product_id">
              <div
                v-if="Object.keys(carts).length != 0"
                class="cart-product-img bg-cover"
                :style="{
                  backgroundImage: `url(${item.product.imageUrl})`
                }"
              ></div
            ></router-link>

            <div class="product-price ml-2 px-2">
              <h5 class="text-truncate product-title">
                {{ item.product.title }}
              </h5>

              <div class="clearfix">
                <span>{{ item.qty }} x </span>
                <span>NT{{ item.product.price | currency }}</span>
                <div class="ml-3 float-right">
                  <span class="h6 text-highlight"
                    >NT{{ item.final_total | currency }}</span
                  >
                  <a
                    class="removeCart"
                    href="#"
                    @click.prevent="removeCart(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-total d-flex justify-content-between p-2">
            <span>總計</span
            ><span class="h5 text-highlight"
              >NT{{ carts.final_total | currency }}</span
            >
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

    <div class="collapse navbar-collapse" id="navbarItem">
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
          <router-link class="nav-link" to="/coupons"
            ><i class="fas fa-ticket-alt"></i> 優惠活動</router-link
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
import $ from 'jquery'
export default {
  data () {
    return {
      disable: false,
      isLoading: false,
      carts: {
        carts: {}
      }
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
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data
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
    }
  },
  created () {
    const vm = this
    vm.getCarts()
    vm.$bus.$on('updateCarts', carts => {
      vm.carts = carts
    })
    vm.enableDropdown()
  },

  watch: {
    $route (to, from) {
      this.enableDropdown()
    }
  },
  mounted () {
    $(document).ready(() => {
      const dropdown = $('.dropdown')
      dropdown.on('hide.bs.dropdown', (e) => {
        if (e.clickEvent) {
          // console.log($('#removeCartsModal').is(':visible'))
          if (dropdown.has(e.clickEvent.target).length ||
             ($('#removeCartsModal').is(':visible') && $('body').has(e.clickEvent.target).length)) {
            e.preventDefault()
          }
        }
      })
    })
  }
}
</script>
