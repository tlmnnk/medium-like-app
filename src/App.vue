<template>
  <div id="app">
    <div class="container">
      <Topbar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Topbar from './components/Topbar'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Topbar
  },
  methods: {
    ...mapActions('auth', ['getCurrentUser'])
  },
  mounted() {
    console.log('hello app');
    this.getCurrentUser()
  }
}
</script>

<style>
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
  max-width: 920px;
}
</style>
