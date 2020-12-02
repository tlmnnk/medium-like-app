<template>
  <div class="login">
    <h2>Sign In</h2>
    <h3><router-link to="/signup">Need an account?</router-link></h3>
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-position="top" label-width="120px" class="login-form">
      <el-form-item label="email" prop="email">
        <el-input type="email" v-model="loginForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Submit</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
  loginForm: {
    email: '',
    password: ''
  },
  loginFormRules: {}
  }),
  methods: {
    submitForm() {
      console.log(this.loginForm.email, this.loginForm.password);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login {
  margin-top: 30px;
}
</style>