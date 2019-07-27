<template>
  <div id="app">
    <h1>Vue Anka Image Cropper and (optionally) Uploader</h1>
    <div class="row">
        <div class="options">
            <h2>Options</h2>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="aspectRatio">Aspect ratio {{aspectRatio}}</label>
                        <input type="range" id="aspectRatio" v-model.number="aspectRatio" max="5" min="-5" step="0.01">
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="closeOnSave" v-model="closeOnSave">
                        <label for="closeOnSave">Close on save</label>
                    </div>
                    <div class="form-group">
                        <label for="cropArea">Crop area</label>
                        <select id="cropArea" v-model="cropArea">
                            <option value="box">box</option>
                            <option value="circle">circle</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="croppedHeight">Cropped height {{croppedHeight}}</label>
                        <input type="range" id="croppedHeight" v-model.number="croppedHeight" max="800" min="40" step="1">
                    </div>
                    <div class="form-group">
                        <label for="croppedWidth">Cropped width {{croppedWidth}}</label>
                        <input type="range" id="croppedWidth" v-model.number="croppedWidth" max="800" min="40" step="1">
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="useCropperH" v-model="useCropperH">
                        <label for="cropperH">Cropper height {{cropperH}}</label>
                        <input type="range" id="croppedHeight" v-model.number="cropperH" max="1000" min="200" step="1">
                    </div>
                    <div class="form-group">
                        <label for="dropareaMessage">Drop area message</label>
                        <input type="text" id="dropareaMessage" v-model="dropareaMessage" >
                    </div>
                    <div class="form-group">
                        <label for="frameLineDash">Frame line dash</label>
                        <input type="text" id="frameLineDash" v-model="dash" @keydown.enter.188.108="addDash">
                        <span class="chip" v-for="(d, i) in frameLineDash" @click.prevent="removeDash(i)" title="Click to remove" :key="i + 'chip'">{{d}}</span>
                        <p>Use input to add numbers. Click on a number to remove it. This controles dashing style of the cropping frame.</p>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="frameStrokeColor">Frame stroke color</label>
                        <input type="text" id="frameStrokeColor" v-model="frameStrokeColor" >
                    </div>
                               <div class="form-group">
                        <label for="handleFillColor">Handle fill color</label>
                        <input type="text" id="handleFillColor" v-model="handleFillColor" >
                    </div>
                    <div class="form-group">
                        <label for="handleHoverFillColor">Handle hover fill color</label>
                        <input type="text" id="handleHoverFillColor" v-model="handleHoverFillColor" >
                    </div>
                    <div class="form-group">
                        <label for="handleHoverStrokeColor">Handle hover stroke color</label>
                        <input type="text" id="handleHoverStrokeColor" v-model="handleHoverStrokeColor" >
                    </div>
                    <div class="form-group">
                        <label for="handleStrokeColor">Handle stroke color</label>
                        <input type="text" id="handleStrokeColor" v-model="handleStrokeColor" >
                    </div>
                    <div class="form-group">
                        <label for="handleSize">Handle size {{handleSize}}</label>
                        <input type="range" id="handleSize" v-model.number="handleSize" max="50" min="4" step="1">
                    </div>
                    <div class="form-group">
                        <label for="layoutBreakpoint">Layout breakpoint {{layoutBreakpoint}}</label>
                        <input type="range" id="layoutBreakpoint" v-model.number="layoutBreakpoint" max="1000" min="400" step="1">
                    </div>
                    <div class="form-group">
                        <label for="maxCropperHeight">Max Cropper Height {{maxCropperHeight}}</label>
                        <input type="range" id="maxCropperHeight" v-model.number="maxCropperHeight" max="2000" min="200" step="1">
                    </div>
                </div>
            </div>
        </div>
        <div class="cropper">
            <h2>Cropper</h2>
            <vue-anka-cropper
                :options="options"
                @cropper-mounted="debug"
                @cropper-error="debug"
                @cropper-file-selected="debug"
                @cropper-preview="debug"
                @cropper-saved="debug"
                @cropper-cancelled="debug"
                @cropper-uploaded="debug"
                @cropper-before-destroy="debug"
                ></vue-anka-cropper>
        </div>
        <div class="events"><h2>Events</h2></div>
    </div>
  </div>
</template>

