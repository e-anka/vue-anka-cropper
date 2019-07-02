<template>
  <div id="app">
    <h1>Anka Image Cropper and (optionally) Uploader</h1>
    <div style="margin-right: 400px">
        <vue-anka-cropper
            :options="{aspectRatio: ar, cropArea: 'box', croppedWidth: desiredWidth, croppedHeight: desiredHeight, showPreview: true, uploadTo: '/api/upload.php', uploadData: {userId: 2048}}"
            @cropper-error="debug"
            @cropper-file-selected="debug"
            @cropper-preview="debug"
            @cropper-saved="debug"
            @cropper-cancelled="debug"
            @cropper-uploaded="debug"
            ></vue-anka-cropper>
    </div>
     <div><label for="">Aspect ratio</label><input type="text" v-model.number="ar"></div>
     <div><label for="">Desired Width</label><input type="text" v-model.number="desiredWidth"></div>
     <div><label for="">Desired Height</label><input type="text" v-model.number="desiredHeight"></div>
  </div>
</template>

<script>
import VueAnkaCropper from './components/VueAnkaCropper.vue'
// import VueAnkaCropper from '../dist/VueAnkaCropper.umd.js' // test if it works
export default {
    name: 'app',
    data () {
        return {
            ar: 1,
            desiredWidth: 200,
            desiredHeight: 200,
            result: ''
        }
    },
    methods: {
        debug (ev) {
            this.result = ev
            // console.log('***********************')
            // console.log('DEBUG:')
            // console.log(ev)
            // console.log('***********************')
        }
    },
    components: {VueAnkaCropper}
}
</script>

<style lang="scss">
@import '../dist/VueAnkaCropper.css';
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
