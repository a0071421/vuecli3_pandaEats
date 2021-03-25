<template>
  <div class="my-5 container">
    <loading :active.sync="isLoading"></loading>
    <section class="my-5 row justify-content-center">
      <div class="col-md-9">
        <div class="container">
          <div class="row">
            <div class="col-md-4 my-2">
              <div class="p-1 alert-primary text-center rounded-pill ">
                1.訂單資料
              </div>
            </div>
            <div class="col-md-4 my-2">
              <div
                class="p-1 text-center rounded-pill"
                :class="{
                  'alert-primary': order.is_paid,
                  'alert-highlight': !order.is_paid
                }"
              >
                2.金流付款
              </div>
            </div>
            <div class="col-md-4 my-2">
              <div
                class="p-1 text-center rounded-pill"
                :class="{
                  'alert-primary': !order.is_paid,
                  'alert-highlight': order.is_paid
                }"
              >
                3.完成
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="my-5 row justify-content-center">
      <div class="col-md-8">
        <h4 class="text-highlight">購買資訊</h4>

        <table class="table checkout-cart mt-3">
          <thead>
            <th class="w-20"></th>
            <th class="w-25">品名</th>
            <th>數量</th>
            <th>單價</th>
            <th>總價格</th>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td class="align-middle">
                <div
                  class="cart-img"
                  :style="{
                    backgroundImage: `url(${item.product.imageUrl})`
                  }"
                ></div>
              </td>
              <td class="align-middle text-break">
                {{ item.product.title }}
              </td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.product.price | currency }}
              </td>
              <td class="align-middle text-right">
                {{ item.final_total | currency }}
              </td>
            </tr>
          </tbody>

          <!-- <tfoot>
            <tr>
              <td colspan="5" class="text-right h5 text-highlight">
                總計:
                {{ order.total | currency }}
              </td>
            </tr>
          </tfoot> -->
        </table>

        <div v-if="discount === 0" class="text-right h5 text-highlight">
          總計: {{ Math.floor(order.total) | currency }}
        </div>
        <div v-else class="text-right h5 text-highlight">
          折扣後總計: {{ Math.floor(order.total) | currency }}
        </div>
      </div>

      <div class="col-md-8 mt-5">
        <h4 class="text-highlight">訂購者資訊</h4>
        <table class="table mt-3">
          <thead class="bg-primary">
            <th class="text-white" colspan="2">訂單資料</th>
          </thead>

          <tbody>
            <tr>
              <th>Email</th>
              <td class="text-break">{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <button
            v-if="order.is_paid === false"
            class="btn btn-danger"
            @click="payOrder"
          >
            確認付款去
          </button>
          <router-link v-else to="/products" class="btn btn-primary"
            >繼續購物</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false,
      products: []
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.order = response.data.order
          vm.products = Object.values(vm.order.products)
        }
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder()
          vm.isLoading = false
        }
      })
    }
  },
  computed: {
    discount () {
      const vm = this
      let total = 0
      vm.products.forEach(item => {
        total = total + (item.total - item.final_total)
      })
      return total
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