<script>
// import VueAnkaCropper from './components/VueAnkaCropper.vue'
import VueAnkaCropper from '../dist/VueAnkaCropper.umd.js' // test if it works
export default {
    name: 'app',
    data () {
        return {
            // options
            aspectRatio: 1,
            closeOnSave: true,
            cropArea: 'box',
            croppedHeight: 400,
            croppedWidth: 400,
            dropareaMessage: 'Drop file here or use the button below.',
            frameLineDash: [5,3],
            frameStrokeColor: 'rgba(255, 255, 255, 0.8)',
            handleFillColor: 'rgba(255, 255, 255, 0.2)',
            handleHoverFillColor: 'rgba(255, 255, 255, 0.4)',
            handleHoverStrokeColor: 'rgba(255, 255, 255, 1)',
            handleSize: 10,
            handleStrokeColor: 'rgba(255, 255, 255, 0.8)',
            layoutBreakpoint: 850,
            maxCropperHeight: 768,
            maxFileSize: 8000000, // 8MB
            overlayFill: 'rgba(0, 0, 0, 0.5)',
            previewOnDrag: true,
            previewQuality: 0.65,
            resultQuality: 0.8,
            resultMimeType: 'image/jpeg',
            selectButtonLabel: 'Select File',
            showPreview: true,
            skin: 'light',
            uploadData: {},
            uploadTo: false,
            // demo, internal
            cropperH: 500,
            useCropperH: false,
            dash: ''
        }
    },
    computed: {
        options () {
            return {aspectRatio: this.aspectRatio, closeOnSave: this.closeOnSave, cropArea: this.cropArea, croppedHeight: this.croppedHeight, croppedWidth: this.croppedWidth, cropperHeight: this.cropperHeight, dropareaMessage: this.dropareaMessage, frameLineDash: this.frameLineDash, frameStrokeColor: this.frameStrokeColor, handleFillColor: this.handleFillColor, handleHoverFillColor: this.handleHoverFillColor, handleHoverStrokeColor: this.handleHoverStrokeColor, handleSize: this.handleSize, handleStrokeColor: this.handleStrokeColor, layoutBreakpoint: this.layoutBreakpoint, maxCropperHeight: this.maxCropperHeight, maxFileSize: this.maxFileSize, overlayFill: this.overlayFill, previewOnDrag: this.previewOnDrag, previewQuality: this.previewQuality, resultQuality: this.resultQuality, resultMimeType: this.resultMimeType, selectButtonLabel: this.selectButtonLabel, showPreview: this.showPreview, skin: this.skin, uploadData: this.uploadData, uploadTo: this.uploadTo}
        },
        cropperHeight () {
            return this.useCropperH ? this.cropperH : false;
        }
    },
    methods: {
        debug (ev) {
            this.result = ev
            // console.log('***********************')
            // console.log('DEBUG:')
            // console.log(ev)
            // console.log('***********************')
        },
        addDash (ev) {
            let num = parseInt(ev.target.value.trim())
            if (!isNaN(num)) {
                this.frameLineDash.push(num)
            }
            this.dash = ''
        },
        removeDash (i) {
            this.frameLineDash.splice(i, 1)
        }
    },
    components: {VueAnkaCropper}
}
</script>

<style lang="scss">
@import '../dist/VueAnkaCropper.css';
body {
    background: #111;
    color: #eee;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
h1 {text-align: center;}

    .options, .cropper, .events {
        padding: 2em 0;
    }

    @media (min-width: 600px) {
        .options, .cropper, .events {
            float: left;
            padding: 2em;
            box-sizing: border-box;
        }
        .options {
            width: 30%;
        }
        .cropper {
            width: 70%;
        }
        .events {
            width: 70%;
        }
    }

    @media (min-width: 1260px) {
        .options {
            width: 40%;
            .col {
                position: relative;
                width: 40%;
                float: right;
                &:first-child {
                    float: left;
                }
            }
        }
        .cropper {
            width: 60%;
        }
        .events {
            width: 60%;
        }
    }

    .form-group {
        padding: 5px 0;
        margin-bottom: 10px;
    }

    input, select, label {
        width: 100%;
        display: block;
        margin-bottom: 5px;
    }

    input[type="checkbox"] {
        width: auto;
        margin-right: 10px;
        float: left;
    }

    input, select {
        box-sizing: border-box;
        border: none;
        padding: 6px 12px;
        border-radius: 3px;
    }

    .chip {
        display: inline-block;
        background: #234e72;
        padding: 5px 10px;
        margin: 0 10px 10px 0;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background: #6f1414;
        }
    }
</style>
