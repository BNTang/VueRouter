<template>
  <div class="about">
    <h1>我是About</h1>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {}
  },
  mounted() {
    console.log("About", this.$router);
    console.log("About", this.$route);
  }
}
</script>
