<template>
  <div class="home feed tagFeed">
    <Banner />
      <el-row :gutter="20">
        <el-col :span="18">
          <FeedToggler :tagName="tagName" :activeTab="activeTab"/>
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
  name: 'TagFeed',
  components: {
    Feed,
    Tags,
    Banner,
    FeedToggler
  },
  data: ()=> ({
    activeTab: 'tag'
  }),
 computed: {
   tagName() {
     return this.$route.params.slug
   },
   apiUrl() {
     return `/articles?tag=${this.tagName}`
   }
 }
}
</script>
