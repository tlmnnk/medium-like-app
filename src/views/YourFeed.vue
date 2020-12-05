<template>
  <div class="home globalFeeed">
    <Banner />
          <el-row :gutter="20">
            <el-col :span="18">
              <Feed :api-url="apiUrl"/>
            </el-col>
            <el-col :span="6">
              <Tags />
            </el-col>
          </el-row>
    
  </div>
</template>

<script>
import Feed from '../components/Feed'
import Tags from '../components/Tags'
import Banner from '../components/Banner'

export default {
  name: 'YourFeed',
  components: {
    Feed,
    Tags,
    Banner
  },
  data: () => ({
    apiUrl: '/articles/feed'
  })
}
</script>
