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
        <ul class="step list-unstyled d-flex text-center">
          <li
            class="step-item flex-grow-1 py-4"
            :class="{ active: current === 'cart-list' }"
          >
            <h4>STEP/1</h4>
            <p class="mb-0">購物清單</p>
          </li>
          <li
            class="step-item flex-grow-1 py-4"
            :class="{ active: current === 'order-info' }"
          >
            <h4>STEP/2</h4>
            <p class="mb-0">填寫訂購資料</p>
          </li>
          <li class="step-item flex-grow-1 py-4">
            <h4>STEP/3</h4>
            <p class="mb-0">成立訂單</p>
          </li>
        </ul>
        <div v-if="current === 'cart-list'" class="mb-5">
          <div v-if="carts.carts.length">
            <table class="table checkout-cart-table">
              <thead class="checkout-cart-thead">
                <th class="w-15"></th>
                <th class="w-15 d-none d-md-table-cell"></th>
                <th class="w-20">品名</th>
                <th class="pdNumber">數量</th>
                <th>單價</th>
                <th>總價</th>
              </thead>
              <tbody class="checkout-cart-tbody">
                <tr v-for="(item, index) in carts.carts" :key="item.id">
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
                        backgroundImage: `url(${item.imageUrl})`,
                      }"
                    ></div>
                  </td>
                  <td class="align-middle">
                    {{ item.title }}
                    <div class="text-success" v-if="carts.total !== carts.finalTotal">
                      已套用優惠券-[{{ carts.coupon.coupon_code }}]
                    </div>
                  </td>
                  <td class="align-middle">
                   <div class="form-group mb-0">
                    <select class="form-control form-control-sm" v-model.number="item.qty" @change="changePdNum(item, index)">
                      <option v-for="i in item.qty - (item.qty % 10) + 20 " :key="i" :value="i">{{ i }}</option>
                    </select>
                  </div>
                  </td>
                  <td class="align-middle text-right">
                    {{ item.price | currency }}
                  </td>
                  <td class="align-middle text-right">
                    <div v-if="carts.total === carts.finalTotal">
                      {{ item.price * item.qty | currency }}
                    </div>
                    <div v-else>
                      <del>
                        {{ item.price * item.qty | currency }}
                      </del>
                      <div class="mt-1 text-highlight">{{ Math.floor((item.price * item.qty) * carts.coupon.percent) | currency }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-if="carts.total === carts.finalTotal"
              class="text-right h5 text-highlight"
            >
              總計: {{ carts.total | currency }}
            </div>
            <div v-else class="text-right h6">
              總計: {{ carts.total | currency }}
            </div>
            <hr v-if="carts.total !== carts.finalTotal" />
            <div
              v-if="carts.total !== carts.finalTotal"
              class="text-right h5 text-highlight"
            >
              折扣價:
              {{ Math.floor(carts.finalTotal) | currency }}
            </div>
            <div class="row justify-content-end">
              <div class="col-md-6">
                <div class="input-group input-group my-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="coupon.coupon_code"
                    placeholder="請輸入優惠碼" :readonly="carts.total !== carts.finalTotal"
                  />
                  <div class="input-group-append">
                    <button v-if="carts.total === carts.finalTotal"
                      class="btn btn-sm btn-outline-highlight"
                      type="button"
                      @click="addCouponCode"
                    >
                      <span>套用優惠碼</span>
                    </button>
                    <button v-else
                      class="btn btn-sm btn-outline-highlight"
                      type="button"
                      @click="removeCouponCode"
                    >
                      <i class="fas fa-times-circle"><span> 刪除優惠碼</span></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-content-between">
              <router-link class="btn btn-primary mb-3 mb-sm-0" to="/products"
                ><i class="fas fa-arrow-left"></i> 繼續購物</router-link
              >
              <button
                type="button"
                class="btn btn-danger"
                @click="current = 'order-info'"
              >
                下一步，填寫訂購資料 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          v-else-if="current === 'order-info'"
          class="mb-5 row justify-content-center"
        >
          <validation-observer
            tag="div"
            class="col-md-10"
            v-slot="{ handleSubmit }"
          >
            <form @submit.prevent="handleSubmit(submitOrder)">
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
                    regex: /^09\d{8}$|^\d{2,4}-\d{7,8}$/,
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

              <div class="d-flex flex-column flex-sm-row justify-content-between">
                <button type="button" class="btn btn-primary mb-3 mb-sm-0" @click="current = 'cart-list'">
                  <i class="fas fa-arrow-left"></i> 回上一步
                </button>
                <button type="submit" class="btn btn-danger">
                  送出訂單 <i class="fas fa-arrow-right"></i>
                </button>
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
      coupon: {
        coupon_code: '',
        percent: 1
      },
      carts: JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      current: 'cart-list',
      pdsNum: [] // 購物車所有商品每次更改前的數量
    }
  },

  methods: {
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
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

      vm.$http.post(api, { data: { ...cart } }).then((response) => {
        vm.getCarts()
      })
    },
    removeCart (id) {
      this.$bus.$emit('removeCarts', id)
    },
    changePdNum (pd, i) {
      const vm = this
      // 將數量改變前和改變後的差異更新計算後，更新carts.total.finalTotal
      vm.carts.total += (pd.qty - vm.pdsNum[i]) * pd.price
      // 更新改變後數量
      vm.pdsNum[i] = pd.qty
      vm.carts.finalTotal = 'coupon' in vm.carts ? Math.floor(vm.carts.total * vm.coupon.percent) : vm.carts.total
      localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      vm.$bus.$emit('updateCarts')
    },
    addCouponCode () {
      const vm = this
      if (vm.coupon.coupon_code === '') {
        vm.$bus.$emit('message:push', '優惠碼不可為空', 'danger')
      } else {
        if (vm.coupon.coupon_code === 'happy66!') {
          // 滿666打66折
          if (vm.carts.finalTotal < 666) {
            vm.$bus.$emit('message:push', '金額未滿666', 'warning')
            vm.coupon.coupon_code = ''
            return
          } else {
            vm.carts.finalTotal = vm.carts.total * 0.66
            vm.coupon.percent = 0.66
            vm.$bus.$emit('message:push', `已套用優惠券: ${vm.coupon.coupon_code}`, 'success')
          }
        } else if (vm.coupon.coupon_code === 'happy1!') {
          // 滿1000打11折
          if (vm.carts.finalTotal < 1000) {
            vm.$bus.$emit('message:push', '金額未滿1000', 'warning')
            vm.coupon.coupon_code = ''
            return
          } else {
            vm.carts.finalTotal = vm.carts.total * 0.11
            vm.coupon.percent = 0.11
            vm.$bus.$emit('message:push', `已套用優惠券: ${vm.coupon.coupon_code}`, 'success')
          }
        } else if (vm.coupon.coupon_code === 'panda8!') {
          // 全館一律8折!
          vm.carts.finalTotal = vm.carts.total * 0.8
          vm.coupon.percent = 0.8
          vm.$bus.$emit('message:push', `已套用優惠券: ${vm.coupon.coupon_code}`, 'success')
        } else {
          vm.$bus.$emit('message:push', `無此優惠券: ${vm.coupon.coupon_code}`, 'danger')
          vm.coupon.coupon_code = ''
          vm.coupon.percent = 1
        }
        // 將優惠券資訊更新至購物車內容
        vm.$set(vm.carts, 'coupon', vm.coupon)
        localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
        vm.$bus.$emit('updateCarts')
      }
    },
    removeCouponCode () {
      const vm = this
      // 將優惠券資訊從購物車內容移除
      vm.$bus.$emit('message:push', `已移除優惠券: ${vm.coupon.coupon_code}`, 'success')
      vm.$delete(vm.carts, 'coupon')
      vm.coupon.coupon_code = ''
      vm.coupon.percent = 1
      vm.carts.finalTotal = vm.carts.total // 將總價設定為優惠前價格
      localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      vm.$bus.$emit('updateCarts')
    },
    submitOrder () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      // 1.避免重複加入因此要先跑一次清空購物車
      // 1-1 先取出當前遠端購物車資料
      vm.axios.get(api)
        .then((response) => {
          return response.data.data.carts
        })
        .then((data) => {
          const remoteCart = data
          // 1-2清空遠端購物車內的資料，否則會重複加入
          remoteCart.forEach((item) => {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`
            vm.axios.delete(api).then(() => {})
          })
        })
        .then(() => {
          // 2.將當前暫存在carts(localStorage) 的商品撈出來
          vm.carts.carts.forEach((item, index) => {
            // 一一加入到遠端購物車內
            const pd = {
              product_id: item.id,
              qty: item.qty
            }
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
            vm.axios.post(api, { data: { ...pd } })
              .then(() => {
                if (index === vm.carts.carts.length - 1) {
                  // 3.確保加入遠端購物車之後清空localStorage購物車內容
                  localStorage.removeItem('tempCarts')
                  vm.$bus.$emit('updateCarts')
                  // 4.若有使用優惠券
                  if (vm.coupon.coupon_code) {
                    api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
                    const couponCode = {
                      code: vm.coupon.coupon_code
                    }
                    vm.$http.post(api, { data: { ...couponCode } }).then(response => {
                      if (response.data.success) {
                        vm.createOrder()
                      }
                    })
                  } else {
                    vm.createOrder()
                  }
                }
              })
          })
        })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      const form = { ...vm.form }
      vm.$http.post(api, { data: { ...form } }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/payment/${response.data.orderId}`)
        }
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('updateCarts', () => {
      vm.carts = JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 }
    })
    vm.coupon = vm.carts.coupon || { coupon_code: '', percent: 1 }
    vm.carts.carts.forEach((item) => vm.pdsNum.push(item.qty))
  }
}
</script>
