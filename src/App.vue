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

export default {
  name: 'App',
  components: {
    Topbar
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
