<template>
  <div>
    <div v-if="isMyArticle" class="article__buttons">
      <el-button plain>Edit Article</el-button>
      <el-button type="danger">Delete Article</el-button>
    </div>
    <div v-else class="article__buttons">
      <el-button plain>
        <i class="el-icon-plus"></i>
        follow {{this.articleData.author.username}}
      </el-button>
      <el-button>
        <i v-if="this.articleData.favorited" class="el-icon-star-on"></i>
        <i v-else class="el-icon-star-off"></i>
        Favorite Article ({{this.articleData.favoritesCount}})
      </el-button>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ArticleEditBtn',
  props: {
    articleData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('auth', ['getLogin']),
    isMyArticle() {
      return this.getLogin ===  this.$route.params.slug
  }
},
  
}
</script>

<style>

</style>