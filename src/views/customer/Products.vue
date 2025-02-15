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
            :key="item.id" :class="{'not-allowed': item.category === '即將上市'}"
          >
            <div
              :class="{
                product: item.category !== '即將上市',
                disabled: item.category === '即將上市'
              }"
              class="card border-0 h-100 position-relative text-decoration-none"
              @click="item.category !== '即將上市' && getSpecifiedProduct(item.id)"
            >
              <div
                class="rounded-top bg-cover"
                style="height: 150px;"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>

              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <span class="badge badge-highlight text-white">{{
                    item.category }}
                    </span>
                  <div>
                    <a class="like-icon empty" href="#" v-if="!isFavorite(item.id)" @click.prevent.stop="addFavorite(item)">
                      <i class="far fa-heart fa-lg"></i>
                    </a>
                    <a class="like-icon full" href="#" v-if="isFavorite(item.id)" @click.prevent.stop="removeFavorite(item)">
                      <i class="fas fa-heart fa-lg"></i>
                    </a>
                  </div>
                </div>
                <h5 class="card-title font-weight-bold text-ellipsis">
                  <a href="#">{{ item.title }}</a>
                </h5>
                <p class="card-text text-dark text-ellipsis">
                  {{ item.content }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="price">
                    <div v-if="!item.origin_price" class="h5 text-highlight">
                      NT{{ item.price | currency }} 元
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
                    @click.stop="addtoCart(item)"
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
      allProducts: [], // 所有產品
      products: [], // 此分頁產品
      filterProducts: [], // 篩選產品
      pagination: {},
      status: {
        loadingItem: '',
        addtoCart: ''
      },
      carts: JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 }, // 暫存之購物車
      favoritePds: JSON.parse(localStorage.getItem('favorite')) || [],
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

    addtoCart (product) {
      const vm = this
      vm.isLoading = false
      vm.status.addtoCart = product.id
      // 判斷目前欲加入的商品是否存在localStorage的暫存購物車內
      // 使用findIndex判斷，若為-1為不存在->新增至localStorage，並更新購物車total以及finalToal
      // 反之則更新該商品在localStorage的qty，並更新購物車total以及finalToal
      const idIndex = vm.carts.carts.findIndex(data => data.id === product.id)
      if (idIndex === -1) {
        const cartContent = {
          id: product.id, // 產品 ID
          qty: 1, // 產品數量，預設一筆
          title: product.title, // 產品標題
          imageUrl: product.imageUrl, // 產品圖片
          unit: product.unit, // 產品單位
          origin_price: product.origin_price === '' ? Number(product.price) : product.origin_price, // 產品原始金額
          price: Number(product.price) // 產品銷售金額
        }
        vm.carts.carts.push(cartContent)
      } else {
        vm.carts.carts[idIndex].qty++
        vm.carts.carts[idIndex].total += Number(product.price)
      }
      vm.carts.total += Number(product.price)
      vm.carts.finalTotal += 'coupon' in vm.carts ? Math.floor(Number(product.price) * vm.carts.coupon.percent) : Number(product.price)
      localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      const title = vm.filterProducts.find(item => item.id === product.id).title
      vm.$bus.$emit('message:push', `已將 ${title} 加入購物車`, 'success')
      vm.$bus.$emit('updateCarts')
      vm.isLoading = false
      vm.status.addtoCart = ''
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
      vm.$bus.$emit('message:push', '已加入收藏', 'success')
    },
    removeFavorite (product) {
      const vm = this
      vm.favoritePds = vm.favoritePds.filter(item => item.id !== product.id)
      localStorage.setItem('favorite', JSON.stringify(vm.favoritePds))
      vm.$bus.$emit('message:push', '已取消收藏', 'success')
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
    const vm = this
    vm.getProducts()
    vm.$bus.$on('updateCarts', () => {
      vm.carts = JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    })
  },
  components: {
    Pagination
  }
}
</script>
