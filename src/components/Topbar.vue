<template>
<div class="container">
 <nav class="nav">
    <router-link class="nav__brand" :to="{name: 'globalFeed'}"><h1>Medium-like-app</h1></router-link>
    <div v-if="getIsLoggedIn">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="globalFeed">
         <router-link class="nav__link" to="/"><i class="el-icon-s-home"></i>Home</router-link>
        </el-menu-item>
        <el-menu-item index="createArticle">
          <router-link class="nav__link" :to="{name: 'createArticle'}"><i class="el-icon-edit"></i>New Article</router-link>
        </el-menu-item>
        <el-menu-item index="Settings">
          <router-link class="nav__link" to="/settings"><i class="el-icon-setting"></i>Settings</router-link>
         </el-menu-item>
        <el-menu-item index="UserProfile">
         <router-link class="nav__link" :to="{name: 'UserProfile', params: {slug: getLogin}}">
           <i class="el-icon-user"></i>{{getLogin}}
         </router-link>
        </el-menu-item>
    </el-menu>
    </div>
    <div v-else>
      <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-menu-item index="globalFeed">
         <router-link class="nav__link" to="/"><i class="el-icon-s-home"></i>Home</router-link>
        </el-menu-item>
        <el-menu-item index="Login">
          <router-link class="nav__link" :to="{name: 'Login'}">Sign In</router-link>
        </el-menu-item>
        <el-menu-item index="Signup">
          <router-link class="nav__link" to="/signup">Sign Up</router-link>
          </el-menu-item> 
      </el-menu>
    </div>
  </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topbar',
  computed: {
    ...mapGetters('auth', ['getLogin', 'getIsLoggedIn', 'isLoading']),
    activeIndex() {
      if (this.$router.history.current.name === 'yourFeed') {
        return 'globalFeed'
      }
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
.nav .el-menu-item {
  padding: 0;
}
.nav__brand {
  color: #409EFF;
  text-decoration: none;
}
.nav__link {
  padding: 0 20px;
  display: inline-block;
  height: 100%;
  width: 100%;
  text-align: left;
  text-decoration: none;
}

</style>
