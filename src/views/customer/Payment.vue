<template>
  <div class="my-5 container">
    <loading :active.sync="isLoading"></loading>
    <ul class="step list-unstyled d-flex text-center">
      <li class="step-item flex-grow-1 py-4 d-md-none">
        <h4>STEP/1</h4>
        <p class="mb-0">購物清單</p>
      </li>
      <li class="step-item flex-grow-1 py-4 d-md-none">
        <h4>STEP/2</h4>
        <p class="mb-0">填寫訂購資料</p>
      </li>
      <li class="step-item flex-grow-1 py-4 active" :class="{'finish': order.is_paid}">
        <h4>STEP/3</h4>
        <p class="mb-0" v-if="!order.is_paid">成立訂單</p>
        <p class="mb-0" v-else>付款完成</p>
      </li>
    </ul>
    <div class="order-list">
      <h4 class="text-highlight">購買資訊</h4>

      <table class="table checkout-cart-table mt-3">
        <thead class="checkout-cart-thead">
          <th class="w-30"></th>
          <th class="w-30">品名</th>
          <th>數量</th>
          <th v-if="discount === 0">總價</th>
          <th else>折扣後總價</th>
        </thead>
        <tbody class="checkout-cart-tbody">
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
              {{ item.final_total | currency }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="discount === 0" class="text-right h5 text-highlight">
        總計: {{ Math.floor(order.total) | currency }}
      </div>
      <div v-else class="text-right h5 text-highlight">
        折扣後總計: {{ Math.floor(order.total) | currency }}
      </div>
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
        <button type="button"
          v-if="!order.is_paid"
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
      products: [],
      paidClass: 'finish',
      unpaidClass: 'active'
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
          vm.$bus.$emit('message:push', '結帳成功', 'success')
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
