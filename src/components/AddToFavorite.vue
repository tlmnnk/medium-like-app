<template>
  <div class="favorite-block">
    <el-button v-if="isArticle" @click="handleLike" class="like__btn">
        <i v-if="isFavorited" class="el-icon-star-on"> Unfavorite Article ({{favoritesCount}})</i>
        <i v-else class="el-icon-star-off"> Favorite Article ({{favoritesCount}})</i>       
      </el-button>
      <div v-else class="feed-item__feed-likes">
        <el-badge :value="favoritesCount" class="item" >
          <el-button size="small" @click="handleLike">
          <i v-if="isFavorited" class="el-icon-star-on"></i>
          <i v-else class="el-icon-star-off"></i>
        </el-button>
      </el-badge>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'AddToFavorite',
  props: {
    feedItem: {
      type: Object,
      required: true
    },
    isArticle: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      isFavorited: this.feedItem.favorited,
      favoritesCount: this.feedItem.favoritesCount
    }
  },
  methods: {
    ...mapActions('addToFavorites', ['handleLikeArticle']),
    handleLike() {
      this.handleLikeArticle({isFavorited: this.isFavorited, slug: this.feedItem.slug})
      if (this.isFavorited) {
        this.favoritesCount -= 1
      } else {
        this.favoritesCount += 1
      }
      this.isFavorited = !this.isFavorited
    }
  }
}
</script>

<style>
.favorite-block {
  margin-left: 20px;
  display: inline-block;
}

</style>