<template>
  <section class="section">
    <div class="container mb-4">
      <div class="title m-3 text-center">
        <h3 class="section-subtitle text-highlight">Coupons</h3>
        <h2 class="section-title text-primary">
          優惠活動
        </h2>
      </div>
      <div class="row mt-3">
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card h-100">
            <div
              class="rounded-top bg-cover"
              style="height: 150px;background-image: url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)'"
            ></div>

            <div class="card-body text-center">
              <h5 class="card-title">新開幕一率享8折</h5>

              <div class="card-text">
                <p class="rounded-pill border bg-danger">
                  <span class="w-50 d-inline-block text-white p-1">優惠碼</span
                  ><span
                    class="w-50 rounded-pill d-inline-block bg-light p-1 font-weight-bold"
                    >panda8!</span
                  >
                </p>
              </div>
              <button type="button"
                data-coupon="panda8!"
                @click="doCopy"
                class="btn btn-block btn-primary"
              >
                複製優惠碼
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card h-100">
            <div
              class="rounded-top bg-cover"
              style="height: 150px;background-image: url('https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=789&q=80')"
            ></div>

            <div class="card-body text-center">
              <h5 class="card-title">滿666享66折</h5>

              <div class="card-text">
                <p class="rounded-pill border bg-danger">
                  <span class="w-50 d-inline-block text-white p-1">優惠碼</span
                  ><span
                    class="w-50 rounded-pill d-inline-block bg-light p-1 font-weight-bold"
                    >happy66!</span
                  >
                </p>
              </div>
              <button type="button"
                data-coupon="happy88!"
                @click="doCopy"
                class="btn btn-block btn-primary"
              >
                複製優惠碼
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card h-100">
            <div
              class="rounded-top bg-cover"
              style="height: 150px;background-image: url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
            ></div>

            <div class="card-body text-center">
              <h5 class="card-title">滿1000享11折</h5>

              <div class="card-text">
                <p class="rounded-pill border bg-danger">
                  <span class="w-50 d-inline-block text-white p-1">優惠碼</span
                  ><span
                    class="w-50 rounded-pill d-inline-block bg-light p-1 font-weight-bold"
                    >happy1!</span
                  >
                </p>
              </div>
              <button type="button"
                data-coupon="happy1!"
                @click="doCopy"
                class="btn btn-block btn-primary"
              >
                複製優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      coupon: ''
    }
  },
  methods: {
    doCopy (e) {
      const vm = this
      vm.coupon = e.target.dataset.coupon
      vm.$copyText(vm.coupon)
        .then(() => {
          vm.$bus.$emit(
            'message:push',
            `已成功複製優惠券 ${vm.coupon}`,
            'success'
          )
        })
        .catch(() => vm.$bus.$emit('message:push', '複製優惠券失敗', 'danger'))
    }
  }
}
</script>
