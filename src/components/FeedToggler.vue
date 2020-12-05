<template>
  <div>
    <el-tabs v-model="getActiveTab" @tab-click="handleTabClick">
      <el-tab-pane label="Global feed" name="Global feed"></el-tab-pane>
      <el-tab-pane v-if="getIsLoggedIn" label="Your feed" name="Your feed"></el-tab-pane>
      <el-tab-pane v-if="tagName" label="tag" name="tag"></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'FeedToggler',
  props: {
    tagName: {
      type: String,
      required: false
    },
    activeTab: {
      type: String
    }
  },
  data () {
    return {
    activeTabData: this.activeTab
  }},
  computed: {
    ...mapGetters('auth', ['getIsLoggedIn']),
    getActiveTab: {
      get() {
        return this.activeTabData
      },
      set: (value)=> (value)
    }
  },
  methods: {
     handleTabClick(tab) {
       console.log(this.$route.name);
       switch (tab.$options.propsData.name) {
         case 'Global feed':
           (this.$route.name === 'yourFeed') && this.$router.push({name: 'globalFeed'})
           break;
        case 'Your feed':
          (this.$route.name === 'globalFeed') && this.$router.push({name: 'yourFeed'})
           break;
       }
      }
  }
}
</script>

<style>

</style>