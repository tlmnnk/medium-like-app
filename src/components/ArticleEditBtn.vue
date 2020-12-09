<template>
  <div v-if="getIsLoggedIn">
    <div v-if="isMyArticle" class="article__buttons">
      <el-button plain @click="editArticle">Edit Article</el-button>
      <el-button type="danger" @click="removeArticle">Delete Article</el-button>
    </div>
    <div v-else class="article__buttons">
      <FollowBtn :userData="articleData.author"/>
      <el-button>
        <i v-if="articleData.favorited" class="el-icon-star-on"></i>
        <i v-else class="el-icon-star-off"></i>
        Favorite Article ({{articleData.favoritesCount}})
      </el-button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FollowBtn from '../components/FollowBtn'

export default {
  name: 'ArticleEditBtn',
  components: {
    FollowBtn
  },
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