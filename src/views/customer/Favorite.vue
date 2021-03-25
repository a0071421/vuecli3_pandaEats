<template>
  <div class="container mt-4">
    <loading :active.sync="isLoading"></loading>

    <div v-if="favoritePds.length === 0">
      <div class="text-center">
        <h3 class="py-4">目前沒有關注的商品哦</h3>
        <router-link to="/products" class="btn btn-primary"
          >趕快去看看</router-link
        >
      </div>
    </div>
    <div v-else>
      <h2 class="text-center">我的最愛清單</h2>
      <div class="row mt-4">
        <div
          class="col-lg-4 col-md-6 col-sm-6 mb-4"
          v-for="item in favoritePds"
          :key="item.id"
        >
          <div
            class="product card border-0 h-100 position-relative text-decoration-none"
            @click.prevent="getSpecifiedProduct(item.id)"
          >
            <div>
              <a class="like-icon" href="#" v-if="isFavorite(item.id)" @click.prevent.stop="removeFavorite(item)">
                <i class="fas fa-heart fa-lg"></i>
              </a>
            </div>

            <div
              style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
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
                  <div
                    v-if="item.price && !item.origin_price"
                    class="h5 text-highlight"
                  >
                    NT{{ item.price | currency }} 元
                  </div>
                  <del v-if="item.origin_price" class="h6"
                    >NT{{ item.origin_price | currency }} 元</del
                  >
                  <div v-if="item.origin_price" class="h5 text-highlight">
                    NT{{ item.price | currency }} 元
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-cart btn-outline-primary d-flex justify-content-center align-items-center"
                  @click.stop="addtoCart(item.id)"
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
    </div>
    <!-- <Pagination :pagination-info="pagination" @changePage="" /> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      isLoading: false,
      favoritePds: [],
      specifiedProduct: {},
      pagination: {},
      status: {
        loadingItem: '',
        addtoCart: ''
      },
      carts: {
        carts: {}
      }
    }
  },
  methods: {
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
      const repeatedPd = vm.carts.carts.find(item => {
        return item.product_id === id
      })

      // 新增之產品已在購物車內
      if (typeof repeatedPd !== 'undefined') {
        cart.qty += repeatedPd.qty
        vm.removeCart(repeatedPd.id)
      }

      vm.$http.post(api, { data: { ...cart } }).then(response => {
        const title = vm.favoritePds.find(item => item.id === id).title
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
    }
  },
  created () {
    this.getCarts()
    this.favoritePds = JSON.parse(localStorage.getItem('favorite')) || []
  },
  components: {}
}
</script>
