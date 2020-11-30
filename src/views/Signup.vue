<template>
  <div class="sign-up">
    <h2>Sign up</h2>
    <h3><router-link to="/login">Have an account?</router-link></h3>
    <el-form ref="signupForm" label-position="top" :model="signup" label-width="120px" :rules="signupRules">
  <el-form-item label="Your name" prop="name">
    <el-input v-model="signup.name" prop="name"></el-input>
  </el-form-item>
  <el-form-item label="email" prop="email">
    <el-input v-model="signup.email" prop="email"></el-input>
  </el-form-item>
  <el-form-item label="password" prop="password">
    <el-input v-model="signup.password" prop="password"></el-input>
  </el-form-item>
 
  <el-form-item>
    <div class="signup__btn-block">
    <el-button type="primary" @click="onSubmit" :disabled="isSubmittingComputed()">Create</el-button>
    <el-button  @click="resetForm('signupForm')">Reset</el-button>
    </div>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

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
      name: '',
      email: '',
      password: ''
    },
    signupRules: {
      name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
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
    isSubmittingComputed() {
      return this.isSubmitting
    }
  },
  methods: {
    ...mapGetters('auth', ['isSubmitting']),
    ...mapActions('auth', ['toggleRegStart']),
    onSubmit() {
      console.log(this.signup)
    },
    resetForm(formName) {
      console.log(formName);
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
