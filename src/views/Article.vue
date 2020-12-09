<template>
<div class="container">
<div class="article">
  <div v-if="isLoading">Loading...</div>
  <div v-if="articleData">
    <div class="banner">
      <div  class="article__wrapper">
        <h2 class="article__title">{{articleData.title}}</h2>
        <div class="article__user-block">
          <UserInfoBlock :feedItem="articleData" />
          <ArticleEditBtn 
            :articleData="articleData"
            @editArticle="editArticle"/>
        </div>
      </div>
    </div>
    <div class="article__body-block">
      <div class="article__body">{{articleData.body}}</div>
      <ArticleTags v-if="articleData.tagList.length" :tags="articleData.tagList"/>
    </div>
    <div class="divider"></div>
  </div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UserInfoBlock from '../components/UserInfoBlock'
import ArticleEditBtn from '../components/ArticleEditBtn'
import ArticleTags from '../components/ArticleTags'

export default {
  name: 'Article',
  components: {
    UserInfoBlock,
    ArticleEditBtn,
    ArticleTags
  },
  computed: {
    ...mapGetters('article', ['articleData', 'error', 'isLoading'])
  },
  methods: {
    ...mapActions('article', ['fetchArticle']),
    editArticle() {
      console.log('helloooooololo');
    }
  },
  mounted() {
    this.fetchArticle({slug: this.$route.params.slug})
  },
  unmounted() {
    console.log('unmounted');
  }
}
</script>

<style>
.article__wrapper, .article__body-block {
  padding: 0 30px;
  overflow: hidden;
}
.article__title {
  text-align: left;
  font-size: 36px;
  line-height: 36px;
}
.article__user-block {
  display: flex;
  align-items: center;
}
.article__buttons {
  margin-left: 40px;
}
.article__buttons>button {
  background: transparent;
}
.article__body, .article__tag {
  margin-top: 40px;
  font-size: 24px;
  text-align: left;
}
.article__tag {
  margin-top: 20px;
}

</style>