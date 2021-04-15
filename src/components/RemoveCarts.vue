<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- Modal -->
    <div
      class="modal fade"
      id="removeCartsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removeCartsModal"
      aria-hidden="true" @click.stop=""
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="removeOne">
              確認要刪除
              <strong class="h4 text-highlight word-wrap-break">{{
                removePd.title
              }}</strong>
              嗎?(刪除後將無法恢復)
            </div>
            <div v-else>
              確認要刪除<strong class="h4 text-highlight">所有商品</strong
              >嗎?(刪除後將無法恢復)
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger confirm"
              @click="removeCart(id)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: false,
      carts: JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 }, // 暫存之購物車
      removePd: {},
      removeOne: false,
      id: ''
    }
  },
  methods: {
    removeCart () {
      const vm = this
      vm.isLoading = true
      // 刪除全部購物車內容
      $('#removeCartsModal').modal('hide')
      if (!vm.id) {
        localStorage.removeItem('tempCarts')
        vm.$bus.$emit('message:push', '已清空購物車')
      } else { // 刪除購物車特定商品，並更新購物車total以及finalToal
        const delIndex = vm.carts.carts.findIndex(item => item.id === vm.id)
        const delTitle = vm.carts.carts[delIndex].title
        const pdTotal = vm.carts.carts[delIndex].price * vm.carts.carts[delIndex].qty
        vm.carts.total -= pdTotal
        vm.carts.finalTotal -= 'coupon' in vm.carts ? Math.floor(pdTotal * vm.carts.coupon.percent) : pdTotal
        vm.carts.carts.splice(delIndex, 1)
        vm.$bus.$emit('message:push', `已將 ${delTitle} 於購物車刪除`, 'success')
        localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      }
      vm.$bus.$emit('updateCarts')
      vm.isLoading = false
    }
    /* removeCart (id = '') {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      $('#removeCartsModal').modal('hide')
      if (id === '') {
        // clear all

        vm.carts.carts.forEach((item, index) => {
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
          vm.$http.delete(api).then(response => {
            if (index === vm.carts.carts.length - 1) {
              vm.$bus.$emit('message:push', '已清空購物車')
              vm.getCarts()
            }
          })
        })
      } else {
        vm.$http.delete(api).then(response => {
          const title = vm.carts.carts.find(item => item.id === id).product
            .title
          vm.$bus.$emit('message:push', `已將 ${title} 於購物車刪除`, 'danger')
          vm.getCarts()
        })
      }
    } */
  },
  created () {
    const vm = this
    vm.$bus.$on('updateCarts', () => {
      vm.carts = JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    })
    vm.$bus.$on('removeCarts', id => {
      vm.id = id
      if (id !== '') {
        vm.removeOne = true
        vm.removePd = vm.carts.carts.find(item => item.id === id)
      } else {
        vm.removeOne = false
      }
      $('#removeCartsModal').modal('show')
    })
  }
}
</script>
