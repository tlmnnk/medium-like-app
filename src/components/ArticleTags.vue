<template>
  <div class="article__tag">
    <el-tag 
          v-for="(tag, index) in tags" 
          :key="index"
          class="tags__tag"
          >
          {{tag}}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'ArticleTags',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.article__tag {
  margin-top: 30px;
}
</style>