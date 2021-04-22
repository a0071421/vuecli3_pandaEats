<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <div class="row justify-content-around my-5">
      <div class="col-md-7">
        <img
          :src="product.imageUrl"
          alt="productImg"
          class="img-fluid rounded"
        />
      </div>
      <div class="col-md-5">
        <div class="pd">
          <h2 class="word-wrap-break">
            {{ product.title }}
          </h2>
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ product.content }}</p>
            <footer class="blockquote-footer">
              {{ product.description }}
            </footer>
          </blockquote>
          <div class="d-inline-flex align-items-baseline">
            <div class="price">
              <div v-if="!product.price" class="h5 text-highlight">
                NT{{ product.origin_price | currency }} 元
              </div>
              <div v-else>
                <del class="h6">NT{{ product.origin_price | currency }} 元</del>
                <div class="h5 text-highlight">
                  NT{{ product.price | currency }} 元
                </div>
              </div>
            </div>
          </div>

          <select class="form-control mt-3" v-model="pdNum">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <hr />
          <div class="d-flex align-items-center justify-content-end">
            <div class="text-nowrap mr-3 text-highlight">
              小計NT$

              <strong v-if="product.price">{{
                pdNum * product.price
              }}</strong>
              <strong v-else>{{ pdNum * product.origin_price }}</strong>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addtoCart(product, pdNum)"
            >
              <i class="fas fa-cart-arrow-down"></i> 加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="FAQ">
      <h2>常見問題</h2>
      <hr>
      <div class="accordion" id="accordion">
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer1" data-toggle="collapse"> 1. 聽說健身餐都無油無鹽無味道，我吃得下去嗎？</a>
          </h4>
          <div id="answer1" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              是在哪裡聽說的呢!!?PandaEats是採用少油、少鹽、味道清淡，但最簡單的調味才能襯托出食物原型的鮮味。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer2" data-toggle="collapse"> 2. 減脂餐的標準配置為何？</a>
          </h4>
          <div id="answer2" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              PandaEats根據三大營養素（碳水化合物、蛋白質以及脂質）及纖維素的攝取，因此採用五穀雜糧，避免精緻澱粉(例如白米)、
              原型豆魚蛋肉類以及蔬菜。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer3" data-toggle="collapse"> 3. 減脂餐真的能減肥嗎？</a>
          </h4>
          <div id="answer3" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              要增加/減少一公斤需要增加/減少7700大卡的熱量，然而飲食70%運動30%，最主要還是在於您飲食的習慣，
              因為即使你運動的再多，吃的部分不節制的話依然是瘦不下來的，因此PandaEats透過均衡飲食，少油、少鹽、天然調味
              來控制一餐的總熱量，並且搭配運動，過一陣子褲子會告訴您答案的!
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer4" data-toggle="collapse"> 4. 是否有提供素食？</a>
          </h4>
          <div id="answer4" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              非常遺憾，目前PandaEats的素食尚在研發階段，敬請期待!!
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer5" data-toggle="collapse"> 5. 提供選菜服務嗎？</a>
          </h4>
          <div id="answer5" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              非常遺憾，為了提倡多元飲食，尚不提供選菜服務唷。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer6" data-toggle="collapse"> 6. 是否提供外送服務？</a>
          </h4>
          <div id="answer6" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              有的，若須外送服務，請於下訂單時於備註註明您的外送地址，餐點送達後會再追加外送費用唷!!
              (外送費用及區域請詳見7、8)。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer7" data-toggle="collapse"> 7. 請問外送區域？</a>
          </h4>
          <div id="answer7" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              PandaEats目前僅提供<br>
              台北市北投區、士林區<br>
              新北市淡水區、五股區、三重區之外送訂單。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer8" data-toggle="collapse"> 8. 請問外送費用？</a>
          </h4>
          <div id="answer8" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              外送區域內一份餐點即可外送！每趟運費30元，滿五份餐點 <b>免 運 費！</b>
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer9" data-toggle="collapse"> 9. 請問是否有加盟許可？</a>
          </h4>
          <div id="answer9" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              非常歡迎來電討論加盟擴店的問題，我們相當樂意啊!。
            </div>
          </div>
        </div>
        <div class="FAQ-item">
          <h4 class="FAQ-heading">
            <a class="FAQ-title" href="#answer10" data-toggle="collapse"> 10. 請問營業時間？</a>
          </h4>
          <div id="answer10" class="FAQ-collapse collapse" data-parent="#accordion">
            <div class="FAQ-body">
              PandaEats慶祝新開幕，<b>24H營業!!!</b>。
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <router-link to="/products" class="btn btn-primary float-right"
      ><i class="fas fa-arrow-left"></i> 回商品頁面</router-link
    >
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pdNum: 1,
      isLoading: false,
      product: {},
      carts: JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const productId = vm.$route.params.productId
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productId}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.product.num = 1
        vm.isLoading = false
      })
    },
    addtoCart (product, qty = 1) {
      const vm = this
      vm.isLoading = true
      // 判斷目前欲加入的商品是否存在localStorage的暫存購物車內
      // 使用findIndex判斷，若為-1為不存在->新增至localStorage，並更新購物車total以及finalToal
      // 反之則更新該商品在localStorage的qty，並更新購物車total以及finalToal
      const idIndex = vm.carts.carts.findIndex(data => data.id === product.id)
      if (idIndex === -1) {
        const cartContent = {
          id: product.id, // 產品 ID
          qty: qty, // 產品數量，預設一筆
          title: product.title, // 產品標題
          imageUrl: product.imageUrl, // 產品圖片
          unit: product.unit, // 產品單位
          origin_price: product.origin_price === '' ? Number(product.price) : product.origin_price, // 產品原始金額
          price: Number(product.price) // 產品銷售金額
        }
        vm.carts.carts.push(cartContent)
      } else {
        vm.carts.carts[idIndex].qty += qty
        vm.carts.carts[idIndex].total += Number(product.price) * qty
      }
      const pdTotal = Number(product.price) * qty
      vm.carts.total += pdTotal
      vm.carts.finalTotal += 'coupon' in vm.carts ? Math.floor(pdTotal * vm.carts.coupon.percent) : pdTotal
      localStorage.setItem('tempCarts', JSON.stringify(vm.carts))
      vm.$bus.$emit('message:push', `已將 ${vm.product.title} 加入購物車`, 'success')
      vm.$bus.$emit('updateCarts')
      vm.isLoading = false
    },
    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then(() => {
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    vm.getProduct()
    vm.$bus.$on('updateCarts', () => {
      vm.carts = JSON.parse(localStorage.getItem('tempCarts')) || { carts: [], total: 0, finalTotal: 0 } // 暫存之購物車
    })
  }
}
</script>
