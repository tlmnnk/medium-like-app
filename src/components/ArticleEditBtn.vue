<template>
  <div v-if="getIsLoggedIn">
    <div v-if="isMyArticle" class="article__buttons">
      <el-button plain @click="editArticle">Edit Article</el-button>
      <el-button type="danger" @click="removeArticle">Delete Article</el-button>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ArticleEditBtn',
  props: {
    articleData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('auth', ['getLogin', 'getIsLoggedIn']),

    isMyArticle() {
      return this.getLogin ===  this.articleData.author.username
    }
  },
  methods: {
    ...mapActions('article', ['deleteArticle']),
    ...mapActions('editArticle', ['getArticle']),
    async removeArticle() {
      await this.deleteArticle({slug: this.articleData.slug})
      this.$router.push({name: 'globalFeed'})
    },
    editArticle() {
      // await this.getArticle({slug: this.articleData.slug})
      this.$router.push({name: 'editArticle', params: {slug: this.articleData.slug}})
    }
  }
}
</script>

<style>

</style>