<template>
  <div id="app">
      <Topbar />
      <router-view/>
  </div>
</template>

<script>
import Topbar from './components/Topbar'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Topbar,
  },
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  mounted() {
    this.getCurrentUser()
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1140px;
}
</style>
