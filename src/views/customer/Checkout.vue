<template>
  <div>
    <div class="container mt-4">
      <loading :active.sync="isLoading"></loading>
      <div v-if="carts.carts.length === 0">
        <div class="text-center">
          <h3 class="py-4">您的購物是空的唷</h3>
          <router-link to="/products" class="btn btn-primary"
            >趕快去看看</router-link
          >
        </div>
      </div>
      <div v-else>
        <section class="my-5 row justify-content-center">
          <div class="col-md-9">
            <div class="container">
              <div class="row justify-content-around">
                <div
                  class="col-md-3 mb-2 mb-md-0 p-2 alert-highlight text-center rounded-pill"
                >
                  1.訂單資料
                </div>
                <div
                  class="col-md-3 mb-2 mb-md-0 p-2 alert-primary text-center rounded-pill"
                >
                  2.金流付款
                </div>
                <div
                  class="col-md-3 mb-2 mb-md-0 p-2 alert-primary text-center rounded-pill"
                >
                  3.訂單資料
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="mb-5 row justify-content-center">
          <div class="col-md-9" v-if="carts.carts.length">
            <table class="table checkout-cart-table">
              <thead class="checkout-cart-thead">
                <th class="w-15"></th>
                <th class="w-15 d-none d-md-table-cell"></th>
                <th class="w-30">品名</th>
                <th>數量</th>
                <th>單價</th>
                <th>總價格</th>
              </thead>
              <tbody class="checkout-cart-tbody">
                <tr v-for="item in carts.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCart(item.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle d-none d-md-table-cell">
                    <div
                      class="cart-img"
                      :style="{
                        backgroundImage: `url(${item.product.imageUrl})`
                      }"
                    ></div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="coupon text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
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
            </table>

            <div
              v-if="carts.final_total === carts.total"
              class="text-right h5 text-highlight"
            >
              總計: {{ carts.total | currency }}
            </div>
            <div v-else class="text-right h6">
              總計: {{ carts.total | currency }}
            </div>
            <hr v-if="carts.final_total !== carts.total" />
            <div
              v-if="carts.final_total !== carts.total"
              class="text-right h5 text-highlight"
            >
              折扣價:
              {{ Math.floor(carts.final_total) | currency }}
            </div>

            <div class="input-group input-group-sm mt-3">
              <input
                type="text"
                class="form-control"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-sm btn-outline-primary"
                  type="button"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5 row justify-content-center">
          <validation-observer
            v-if="carts.carts.length"
            tag="div"
            class="col-md-6"
            v-slot="{ handleSubmit }"
          >
            <form @submit.prevent="handleSubmit(createOrder)" ref="OrderSubmitForm">
              <div class="form-group">
                <validation-provider
                  tag="div"
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="useremail"
                    >Email<span class="text-danger"> *必填</span></label
                  >
                  <input
                    id="useremail"
                    type="email"
                    name="email"
                    v-model="form.user.email"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入 Email(xxx@xxx.xxx)"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback"
                    >Email 格式正確</span
                  >
                </validation-provider>
              </div>

              <div class="form-group">
                <validation-provider
                  tag="div"
                  name="收件人姓名"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <!-- 輸入框 -->
                  <label for="username"
                    >收件人姓名<span class="text-danger"> *必填</span></label
                  >
                  <input
                    id="username"
                    type="text"
                    name="username"
                    v-model="form.user.name"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入收件人姓名"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>

              <div class="form-group">
                <validation-provider
                  tag="div"
                  name="電話"
                  :rules="{
                    required: true,
                    regex: /^09\d{8}$|^\d{2,4}-\d{7,8}$/
                  }"
                  v-slot="{ errors, classes, passed }"
                >
                  <!-- 輸入框 -->
                  <label for="usertel"
                    >電話<span class="text-danger"> *必填</span></label
                  >
                  <input
                    id="usertel"
                    type="text"
                    name="usertel"
                    v-model="form.user.tel"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入電話(09xxxxxxxx、02-xxxxxxxx)"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="passed" class="valid-feedback"
                    >電話 格式正確</span
                  >
                </validation-provider>
              </div>

              <div class="form-group">
                <validation-provider
                  tag="div"
                  name="收件人地址"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <!-- 輸入框 -->
                  <label for="useraddress"
                    >收件人地址<span class="text-danger"> *必填</span></label
                  >
                  <input
                    id="useraddress"
                    type="text"
                    name="useraddress"
                    v-model="form.user.address"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入地址"
                  />
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>

              <div class="form-group">
                <validation-provider
                  tag="div"
                  name="留言"
                  rules="max:20"
                  v-slot="{ errors, classes }"
                >
                  <!-- 輸入框 -->
                  <label for="comment">留言</label>
                  <textarea
                    name="comment"
                    id="comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                    :class="classes"
                    placeholder="請輸入留言(最多20個字)"
                  >
                  </textarea>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>

              <div class="d-flex justify-content-between">
                <router-link class="btn btn-primary" to="/products">繼續購物</router-link>
                <button type="submit" class="btn btn-danger">送出訂單</button>
              </div>
            </form>
          </validation-observer>
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
      coupon_code: '',
      carts: {
        carts: {}
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },

  methods: {
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.carts = response.data.data
        vm.isLoading = false
      })
    },
    addtoCart (id, qty) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      const cart = {
        product_id: id,
        qty
      }

      vm.$http.post(api, { data: { ...cart } }).then(response => {
        vm.getCarts()
      })
    },
    removeCart (id) {
      this.$bus.$emit('removeCarts', id)
    },
    addCouponCode () {
      const vm = this
      if (vm.coupon_code === '') {
        vm.$bus.$emit('message:push', '優惠碼不可為空', 'danger')
        return
      } // if

      if (vm.coupon_code === 'happy66!') {
        // 滿666打66折
        if (vm.carts.final_total < 666) {
          vm.$bus.$emit('message:push', '金額未滿666', 'warning')
          return
        } // if
      } else if (vm.coupon_code === 'happy1!') {
        // 滿1000打1折
        if (vm.carts.final_total < 1000) {
          vm.$bus.$emit('message:push', '金額未滿1000', 'warning')
          return
        } // if
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      vm.isLoading = true
      const couponCode = {
        code: vm.coupon_code
      }

      vm.$http.post(api, { data: { ...couponCode } }).then(response => {
        vm.isLoading = false
        vm.coupon_code = ''
        vm.getCarts()
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      const form = { ...vm.form }
      vm.$http.post(api, { data: { ...form } }).then(response => {
        vm.$refs.orderSubmitForm.reset()
        if (response.data.success) {
          vm.$router.push(`/payment/${response.data.orderId}`)
        }
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
  }
}
</script>
