<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="article" class="article__form container">
      <ArticleForm  
        :initValues="initValues"
        :isSubmitting="isSubmitting"
        @submitArticle="submitArticle"
        />
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ArticleForm from '../components/ArticleForm'

export default {
  name: 'EditArticle',
  components: {
    ArticleForm
  },
  computed: {
    ...mapGetters('editArticle', ['isSubmitting', 'serverValiationErrors', 'isLoading', 'article']),
    initValues() {
      if (!this.article) {
        return {
          title: '',
          description: '',
          body: '',
          tagList: []
        }
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  mounted() {
    this.getArticle({slug: this.$route.params.slug})
  },
  methods: {
    ...mapActions('editArticle', ['updateArticle', 'getArticle']),
    async submitArticle(data) {
      await this.updateArticle({articleInput: data, slug: this.article.slug})
      this.$router.push({name: 'article', params:{slug: this.article.slug}})
    }
  }
}
</script>

<style>
.article__form {
  max-width: 768px;
}
</style>
