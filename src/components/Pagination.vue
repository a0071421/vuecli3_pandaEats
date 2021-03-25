<template>
  <nav
    aria-label="Page navigation example"
    v-if="paginationInfo"
    class="mt-3 d-flex justify-content-center"
  >
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !paginationInfo.has_pre }">
        <a
          class="page-link"
          href="#"
          @click.prevent="getProducts(paginationInfo.current_page - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in paginationInfo.total_pages"
        :key="page"
        :class="{ active: paginationInfo.current_page === page }"
      >
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !paginationInfo.has_next }">
        <a
          class="page-link"
          href="#"
          @click.prevent="getProducts(paginationInfo.current_page + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: ['paginationInfo'],
  data () {
    return {}
  },
  methods: {
    getProducts (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
