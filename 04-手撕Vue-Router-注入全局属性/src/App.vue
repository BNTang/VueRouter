<template>
  <div id="app">
    <!--
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
    -->
    <!--<a href="#/home">首页</a>
    <a href="#/about">关于</a>
    -->
    <Home></Home>
    <About></About>
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
    mounted() {
      console.log('App', this.$router);
      console.log('App', this.$route);
    }
  }
</script>
<!--
1.Vue-Router本质
根据"不同的hash值"或者"不同的路径地址", 将不同的内容渲染到router-view中
所以实现VueRouter的核心关键点就在于如何监听'hash'或'路径'的变化, 再将不同的内容写到router-view中
-->
<style>
</style>
