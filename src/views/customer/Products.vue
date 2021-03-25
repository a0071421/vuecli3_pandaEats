<template>
  <div class="container mt-4">
    <loading :active.sync="isLoading"></loading>
    <div v-if="products.length === 0 && !isLoading" class="text-center">
      <h3 class="py-4">目前尚無產品哦</h3>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="sticky-navbar">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="搜尋商品"
              v-model="search"
              @keyup.enter="findProducts"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="findProducts"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <ul class="category">
            <li class="category-group">
              <button type="button" class="category-group-item" @click="categoryProducts()">
                全部商品
              </button>
            </li>
            <li class="category-group">
              <button type="button"
                class="category-group-item"
                @click="categoryProducts('主食類')"
              >
                主食類
              </button>
            </li>
            <li class="category-group">
              <button type="button"
                class="category-group-item"
                @click="categoryProducts('增肌類')"
              >
                增肌類
              </button>
            </li>
            <li class="category-group">
              <button type="button"
                class="category-group-item"
                @click="categoryProducts('沙拉類')"
              >
                沙拉類
              </button>
            </li>
            <li class="category-group">
              <button type="button"
                class="category-group-item"
                @click="categoryProducts('飲料')"
              >
                飲品
              </button>
            </li>
            <li class="category-group">
              <button type="button"
                class="category-group-item"
                @click="categoryProducts('即將上市')"
              >
                即將上市
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-6 mb-4"
            v-for="item in filterProducts"
            :key="item.id"
          >
            <div
              :class="{
                product: item.category !== '即將上市',
                disabled: item.category === '即將上市'
              }"
              class="card border-0 h-100 position-relative text-decoration-none"
              @click.prevent="
                item.category !== '即將上市' && getSpecifiedProduct(item.id)
              "
            >
              <div>
                <a class="like-icon empty" href="#" v-if="!isFavorite(item.id)" @click.prevent.stop="addFavorite(item)">
                  <i class="far fa-heart fa-lg"></i>
                </a>
                <a class="like-icon full" href="#" v-if="isFavorite(item.id)" @click.prevent.stop="removeFavorite(item)">
                  <i class="fas fa-heart fa-lg"></i>
                </a>
              </div>

              <div
                class="rounded-top bg-cover"
                style="height: 150px;"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>

              <div class="card-body">
                <span class="badge badge-highlight text-white">{{
                  item.category
                }}</span>
                <!-- <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span> -->
                <h5 class="card-title font-weight-bold text-ellipsis">
                  <a href="#">{{ item.title }}</a>
                </h5>
                <p class="card-text text-dark text-ellipsis">
                  {{ item.content }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="price">
                    <div v-if="!item.price" class="h5 text-highlight">
                      NT{{ item.origin_price | currency }} 元
                    </div>
                    <div v-else>
                      <del class="h6"
                        >NT{{ item.origin_price | currency }} 元</del
                      >
                      <div class="h5 text-highlight">
                        NT{{ item.price | currency }} 元
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-cart btn-outline-primary d-flex justify-content-center align-items-center"
                    @click.stop="addtoCart(item.id)"
                    :disabled="item.category === '即將上市'"
                  >
                    <i
                      class="fas fa-cart-plus fa-lg"
                      v-if="status.addtoCart !== item.id"
                    ></i>
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.addtoCart === item.id"
                    ></i>
                  </button>
                </div>
              </div>

              <button
                @click="getSpecifiedProduct(item.id)"
                type="button"
                class="btn btn-block btn-outline-highlight"
                :disabled="item.category === '即將上市'"
              >
                <i
                  class="fas fa-spinner fa-spin"
                  v-if="status.loadingItem === item.id"
                ></i>
                查看更多
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="filterProducts.length === 0 && search != ''"
          class="text-center"
        >
          <h3 class="py-4">目前無此商品哦</h3>
        </div>

        <Pagination
          id="Pagination"
          v-if="filterProducts.length > 0"
          :pagination-info="pagination"
          @changePage="getProducts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      isLoading: false,
      allProducts: [],
      products: [],
      filterProducts: [],
      specifiedProduct: {},
      pagination: {},
      status: {
        loadingItem: '',
        addtoCart: ''
      },
      carts: {
        carts: {}
      },
      favoritePds: [],
      search: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.filterProducts = vm.products
        vm.pagination = response.data.pagination
      })
      api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then(response => {
        vm.allProducts = response.data.products
        vm.isLoading = false
      })
    },
    getSpecifiedProduct (id) {
      this.$router.push(`/product/${id}`).catch(() => {})
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.addtoCart = id
      vm.isLoading = true
      const cart = {
        product_id: id,
        qty
      }
      // 新增之產品是否已在購物車內
      const repeatedPd = vm.carts.carts.find(item => item.product_id === id)

      // 新增之產品已在購物車內
      if (typeof repeatedPd !== 'undefined') {
        cart.qty += repeatedPd.qty
        vm.removeCart(repeatedPd.id)
      }

      vm.$http.post(api, { data: { ...cart } }).then(response => {
        const title = vm.products.find(item => item.id === id).title
        vm.$bus.$emit('message:push', `已將 ${title} 加入購物車`, 'success')
        vm.getCarts()
      })
    },
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data
        vm.$bus.$emit('updateCarts', vm.carts)
        vm.isLoading = false
        vm.status.addtoCart = ''
      })
    },
    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then(() => {
        vm.isLoading = false
        vm.getCarts()
      })
    },
    addFavorite (product) {
      const vm = this
      vm.favoritePds.push(product)
      localStorage.setItem('favorite', JSON.stringify(vm.favoritePds))
    },
    removeFavorite (product) {
      const vm = this
      vm.favoritePds = vm.favoritePds.filter(item => item.id !== product.id)
      localStorage.setItem('favorite', JSON.stringify(vm.favoritePds))
    },
    isFavorite (id) {
      const vm = this
      return vm.favoritePds.some(item => item.id === id)
    },
    findProducts () {
      const vm = this
      if (vm.search === '') {
        vm.filterProducts = vm.products
      } else {
        vm.filterProducts = vm.products.filter(item => item.title.indexOf(vm.search) !== -1)
      }
    },
    categoryProducts (type = 'all') {
      const vm = this
      if (type === 'all') {
        vm.filterProducts = vm.products

        $('.pagination').show()
      } else {
        vm.filterProducts = vm.allProducts.filter(item => item.category === type)
        $('.pagination').hide()
      }
    }
  },

  created () {
    this.getProducts()
    this.getCarts()
    this.favoritePds = JSON.parse(localStorage.getItem('favorite')) || []
    this.$bus.$on('updateCarts', carts => {
      this.carts = carts
    })
  },
  components: {
    Pagination
  }
}
</script>
