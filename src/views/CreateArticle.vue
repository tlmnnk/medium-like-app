<template>
  <div>Create article
    <div class="article__form container">
      <ArticleForm  
        :initValues="initValues"
        :errors="errors"
        :isSubmitting="isSubmitting"
        @submitArticle="submitArticle"
        />
    </div>
  </div>
</template>

<script>
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
    },
    errors: null,
    isSubmitting: ''
  }),
  methods: {
    submitArticle(data) {
      console.log('subbmit article', data);
    }
  }
}
</script>

<style>
.article__form {
  max-width: 768px;
}
</style>
