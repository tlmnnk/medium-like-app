<template>
  <div>
    <div v-if="isLoading" class="tags__loading">Loading...</div>
    <div v-if="error">got an errord</div>
    <div v-if="tagsData" class="tags__block">
      <h3 class="tags__title">Popular tags</h3>
      <div class="tags__block">
        <el-tag 
          v-for="(tag, index) in tagsData" 
          :key="index"
          class="tags__tag"
          @click="onTagClick(tag)"
          >
          {{tag}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { Loading } from 'element-ui'

export default {
  name: 'PopularTags',
  computed: {
    ...mapGetters('tags', ['isLoading', 'error', 'tagsData'])
  },
  methods: {
    ...mapActions('tags', ['fetchTags']),
    onTagClick(value) {
      this.$router.push({name: 'tag', params: {slug: value }})
    }
  },
  mounted() {
    this.fetchTags()
  },
    updated() {
    if (this.isLoading) {
      this.loadingInstance = Loading.service({
        target: '.tags__loading',
        fullscreen: 'false'
        });
    } else {
      if (this.loadingInstance) {
        this.loadingInstance.close()
        this.loadingInstance = null
      }
    }
  },
}
</script>

<style>
.tags__tag {
  margin: 5px;
  display: inline-block;
  height: 100%;
  text-decoration: none;
  color: rgb(25, 131, 252);
}
.tags__loading {
  widows: 100%;
  height: 200px;
}
.tags__block {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>