<template>
  <div class="settings" v-if="currentUser">
    <h2>Your Settings</h2>
    <div v-if="validationErrors"></div>
    <el-form :model="updateUserData" status-icon :rules="userRules" ref="userDataForm" label-width="120px">
      <el-form-item label="image" prop="image">
        <el-input type="text" v-model="updateUserData.image" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input type="text" v-model="updateUserData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="bio" prop="bio">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="updateUserData.bio">
        </el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input type="text" v-model="updateUserData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="new password" prop="password">
        <el-input type="text" v-model="updateUserData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isSubmitting" @click="submitForm('userDataForm')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Settings',
  data: () => ({
    updateUserData: {
      image: '',
      name: '',
      bio: '',
      email: '',
      password: ''
    },
    userRules: {}
  }),
  computed: {
    ...mapGetters('settings', ['isSubmitting', 'validationErrors']),
    ...mapGetters('auth', ['currentUser'])
  },
  methods: {
    ...mapActions('auth', ['updateCurrentUser']),
    submitForm() {
      console.log(this.updateUserData);
    }
  }
}
</script>

<style>

</style>