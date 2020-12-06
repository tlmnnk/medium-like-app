<template>
  <div>
    <el-tabs v-model="getActiveTab" @tab-click="handleTabClick">
      <el-tab-pane label="Global feed" name="globalFeed"></el-tab-pane>
      <el-tab-pane v-if="getIsLoggedIn" label="Your feed" name="yourFeed"></el-tab-pane>
      <el-tab-pane v-if="tagName" :label="tagNameHash" name="tag"></el-tab-pane>
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
    },
    tagNameHash() {
      return `#${this.tagName}`
    }
  },
  methods: {
     handleTabClick(tab) {
       console.log(this.$route.name);
       console.log(tab.$options.propsData.name);
       switch (tab.$options.propsData.name) {
         case 'globalFeed':
           (this.$route.name !== 'globalFeed') && this.$router.push({name: tab.$options.propsData.name})
           break;
        case 'yourFeed':
          (this.$route.name !== 'yourFeed') && this.$router.push({name: tab.$options.propsData.name})
           break;
        case 'tag':
          (this.$route.name !== 'tag') && this.$router.push({name: tab.$options.propsData.name})
           break;
       }
      }
  }
}
</script>

<style>

</style>