<template>
  <div v-if="updateUserData" class="settings__form">
    <el-form
      class="settings__form"
      :model="userData"
      status-icon
      label-position="top"
      :rules="userSettingSFormRules" ref="userDataForm" label-width="120px">
      <el-form-item label="image" prop="image">
        <el-input type="text" v-model="userData.image" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="name" prop="username">
        <el-input type="text" v-model="userData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="bio" prop="bio">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input"
          v-model="userData.bio">
        </el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input type="text" v-model="userData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="new password" prop="password">
        <el-input type="password" v-model="userData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isSubmitting" @click="submitForm('userDataForm')">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {passValidator} from '../helpers/passValidator'
export default {
  name: 'SettingsForm',
  props: {
    updateUserData: {
      type: Object,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return ({
      userData: {
        image: this.updateUserData.image || '',
          username: this.updateUserData.username,
          bio: this.updateUserData.bio || '',
          email: this.updateUserData.email,
          password: ''
        },
      userSettingSFormRules: {
        image: [
            { required: false, min: 5, max: 250, message: 'Length should be 5 to 250', trigger: 'blur' }
        ],
        username: [
          { required: true, min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: 'Please input a valid email', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: false, validator: passValidator, trigger: 'blur' }
        ]
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              image: this.userData.image,
              username: this.userData.username,
              bio: this.userData.bio,
              email: this.userData.email,
              pasword: this.userData.password,
            }
            this.$emit('submitSettings', data)
          } else {
            return false;
          }
        });
    }
  }
}
</script>

<style>
.settings__form {
  margin: 0 auto;
  max-width: 768px;
}
</style>