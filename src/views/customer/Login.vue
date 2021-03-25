<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row justify-content-center">
      <form class="form-signin" @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal">請登入</h1>
        <label for="inputEmail" class="sr-only"
          >Email<span class="text-danger"> *必填</span></label
        >
        <input
          type="email"
          v-model="user.username"
          id="inputEmail"
          class="form-control login_email"
          placeholder="請輸入 Email(xxx@xxx.xxx)"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only"
          >密碼<span class="text-danger"> *必填</span></label
        >
        <input
          type="password"
          v-model="user.password"
          id="inputPassword"
          class="form-control login_password"
          placeholder="請輸入密碼"
          required
        />
        <button type="submit" class="btn btn-lg btn-primary btn-block">登入</button>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      vm.$http.post(api, vm.user).then(response => {
        const expired = response.data.expired
        const token = response.data.token
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
        if (response.data.success) {
          vm.$bus.$emit('message:push', '登入成功', 'success')
          const myCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
          )
          vm.$http.defaults.headers.common.Authorization = `${myCookie}`
          vm.$router.push('/admin')
        } else { // 登入失敗
          vm.$bus.$emit('message:push', '登入失敗，請重新輸入', 'danger')
          vm.isLoading = false
        }
      })
    }
  }
}
</script>
