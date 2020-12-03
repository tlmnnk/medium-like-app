<template>
  <nav class="nav">
    <router-link class="nav__brand" to="{name: '/home'}"><h1>Medium-like-app</h1></router-link>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">New Article</el-menu-item>
      <el-menu-item index="3">Settings</el-menu-item>
      <el-menu-item index="4">userEmail</el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Topbar',
  data: () => ({
    activeIndex: '1'
  }),
  computed: {
    ...mapGetters('auth', ['getLogin'])
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

</style>
