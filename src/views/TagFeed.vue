<template>
  <div class="home feed tagFeed">
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
  name: 'TagFeed',
  components: {
    Feed,
    Tags,
    Banner
  },
 computed: {
   apiUrl() {
     const tagName = this.$route.params.slug
     return `/articles?tag=${tagName}`
   }
 }
}
</script>
