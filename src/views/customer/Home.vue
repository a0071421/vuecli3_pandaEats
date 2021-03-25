<template>
  <div>
    <Banner />
    <section class="section reserve bg-cover">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="reserve-form bg-dark">
              <h3 class="section-subtitle text-success">Reserve Now</h3>
              <h2 class="section-title text-white">
                飲食，是決定一切的關鍵<br />吃得對，比吃得多還要重要!!
              </h2>
              <div class="slogan text-white">
                <div class="row">
                  <div class="col-sm-3">
                    <span>EAT LOCAL</span>
                  </div>
                  <div class="col-sm-9">
                    <p>挑選當季在地新鮮蔬菜，使用低脂優質肉類。</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <span>EAT REAL</span>
                  </div>
                  <div class="col-sm-9">
                    <p>
                      拒絕使用再製加工品，選用大量天然食材；吃食物，不吃食品。
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <span>EAT NATURAL</span>
                  </div>
                  <div class="col-sm-9">
                    <p>
                      烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的鮮、甘、甜。
                    </p>
                  </div>
                </div>
                <router-link
                  to="/products"
                  class="btn btn-lg btn-outline-success"
                  >立即下訂</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-3 bg-opacity position-relative">
      <div class="container">
        <div class="title m-3 text-center">
          <h3 class="section-subtitle text-success">Special secret</h3>
          <h2 class="section-title text-primary">
            客人總是在詢問<br />這麼好吃的秘訣是什麼
          </h2>
        </div>

        <div class="row mt-5">
          <div class="col-md-4">
            <div class="item-card">
              <div
                class="bg-cover rounded-circle item-card-img"
                style="background-image:url('https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">優良原料</h3>
                <p class="item-card-text">
                  我們堅持的是原物料的品質 <br />嚴選最安心、自然的食材。
                  <br />我們堅持不添加防腐劑及任何食品添加物
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="item-card">
              <div
                class="bg-cover rounded-circle item-card-img"
                style="background-image:url('https://images.unsplash.com/photo-1513135557534-682d53fd7046?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1349&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">現點現做</h3>
                <p class="item-card-text">
                  食材的品質是我們所注重的
                  <br />每天現點現做<br />才能顯現出食材的美味
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="item-card">
              <div
                class="bg-cover rounded-circle item-card-img"
                style="background-image:url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">絕對飽足</h3>
                <p class="item-card-text">
                  大份量、高CP是我們給消費者的保證
                  <br />每一口都是真材實料<br />等著你來嘗試
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section my-3 special container">
      <div class="container-fluid">
        <div class="title m-3 text-center">
          <h3 class="section-subtitle text-success">Special meal</h3>
          <h2 class="section-title text-primary">特色餐點</h2>
        </div>
        <div class="row justify-content-center mt-5">
          <div class="col-md-4 mb-5">
            <div class="item-card">
              <div
                class="bg-cover item-card-img rounded"
                style="background-image:url('https://images.unsplash.com/photo-1583549323543-7ae855a78d6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">炙焰犇放牛排餐</h3>
                <p class="item-card-text">
                  選用上等油花均勻的牛上肩，搭配季節考時蔬，每一口都在挑戰您的味蕾
                </p>
                <router-link
                  to="/products"
                  class="btn btn-success btn-sm"
                  >了解更多
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <div class="item-card">
              <div
                class="bg-cover item-card-img rounded"
                style="background-image:url('https://images.unsplash.com/photo-1581512798638-ebd32054b3b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1311&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">力爭上游烤鮭魚</h3>
                <p class="item-card-text">
                  愛吃魚的您絕對不能錯過鮭魚，富含豐富的OMEGA-3，最簡單的調味，卻能帶給您最不平凡的美味
                </p>
                <router-link
                  to="/products"
                  class="btn btn-success btn-sm"
                  >了解更多
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <div class="item-card">
              <div
                class="bg-cover item-card-img rounded"
                style="background-image:url('https://images.unsplash.com/photo-1579619168313-d2e074a7ee02?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80')"
              ></div>
              <div class="item-card-body">
                <h3 class="item-card-title text-highlight">
                  絕不是美豬之菲力豬
                </h3>
                <p class="item-card-text">
                  本店絕不使用美豬，確保您我的健康，採用台灣溫體豬，香煎之恰到好處，絕對給您滿滿的驚喜
                </p>
                <router-link
                  to="/products"
                  class="btn btn-success btn-sm"
                  >了解更多
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
export default {
  components: {
    Banner
  }
}
</script>
