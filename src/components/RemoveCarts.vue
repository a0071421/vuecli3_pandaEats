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
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="">刪除商品</h5>
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
                removePd.product.title
              }}</strong>
              嗎?(刪除後將無法恢復)
            </div>
            <div v-if="!removeOne">
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
      carts: {
        carts: {}
      },
      removePd: {
        product: {}
      },
      removeOne: false,
      id: ''
    }
  },
  methods: {
    removeCart (id = '') {
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
    },
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data
        vm.$bus.$emit('updateCarts', vm.carts)
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    vm.getCarts()
    vm.$bus.$on('updateCarts', carts => {
      vm.carts = carts
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
