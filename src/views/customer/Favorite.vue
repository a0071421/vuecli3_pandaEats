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
            @click="getSpecifiedProduct(item.id)"
          >
            <div class="bg-cover"
              style="height: 150px;"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <span class="badge badge-highlight text-white">{{
                  item.category
                }}</span>
                <div>
                  <a class="like-icon" href="#" v-if="isFavorite(item.id)" @click.prevent.stop="removeFavorite(item)">
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
                  @click.stop="addtoCart(item)"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      favoritePds: [],
      pagination: {},
      status: {
        loadingItem: '',
        addtoCart: ''
      },
      carts: JSON.parse(localStorage.getItem('tempCarts')) || []
    }
  },
  methods: {
    getSpecifiedProduct (id) {
      this.$router.push(`/product/${id}`).catch(() => {})
    },
    addtoCart (product) {
      const vm = this
      vm.isLoading = false
      vm.status.addtoCart = product.id
      // 判斷目前欲加入的商品是否存在localStorage的暫存購物車內
      // 使用findIndex判斷，若為-1為不存在->新增至localStorage
      // 反之則更新該商品在localStorage的qty
      const idIndex = vm.carts.findIndex(data => data.id === product.id)
      if (idIndex === -1) {
        const price = 'origin_price' in product === true ? Number(product.origin_price) : Number(product.price)
        const cartContent = {
          id: product.id, // 產品 ID
          qty: 1, // 產品數量，預設一筆
          title: product.title, // 產品標題
          imageUrl: product.imageUrl, // 產品圖片
          origin_price: product.origin_price, // 產品原始金額
          price, // 產品銷售金額,
          total: price * 1, // 總計(折扣前)
          final_total: price * 1 // 總計(折扣後)
        }
        vm.carts.push(cartContent)
      } else {
        vm.carts[idIndex].qty++
        vm.carts[idIndex].total += vm.carts[idIndex].price
        vm.carts[idIndex].final_total += vm.carts[idIndex].price
      }
      localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      vm.$bus.$emit('message:push', `已將 ${product.title} 加入購物車`, 'success')
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
    removeFavorite (product) {
      const vm = this
      vm.favoritePds = vm.favoritePds.filter(item => item.id !== product.id)
      localStorage.setItem('favorite', JSON.stringify(vm.favoritePds))
      vm.$bus.$emit('message:push', '已取消收藏', 'success')
    },
    isFavorite (id) {
      const vm = this
      return vm.favoritePds.some(item => item.id === id)
    }
  },
  created () {
    this.favoritePds = JSON.parse(localStorage.getItem('favorite')) || []
  },
  components: {}
}
</script>
