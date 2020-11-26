<template>
  <div class="sign-up">
    <h2>Sign up</h2>
    <h3><router-link to="{name: 'login'}">Have an account?</router-link></h3>
    <el-form ref="signup" label-position="top" :model="signup" label-width="120px">
  <el-form-item label="Your name">
    <el-input v-model="signup.name" prop="name"></el-input>
  </el-form-item>
  <el-form-item label="email">
    <el-input v-model="signup.email" prop="email"></el-input>
  </el-form-item>
  <el-form-item label="password">
    <el-input v-model="signup.password" prop="password"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button  @click="resetForm('signup')">Reset</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data: () => ({
    signup: {
      name: '',
      email: '',
      password: ''
    }
    // TODO:
    // add input validation
  }),
  methods: {
    onSubmit() {
      console.log()
    },
    resetForm(formName) {
      console.log('hi');
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
  .sign-up {
    margin: 0 auto;
    max-width: 720px;
  }
</style>