<template>
  <div class="feed__pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="pageChangeHandler">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    currentPageQuery() {
      return this.$router
    }
  },
  methods: {
    pageChangeHandler(value) {
      this.$router.push({path: this.url, query: {page: value}})
      console.log(value);
    }
  }
}
</script>

<style>
.feed__pagination {
  margin-top: 25px;
}
</style>