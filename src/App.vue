<template>
  <div id="app">
    <!-- <img src="./assets/melkmeisje.jpg" alt=""/> -->
    <h1>Anka Image Cropper and (optionally) Uploader</h1>
    <AnkaCropper
        :options="{aspectRatio: ar, cropArea: 'circle', croppedWidth: desiredWidth, croppedHeight: desiredHeight, showPreview: true, uploadTo: '/api/upload.php', uploadData: {userId: 2048}}"
        @cropper-error="debug"
        @cropper-file-selected="debug"
        @cropper-preview="debug"
        @cropper-saved="debug"
        @cropper-cancelled="debug"
        @cropper-uploaded="debug"
        ></AnkaCropper>
     <div><label for="">Aspect ratio</label><input type="text" v-model.number="ar"></div>
     <div><label for="">Desired Width</label><input type="text" v-model.number="desiredWidth"></div>
     <div><label for="">Desired Height</label><input type="text" v-model.number="desiredHeight"></div>
  </div>
</template>

<script>
import AnkaCropper from './components/AnkaCropper.vue'

export default {
    name: 'app',
    data () {
        return {
            ar: 1,
            desiredWidth: 200,
            desiredHeight: 200
        }
    },
    methods: {
        debug (ev) {
            console.log('***********************')
            console.log('DEBUG:')
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
