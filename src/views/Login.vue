<template>
  <div class="login sign-up">
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
import { Notification } from 'element-ui'

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
        { required: true, type: 'email', message: 'Please input a valid email', trigger: ['blur', 'change'] }
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
    async submitForm(formName) {
      this.$refs[formName].validate(valid => {
         console.log(valid);
          if (valid) {
            // this.register(this.signup)
          } else {
            return false;
          }
      })
      await this.login({ email: this.loginForm.email, password: this.loginForm.password });
      if (this.getErrors) {
        this.errorMessages()
      } else {
        this.$router.push({name: 'globalFeed'})
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    errorMessages() {
      Notification({title: 'Error', message: 'Email or Password is incorrect', type: 'error', closable: true, duration: 5000})
    }
  }
}
</script>

<style>
.login {
  margin-top: 30px;
}
</style>