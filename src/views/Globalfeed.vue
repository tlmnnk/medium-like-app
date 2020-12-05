<template>
  <div class="home feed globalFeeed">
    <Banner />
          <el-row :gutter="20">
            <el-col :span="18">
              <FeedToggler :activeTab="activeTab"/>
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
import FeedToggler from '../components/FeedToggler'

export default {
  name: 'GlobalFeed',
  components: {
    Feed,
    Tags,
    Banner,
    FeedToggler
  },
  data: () => ({
    activeTab: 'Global feed',
    apiUrl: '/articles'
  })
}
</script>
