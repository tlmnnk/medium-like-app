<template>
  <div class="home feed globalFeeed">
    <Banner />
    <div class="container">
      <el-row :gutter="20">
            <el-col :span="18">
              <div class="feed__block">
                <FeedToggler :activeTab="activeTab"/>
                <Feed :api-url="apiUrl"/>
              </div>
            </el-col>
            <el-col :span="6">
              <Tags />
            </el-col>
          </el-row>
    </div>
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
    activeTab: 'globalFeed',
    apiUrl: '/articles'
  })
}
</script>
