<template>
  <div>Create article
    <div class="article__form container">
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
  name: 'CreateArticle',
  components: {
    ArticleForm
  },
  data: ()=>({
    initValues: {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  }),
  computed: {
    ...mapGetters('createArticle', ['isSubmitting', 'serverValiationErrors'])
  },
  methods: {
    ...mapActions('createArticle', ['createArticle']),
    async submitArticle(data) {
      const res = await this.createArticle({articleInput: data})
      this.$router.push({name: 'article', params:{slug: res.slug}})
    }
  }
}
</script>

<style>
.article__form {
  max-width: 768px;
}
</style>
