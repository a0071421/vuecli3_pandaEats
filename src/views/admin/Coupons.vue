<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      class="d-flex justify-content-end mt-4"
      :class="{ 'justify-content-between': coupons.length }"
    >
      <button
        v-if="coupons.length"
        type="button"
        @click="openModal('deleteAll')"
        class="btn btn-danger"
      >
        刪除所有優惠券
      </button>
      <!-- Button trigger modal -->
      <button type="button" @click="openModal('new')" class="btn btn-primary">
        建立新的優惠券
      </button>
    </div>

    <div v-if="coupons.length" class="custom-table-width">
      <table class="table custom-table mt-4">
        <thead class="custom-table-thead">
          <th class="text-nowrap">名稱</th>
          <th class="text-nowrap">折扣百分比</th>
          <th class="text-nowrap w-20">到期日</th>
          <th class="text-nowrap">是否啟用</th>
          <th class="text-nowrap">編輯</th>
        </thead>
        <tbody class="custom-table-tbody">
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ item.due_date | date }}</td>
            <td v-if="item.is_enabled" class="text-success">啟用</td>
            <td v-else class="text-danger">不啟用</td>
            <td>
              <button type="button"
                @click="openModal('edit', item)"
                class="btn btn-sm btn-outline-primary"
              >
                編輯
              </button>
              <button type="button"
                @click="openModal('delete', item)"
                class="btn btn-sm btn-outline-danger"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pagination-info="pagination" @changePage="getCoupons" />
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="option === 'new'">
                建立新的優惠券
              </span>
              <span v-if="option === 'edit'">
                編輯優惠券
              </span>
            </h5>
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
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="temp_coupon.title"
                aria-describedby=""
              />
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="code"
                v-model="temp_coupon.code"
                aria-describedby=""
              />
            </div>
            <div class="form-group">
              <label for="expired">到期日</label>
              <input
                type="date"
                class="form-control"
                id="expired"
                v-model="due_date"
                aria-describedby=""
              />
            </div>
            <div class="form-group">
              <label for="discount">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="discount"
                min="1"
                max="100"
                v-model="temp_coupon.percent"
                aria-describedby=""
              />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="is_enabled"
                v-model="temp_coupon.is_enabled"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              id="confirm"
              @click="updateCoupon"
            >
              <span v-if="option === 'new'">
                新增
              </span>
              <span v-if="option === 'edit'">
                更新
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModaßlLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
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
            是否刪除
            <strong
              v-if="option === 'delete'"
              class="h4 text-highlight word-wrap-break"
              >{{ temp_coupon.title }}</strong
            >
            <strong
              v-if="option === 'deleteAll'"
              class="h4 text-highlight word-wrap-break"
              >所有</strong
            >
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button @click="deleteCoupon" type="button" class="btn btn-danger">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'coupons',
  data () {
    return {
      coupons: [],
      temp_coupon: {},
      isLoading: false,
      option: '',
      due_date: new Date(),
      pagination: {}
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      // vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.coupons = response.data.coupons
          vm.isLoading = false
          vm.pagination = response.data.pagination
        } else {
          /* vm.$bus.$emit('message:push', '請登入', 'danger')
          vm.$router.push('/login') */
        }
      })
    },
    openModal (option, item) {
      this.option = option
      if (option === 'new') {
        this.temp_coupon = {
          title: '',
          is_enabled: false,
          percent: 100,
          due_date: 0,
          code: ''
        }
        $('#couponModal').modal('show')
      } else if (option === 'edit') {
        this.temp_coupon = { ...item }
        this.due_date = new Date(this.temp_coupon.due_date * 1000)
          .toISOString()
          .split('T')[0]
        $('#couponModal').modal('show')
      } else {
        // delete or deleteAll
        this.temp_coupon = { ...item }
        $('#delCouponModal').modal('show')
      }
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      vm.isLoading = true
      const coupon = { ...vm.temp_coupon }
      coupon.due_date = Math.floor(new Date(vm.due_date) / 1000) // timestamp
      if (vm.option === 'edit') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.temp_coupon.id}`
        httpMethod = 'put'
      } // if
      vm.$http[httpMethod](api, { data: { ...coupon } }).then(response => {
        $('#couponModal').modal('hide')
        if (response.data.success) {
          vm.$bus.$emit(
            'message:push',
            `${vm.option === 'new' ? '新增' : '更新'} ${
              vm.temp_coupon.title
            } 成功`,
            'success'
          )
          vm.getCoupons()
        } else {
          vm.$bus.$emit('message:push', '新增失敗', 'danger')
        }
      })
    },
    deleteCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.temp_coupon.id}`
      vm.isLoading = true
      if (vm.option === 'deleteAll') {
        vm.coupons.forEach((item, index) => {
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
          vm.$http.delete(api).then(response => {
            $('#delCouponModal').modal('hide')
            if (response.data.success) {
              if (index === vm.coupons.length - 1) {
                vm.$bus.$emit('message:push', '已刪除所有優惠券')
                vm.getCoupons()
              }
            } else {
              vm.$bus.$emit('message:push', '刪除失敗', 'danger')
            }
          })
        })
      } else {
        vm.$http.delete(api).then(response => {
          $('#delCouponModal').modal('hide')
          if (response.data.success) {
            vm.$bus.$emit(
              'message:push',
              `已刪除 ${vm.temp_coupon.title} 優惠券`
            )
            vm.getCoupons()
          } else {
            vm.$bus.$emit('message:push', '刪除失敗', 'danger')
          }
        })
      }
    }
  },

  created () {
    this.getCoupons()
  },
  components: {
    Pagination
  }
}
</script>
