<template>
  <nav class="nav">
    <router-link class="nav__brand" to="{name: '/home'}"><h1>Medium-like-app</h1></router-link>
    <el-menu v-if="getIsLoggedIn" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="Home">
         <router-link class="nav__link" to="/"><i class="el-icon-s-home"></i>Home</router-link>
      </el-menu-item>
        <el-menu-item index="Newpost">
          <router-link class="nav__link" to="/newpost"><i class="el-icon-edit"></i>New Article</router-link>
        </el-menu-item>
        <el-menu-item index="Settings">
          <router-link class="nav__link" to="/settings"><i class="el-icon-setting"></i>Settings</router-link>
         </el-menu-item>
        <el-menu-item index="User">
         <router-link class="nav__link" :to="{name: 'User', params: {slug: getLogin}}">
           <i class="el-icon-user"></i>{{getLogin}}
         </router-link>
        </el-menu-item>
    </el-menu>
      <el-menu v-else :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="Home">
         <router-link class="nav__link" to="/"><i class="el-icon-s-home"></i>Home</router-link>
        </el-menu-item>
        <el-menu-item index="Login">
          <router-link class="nav__link" :to="{name: 'Login'}">Sign In</router-link>
        </el-menu-item>
        <el-menu-item index="Signup">
          <router-link class="nav__link" to="/signup">Sign Up</router-link>
          </el-menu-item> 
      </el-menu>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topbar',
    updated() {
    console.log(this.$router.history.current);
  },
  computed: {
    ...mapGetters('auth', ['getLogin', 'getIsLoggedIn']),
    activeIndex() {
      console.log(this.$router.history.current.name)
      return this.$router.history.current.name
    }
  }
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav__brand {
  color: #409EFF;
  text-decoration: none;
}
.nav__link {
  text-decoration: none;
}

</style>
