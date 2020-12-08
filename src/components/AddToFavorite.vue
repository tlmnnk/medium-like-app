<template>
  <div class="feed-item__feed-likes">
    <el-badge :value="feedItem.favoritesCount" class="item" >
      <el-button size="small" @click="likeClick">
        <i v-if="feedItem.favorited" class="el-icon-star-on"></i>
        <i v-else class="el-icon-star-off"></i>
        </el-button>
    </el-badge>
  </div>
</template>

<script>
export default {
  name: 'AddToFavorite',
  props: {
    feedItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    likeClick() {
      console.log('like!!');
    }
  }
}
</script>

<style>

</style>