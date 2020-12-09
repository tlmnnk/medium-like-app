<template>
  <div class="settings" v-if="currentUser">
    <h2>Your Settings</h2>
    <div v-if="validationErrors"></div>
      <SettingsForm 
        :updateUserData="currentUser"
        :isSubmitting="isSubmitting"
        @submitSettings="submitSettings"/>
      <div class="divider"></div>
      <div class="settings__logout container">
        <el-button type="danger" @click="logoutUser">or click here to Logout</el-button>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import SettingsForm from '../components/SettingsForm'

export default {
  name: 'Settings',
  components: {
    SettingsForm
  },
  computed: {
    ...mapGetters('settings', ['validationErrors']),
    ...mapGetters('auth', ['currentUser', 'isSubmitting']),
    getUserData() {
        return {
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: ''
        }
      }
  },
  methods: {
    ...mapActions('auth', ['updateCurrentuser', 'logout']),
    submitSettings(data) {
      this.updateCurrentuser({userInput: data})
    },
    logoutUser() {
      this.logout()
      this.$router.push({name: 'globalFeed'})
    }
  }
}
</script>

<style>
.settings__logout {
  text-align: left;
  margin-top: 20px;
}
.settings__logout .el-button--danger {
  width: 180px;
}
</style>
