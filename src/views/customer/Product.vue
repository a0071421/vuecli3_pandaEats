<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <div class="row justify-content-around my-5">
      <div class="col-md-7">
        <img
          :src="product.imageUrl"
          alt="productImg"
          class="img-fluid rounded"
        />
      </div>
      <div class="col-md-5">
        <div class="pd">
          <h2 class="word-wrap-break">
            {{ product.title }}
          </h2>
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ product.content }}</p>
            <footer class="blockquote-footer">
              {{ product.description }}
            </footer>
          </blockquote>
          <div class="d-inline-flex align-items-baseline">
            <div class="price">
              <div v-if="!product.price" class="h5 text-highlight">
                NT{{ product.origin_price | currency }} 元
              </div>
              <div v-else>
                <del class="h6">NT{{ product.origin_price | currency }} 元</del>
                <div class="h5 text-highlight">
                  NT{{ product.price | currency }} 元
                </div>
              </div>
            </div>
          </div>

          <select class="form-control mt-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <hr />
          <div class="d-flex align-items-center justify-content-end">
            <div class="text-nowrap mr-3 text-highlight">
              小計NT$

              <strong v-if="product.price">{{
                product.num * product.price
              }}</strong>
              <strong v-else>{{ product.num * product.origin_price }}</strong>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i class="fas fa-cart-arrow-down"></i> 加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <router-link to="/products" class="btn btn-primary float-right"
      ><i class="fas fa-arrow-left"></i> 回商品頁面</router-link
    >
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      product: {},
      carts: {
        carts: []
      }
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const productId = vm.$route.params.productId
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productId}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.product.num = 1
        vm.isLoading = false
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
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
        vm.$bus.$emit(
          'message:push',
          `已將 ${vm.product.title} 加入購物車`,
          'success'
        )
        vm.getCarts()
      })
    },
    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then(() => {
        vm.isLoading = false
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
      })
    }
  },
  created () {
    this.getCarts()
    this.getProduct()
    this.$bus.$on('updateCarts', carts => {
      this.carts = carts
    })
  }
}
</script>
