<template>
  <div class="sign-up">
    <h2>Sign up</h2>
    <h3><router-link to="/login">Have an account?</router-link></h3>
    <el-form ref="signupForm" label-position="top" :model="signup" label-width="120px" :rules="signupRules">
      <el-form-item label="Your name" prop="username">
        <el-input v-model="signup.username"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="signup.email"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="signup.password"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="signup__btn-block">
          <el-button type="primary" @click="onSubmit('signupForm')" :disabled="isSubmitting">Create</el-button>
          <el-button  @click="resetForm('signupForm')">Reset</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Signup',
  data: () => {
    const passValidator = (rule, value, callback) => {
       if (!(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value))) {
         callback(new Error('Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?'))
       }
    };
    return {
    signup: {
      username: '',
      email: '',
      password: ''
    },
    isFormValid: false,
    signupRules: {
      username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
      ],
      email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
      ],
      password: [
          { validator: passValidator, trigger: 'blur' }
      ],
    },
  }},
  computed: {
    ...mapGetters('auth', ['isSubmitting', 'getErrors'])
  },
  methods: {
    ...mapActions('auth', ['register']),
    async onSubmit(formName) {
      this.isFormValid = true
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            // this.register(this.signup)
          } else {
            this.isFormValid = false
            return false;
          }
        });
        if (this.isFormValid) {
          await this.register(this.signup)
          if (this.getErrors) {
            this.errorMessages()
          } else {
            this.$router.push({name: 'home'})
          }
        }
    },
    errorMessages() {
      Object.entries(this.getErrors).forEach(([key, arrOfErrors]) => {
        arrOfErrors.forEach(errorText => {
          setTimeout(() => {
            Notification({title: 'Error', message: `${key} ${errorText}`, type: 'error', closable: true, duration: 5000})
          }, 0);   
        });
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style>
  .sign-up {
    margin: 0 auto;
    max-width: 720px;
  }
  .signup__btn-block {
    margin-top: 30px;
  }
</style>
