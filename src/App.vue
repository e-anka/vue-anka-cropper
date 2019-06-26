<template>
  <div id="app">
    <h1>Anka Image Cropper and (optionally) Uploader</h1>
    <AnkaCropper :options="{skin: 'dark'}"></AnkaCropper>
  </div>
</template>

<script>
import AnkaCropper from './components/AnkaCropper.vue'

export default {
  name: 'app',
  components: {AnkaCropper}
}
</script>

<style>
body {
    background: #131314;
    color: #eee;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
