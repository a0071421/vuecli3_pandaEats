<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="custom-table-width mt-4">
      <table class="table custom-table">
        <thead class="custom-table-thead">
          <th class="text-nowrap">購買時間</th>
          <th class="text-nowrap w-25">Email</th>
          <th class="text-nowrap w-25">購買項目</th>
          <th class="text-nowrap">應付金額</th>
          <th class="text-nowrap">是否付款</th>
        </thead>
        <tbody class="custom-table-tbody">
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.create_at | date }}</td>
            <td>{{ order.user.email }}</td>
            <td>
              <span
                v-for="item in Object.values(order.products)"
                :key="item.id"
              >
                {{ item.product.title }} 數量：{{ item.qty
                }}{{ item.product.unit }}<br />
              </span>
            </td>
            <td class="text-right">{{ Math.round(order.total) | currency }}</td>
            <td v-if="order.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">尚未付款</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pagination-info="pagination" @changePage="getOrders" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'orders',
  data () {
    return {
      isLoading: false,
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.orders = response.data.orders
          vm.pagination = response.data.pagination
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
          vm.$router.push('/login')
        }
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getOrders()
  },
  components: {
    Pagination
  }
}
</script>
