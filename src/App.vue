<template>
  <div id="app">
    <!-- <img src="./assets/melkmeisje.jpg" alt=""/> -->
    <h1>Anka Image Cropper and (optionally) Uploader</h1>
    <AnkaCropper
        :options="{}"
        @cropper-error="debug"
        @file-selected="debug"
        ></AnkaCropper>
  </div>
</template>

<script>
import AnkaCropper from './components/AnkaCropper.vue'

export default {
    name: 'app',
    methods: {
        debug (ev) {
            console.log('***********************')
            console.log(ev)
            console.log('***********************')
        }
    },
    components: {AnkaCropper}
}
</script>

<style>
body {
    background: #000;
    color: #eee;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
