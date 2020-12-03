<template>
  <div class="home">
    BANNER
    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content bg-purple-dark"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <Feed :api-url="apiUrl"/>
  </div>
</template>

<script>
import Feed from '../components/Feed'
export default {
  name: 'GlobalFeed',
  components: {
    Feed
  },
  data: () => ({
    apiUrl: '/articles'
  })
}
</script>

<style>
.el-row {
    margin-bottom: 20px;
  }
.el-col:last-child {
      margin-bottom: 0;
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>