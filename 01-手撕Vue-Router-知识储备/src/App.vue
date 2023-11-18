<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<!--
1.Vue-Router本质
根据"不同的hash值"或者"不同的路径地址", 将不同的内容渲染到router-view中
所以实现VueRouter的核心关键点就在于如何监听'hash'或'路径'的变化, 再将不同的内容写到router-view中
-->
<style>
</style>
