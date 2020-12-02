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
        <el-button type="primary" @click="submitForm('loginForm')" :disabled="isSubmitting">Submit</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
</el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data: () => {
    const passValidator = (rule, value, callback) => {
    if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          callback()
        }
    }
    return {
    loginForm: {
      email: '',
      password: ''
    },
    // TODO:
    // add form rules
    loginFormRules: {
      email: [
        { required: true, type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
      ],
      password: [
        { required: true, validator: passValidator, trigger: 'blur' }
      ]
    }
    }
  },
  computed: {
    ...mapGetters('auth', ['isSubmitting', 'getErrors'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
         console.log(valid);
          if (valid) {
            // this.register(this.signup)
          } else {
            return false;
          }
      })
      this.login({ email: this.loginForm.email, password: this.loginForm.password });
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