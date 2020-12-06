<template>
  <div class="feed-item__userblock">
    <div class="feed-item__user-ava">
              <el-avatar :size="40" :src="feedItem.author.image" @error="avatarErrorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
              </el-avatar>
            </div>
            <div class="feed-item__userdata">
              <router-link :to="{name: 'User', params: {slug: feedItem.author.username}}">{{feedItem.author.username}}</router-link>
              <p class="feed-item__createdat">{{feedItem.createdAt.slice(0, 10)}}</p>
            </div>
          </div>
</template>

<script>
export default {
  name: 'UserInfoBlock',
  props: {
    feedItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    avatarErrorHandler() {
      return true
    }
  }
}
</script>

<style>
.feed-item__userdata {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.feed-item__userblock {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.feed-item__user-ava {
  margin-right: 10px;
}
.feed-item__createdat {
  font-size: 12px;
  color: #c7d9fc;
}
</style>