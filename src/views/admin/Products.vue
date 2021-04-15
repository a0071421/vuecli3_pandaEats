<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      class="d-flex justify-content-end mt-4"
      :class="{ 'justify-content-between': products.length }"
    >
      <button
        v-if="products.length !== 0"
        type="button"
        @click="openModal('deleteAll')"
        class="btn btn-danger"
      >
        刪除所有產品
      </button>
      <!-- Button trigger modal -->
      <button type="button" @click="openModal('new')" class="btn btn-primary">
        建立新的產品
      </button>
    </div>

    <div v-if="products.length != 0" class="custom-table-width mt-4">
      <table class="table custom-table">
        <thead class="custom-table-thead">
          <th class="text-nowrap w-20">產品名稱</th>
          <th class="text-nowrap">分類</th>
          <th class="text-nowrap">原價</th>
          <th class="text-nowrap">售價</th>
          <th class="text-nowrap">是否啟用</th>
          <th class="text-nowrap w-20">編輯</th>
        </thead>
        <tbody class="custom-table-tbody">
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.category }}</td>

            <td v-if="!item.origin_price" class="text-right"></td>
            <td v-else class="text-right">
              {{ item.origin_price | currency }}
            </td>
            <td v-if="!item.price" class="text-right"></td>
            <td v-else class="text-right">
              {{ item.price | currency }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
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
      <Pagination :pagination-info="pagination" @changePage="getProducts" />
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="updateProduct">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="option === 'new'">
                  新增產品
                </span>
                <span v-if="option === 'edit'">
                  編輯產品
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
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input
                        v-model="tempProduct.imageUrl"
                        type="text"
                        class="form-control"
                        id="imageUrl"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <div class="form-group">
                      <label for="customFile"
                        >或 上傳圖片
                        <i
                          class="fas fa-spinner fa-pulse"
                          v-if="status.fileUploading"
                        ></i>
                      </label>
                      <input
                        @change="uploadFile"
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="files"
                      />
                      <img
                        :src="tempProduct.imageUrl"
                        class="img-fluid mt-3"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input
                        v-model="tempProduct.title"
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="請輸入標題"
                        required
                      />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input
                          v-model="tempProduct.category"
                          type="text"
                          class="form-control"
                          id="category"
                          placeholder="請輸入分類" required
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="unit">單位</label>
                        <input
                          v-model="tempProduct.unit"
                          type="text"
                          class="form-control"
                          id="unit"
                          placeholder="請輸入單位" required
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input
                          v-model="tempProduct.origin_price"
                          type="number"
                          class="form-control"
                          id="origin_price"
                          placeholder="請輸入原價"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input
                          v-model="tempProduct.price"
                          type="number"
                          class="form-control"
                          id="price"
                          placeholder="請輸入售價" required
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <input
                        v-model="tempProduct.description"
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder="請輸入產品描述"
                      />
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <input
                        v-model="tempProduct.content"
                        type="text"
                        class="form-control"
                        id="content"
                        placeholder="請輸入說明內容"
                      />
                    </div>
                    <div class="form-group form-check">
                      <input
                        v-model="tempProduct.is_enabled"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        class="form-check-input"
                        id="is_enabled" required
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-dismiss="modal"
                @click="cancelAction"
              >
                取消
              </button>
              <button
                type="submit"
                class="btn btn-outline-primary"
                id="confirm"
              >
                <span v-if="option === 'new'">
                  新增
                </span>
                <span v-if="option === 'edit'">
                  更新
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModaßlLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              刪除產品
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
              >{{ tempProduct.title }}</strong
            >
            <strong
              v-if="option === 'deleteAll'"
              class="h4 text-highlight word-wrap-break"
            >
              全部
            </strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button @click="deleteProduct" type="button" class="btn btn-danger">
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
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      option: '',
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      // vm.isLoading = true
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.isLoading = false
          vm.products = response.data.products
          vm.pagination = response.data.pagination
        } else {
          /* vm.$bus.$emit('message:push', '請登入', 'danger')
          vm.$router.push('/login') */
        }
      })
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      vm.isLoading = true
      if (vm.option === 'edit') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      } // if

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        $('#productModal').modal('hide')
        if (response.data.success) {
          vm.$bus.$emit(
            'message:push',
            `${vm.option === 'new' ? '新增' : '更新'} ${
              vm.tempProduct.title
            } 成功`,
            'success'
          )
          vm.getProducts()
        } else {
          vm.$bus.$emit('message:push', '新增失敗', 'danger')
        }
        vm.isLoading = false
      })
    },
    openModal (option, item) {
      this.option = option
      if (option === 'new') {
        this.tempProduct = {}
        $('#productModal').modal('show')
      } else if (option === 'edit') {
        this.tempProduct = { ...item }
        $('#productModal').modal('show')
      } else {
        // delete or deleteAll
        this.tempProduct = { ...item }
        $('#delProductModal').modal('show')
      }
    },

    deleteProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      vm.isLoading = true
      if (vm.option === 'deleteAll') {
        vm.products.forEach((item, index) => {
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
          vm.$http.delete(api).then(response => {
            $('#delProductModal').modal('hide')
            if (response.data.success) {
              if (index === vm.products.length - 1) {
                vm.$bus.$emit('message:push', '已刪除所有產品')
                vm.getProducts()
              }
            } else {
              vm.$bus.$emit('message:push', '刪除失敗', 'danger')
            }
          })
        })
      } else {
        vm.$http.delete(api).then(response => {
          $('#delProductModal').modal('hide')
          if (response.data.success) {
            vm.$bus.$emit('message:push', `已刪除產品 ${vm.tempProduct.title}`)
            vm.getProducts()
          } else {
            vm.$bus.$emit('message:push', '刪除失敗', 'danger')
          }
        })
      }
    },
    uploadFile () {
      const data = this.$refs.files.files[0]
      const formData = new FormData()
      const vm = this
      vm.status.fileUploading = true
      $('#confirm').attr('disabled', true)
      formData.append('file-to-upload', data)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.$http
        .post(url, formData, {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger')
            $('#customFile').val('')
          }
          vm.status.fileUploading = false
          $('#confirm').attr('disabled', false)
        })
    },

    cancelAction () {
      this.status.fileUploading = false
      $('#customFile').val('')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
