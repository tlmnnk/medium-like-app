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
             <FollowBtn :userData="userProfileData"/>
          </div>
        </div>
      </div>
      <div class="user-profile__feed feed__block">
        <div class="user-profile__fedd-toggler">
          <el-tabs v-model="getActiveTab" @tab-click="handleTabClick">
            <el-tab-pane label="My Articles" name="My Articles"></el-tab-pane>
            <el-tab-pane  label="Favorited Articles" name="Favorited Articles"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="user-profile__feed">
          <Feed :apiUrl="apiUrl"/>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Feed from '../components/Feed'
import FollowBtn from '../components/FollowBtn'

export default {
  name: 'UserProfile',
  components: {
    Feed,
    FollowBtn
  },
  data() { 
    return {
      apiUrlValue: '',
    } 
  },
  computed: {
    ...mapGetters('userProfile', ['userProfileData', 'isLoading', 'error']),
    ...mapGetters('auth', ['getLogin', 'getIsLoggedIn']),
    isCurrentUser() {
      return this.getLogin === this.userProfileData.username
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    apiUrl() {
      if (this.isFavaoritesPath) {
        return `/articles?favorited=${this.userProfileSlug}`
      } else {
        return `/articles?author=${this.userProfileSlug}`
      }
    },
    isFavaoritesPath() {
      return this.$route.path.includes('favorites')
    },
    getActiveTab: {
      get() { return this.isFavaoritesPath ? 'Favorited Articles' : 'My Articles'},
      set(value) { return value }
    }
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile({slug: this.$route.params.slug})
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
    handleTabClick(tab) {
      switch (tab.$options.propsData.name) {
        case 'My Articles':
          this.isFavaoritesPath && this.$router.push({name: 'UserProfile', params: {slug: this.$route.params.slug}})
          break;
        case 'Favorited Articles':
          !this.isFavaoritesPath && this.$router.push({name: 'userProfileFavorites', params: {slug: this.$route.params.slug}})
          break;
      }
    }
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