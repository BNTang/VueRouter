<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    |
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import Home from './views/Home'
import About from './views/About'

export default {
  name: 'App',
  components: {
    Home,
    About
  },
  data() {
    return {}
  },
  mounted() {
    console.log("App", this.$router);
    console.log("App", this.$route);
  }
}
</script>
<style>
</style>
