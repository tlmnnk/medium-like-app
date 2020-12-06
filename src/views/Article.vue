<template>
  
<div class="article">
  <div v-if="isLoading">Loading...</div>
    <div v-if="articleData" class="banner">
      <div  class="article__wrapper">
        <h2 class="article__title">{{articleData.author.username}}</h2>
        <div class="article__user-block">
          <UserInfoBlock :feedItem="articleData" />
          <ArticleEditBtn :articleData="articleData"/>
        </div>
      </div>
    </div>
    <div class="article__body">{{articleData.body}}</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UserInfoBlock from '../components/UserInfoBlock'
import ArticleEditBtn from '../components/ArticleEditBtn'

export default {
  name: 'Article',
  components: {
    UserInfoBlock,
    ArticleEditBtn
  },
  computed: {
    ...mapGetters('article', ['articleData', 'error', 'isLoading'])
  },
  methods: {
    ...mapActions('article', ['fetchArticle'])
  },
  mounted() {
    this.fetchArticle({slug: this.$route.params.slug})
  }
}
</script>

<style>
.article__wrapper {
  padding-left: 30px;
}
.article__title {
  text-align: left;
  font-size: 36px;
  line-height: 36px;
}
.articel__user-block {
  display: flex;
  align-items: center;
}
.article__buttons {
  margin-left: 40px;
}
.article__buttons>button {
  background: transparent;
}

</style>