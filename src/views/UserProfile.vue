<template>
  <div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-if="userProfileData">
      <div class="banner">
        <div>
            <el-avatar :size="80" :src="userProfileData.image" @error="avatarErrorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
              </el-avatar>
        </div>
        <h2>{{userProfileData.username}}</h2>
        <p v-if="userProfileData.bio">{{userProfileData.bio}}</p>
        <div v-if="getIsLoggedIn" class="user-profile__btn">
          <div v-if="isCurrentUser">
            <el-button plain @click="editUserProfile"><i class="el-icon-edit"></i> Edit profile</el-button>
          </div>
          <div v-else>
             <el-button plain @click="followUser"><i class="el-icon-plus"></i> Follow User</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
    ...mapGetters('userProfile', ['userProfileData', 'isLoading', 'error']),
    ...mapGetters('auth', ['getLogin', 'getIsLoggedIn']),
    isCurrentUser() {
      return this.getLogin === this.userProfileData.username
    }
  },
  methods: {
    ...mapActions('userProfile', ['getUserProfile']),
    avatarErrorHandler() {
      return true
    },
    editUserProfile() {
      this.$router.push({name: 'Settings'})
    },
    followUser() {}
  },
  mounted() {
    this.getUserProfile({slug: this.$route.params.slug})
  }
}
</script>

<style>
.user-profile__btn {
  padding-right: 30px;
  text-align: right;
}
</style>