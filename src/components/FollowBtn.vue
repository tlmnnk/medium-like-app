<template>
  <el-button plain @click="followUser">
    <i v-if="isFollow" class="el-icon-close"> Unfollow User</i>
    <i v-else class="el-icon-plus"> Follow User</i>
  </el-button>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'FollowBtn',
  props: {
    userData: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isFollow: this.userData.following
    }
  },
 methods: {
   ...mapActions('followUser', ['handleFollow']),
  followUser() {
    this.handleFollow({slug: this.userData.username, isFollow: this.isFollow})
    this.isFollow = !this.isFollow
  }
 }
}
</script>

<style>

</style>