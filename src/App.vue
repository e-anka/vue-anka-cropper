<template>
  <div id="app">
    <h1>Vue Anka Image Cropper and (optionally) Uploader</h1>
    <div style="text-align: center">
        <a href="https://github.com/e-anka/vue-anka-cropper" target="_blank">View on Github</a>
    </div>
    <div class="row">
        <div class="options">
            <h2>Options</h2>
            <div class="form-group">
                <input type="checkbox" id="useAr" v-model="useAr">
                <label for="aspectRatio">Aspect ratio {{aspectRatio}}</label>
                <input type="range" id="aspectRatio" v-model.number="ar" max="5" min="0.2" step="0.01">
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
                <label for="selectButtonLabel">Select button label</label>
                <input type="text" id="selectButtonLabel" v-model="selectButtonLabel" >
            </div>
            <div class="form-group">
                <label for="frameLineDash">Frame line dash</label>
                <input type="text" id="frameLineDash" v-model="dash" @keydown.enter.188.108="addDash">
                <span class="chip" v-for="(d, i) in frameLineDash" @click.prevent="removeDash(i)" title="Click to remove" :key="i + 'chip'">{{d}}</span>
                <p>Use input to add numbers. Click on a number to remove it. This controles dashing style of the cropping frame.</p>
            </div>
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
                <label for="overlayFill">Overlay fill</label>
                <input type="text" id="overlayFill" v-model="overlayFill" >
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
                <label for="maxCropperHeight">Max cropper height {{maxCropperHeight}}</label>
                <input type="range" id="maxCropperHeight" v-model.number="maxCropperHeight" max="2000" min="200" step="1">
            </div>
            <div class="form-group">
                <input type="checkbox" id="previewOnDrag" v-model="previewOnDrag">
                <label for="previewOnDrag">Preview on drag</label>
            </div>
            <div class="form-group">
                <input type="checkbox" id="showPreview" v-model="showPreview">
                <label for="showPreview">Show Preview</label>
            </div>
            <div class="form-group">
                <label for="skin">Skin</label>
                <select id="skin" v-model="skin">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <h3>Disabled</h3>
            <p>Options below are disabled, because there's no way to use them on github, but you can use them in your code</p>
            <div class="form-group">
                <label for="maxFileSize">Max file size (in bytes)</label>
                <input type="text" id="maxFileSize" v-model="maxFileSize" disabled>
            </div>
            <div class="form-group">
                <label for="previewQuality">Preview quality</label>
                <input type="text" id="previewQuality" v-model="previewQuality" disabled>
            </div>
            <div class="form-group">
                <label for="resultQuality">Result quality</label>
                <input type="text" id="resultQuality" v-model="resultQuality" disabled>
            </div>
            <div class="form-group">
                <label for="resultMimeType">Result mime type</label>
                <input type="text" id="resultMimeType" v-model="resultMimeType" disabled>
            </div>
            <div class="form-group">
                <label for="uploadTo">Upload to</label>
                <input type="text" id="uploadTo" v-model="upl" disabled>
            </div>
            <div class="form-group">
                <span>Upload data</span>
                <p>An object, holding any data you'd like to upload together with cropped image.</p>
            </div>
        </div>
        <div class="cropper">
            <h2>Cropper</h2>
            <vue-anka-cropper
                :options="options"
                @cropper-mounted="debug($event, 'cropper-mounted')"
                @cropper-error="debug($event, 'cropper-error')"
                @cropper-file-selected="debug($event, 'cropper-file-selected')"
                @cropper-preview="debug($event, 'cropper-preview')"
                @cropper-saved="debug($event, 'cropper-saved')"
                @cropper-cancelled="debug($event, 'cropper-cancelled')"
                @cropper-uploaded="debug($event, 'cropper-uploaded')"
                @cropper-before-destroy="debug($event, 'cropper-before-destroy')"
                ></vue-anka-cropper>
        </div>
        <div class="events"><h2>Events <a href="#" @click.prevent="events = []" style="font-size: 1rem;">Clear</a></h2>
            <div v-for="(e, i) in events" :key="i" :style="{opacity: i ? 0.5 : 1}">
                <h3 class="h5">{{e.name}}</h3>
                <div v-html="printEv(e)"></div>
            </div>
        </div>
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
            maxFileSize: 4000000, // 8MB
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
            dash: '',
            upl: '/api/upload-file.php',
            useAr: true,
            ar: 1,
            events: []
        }
    },
    computed: {
        options () {
            return {aspectRatio: this.aspectRatio, closeOnSave: this.closeOnSave, cropArea: this.cropArea, croppedHeight: this.croppedHeight, croppedWidth: this.croppedWidth, cropperHeight: this.cropperHeight, dropareaMessage: this.dropareaMessage, frameLineDash: this.frameLineDash, frameStrokeColor: this.frameStrokeColor, handleFillColor: this.handleFillColor, handleHoverFillColor: this.handleHoverFillColor, handleHoverStrokeColor: this.handleHoverStrokeColor, handleSize: this.handleSize, handleStrokeColor: this.handleStrokeColor, layoutBreakpoint: this.layoutBreakpoint, maxCropperHeight: this.maxCropperHeight, maxFileSize: this.maxFileSize, overlayFill: this.overlayFill, previewOnDrag: this.previewOnDrag, previewQuality: this.previewQuality, resultQuality: this.resultQuality, resultMimeType: this.resultMimeType, selectButtonLabel: this.selectButtonLabel, showPreview: this.showPreview, skin: this.skin, uploadData: this.uploadData, uploadTo: this.uploadTo}
        },
        cropperHeight () {
            return this.useCropperH ? this.cropperH : false;
        },
        aspectRatio () {
            return this.useAr ? this.ar : false;
        }
    },
    methods: {
        debug (ev, name) {
            this.events.unshift({name: name, payload: ev})
            if (this.events.lenght > 10) { this.events.pop() }
        },
        printEv (e) {
            if (e.payload === undefined) return 'No payload'
            if (e.name === 'cropper-preview') { return 'Image data URI<br/><img src="' + e.payload + '" alt="" style="max-width: 100px;"/>' }
            if (e.name === 'cropper-error') { return e.payload }
            if (e.name === 'cropper-file-selected') { return 'Payload: selected file' }
            if (e.name === 'cropper-saved') {
                let d = e.payload
                let output = '<div><strong>cropCoords</strong><br/>'
                for (let p in d.cropCoords) {
                    output += p + ': ' + d.cropCoords[p] + '<br/>'
                }
                output += '</div>'
                output += '<div><strong>croppedFile</strong><br/>Blob</div>'
                output += '<div><strong>croppedImageURI</strong><br/><img src="' + d.croppedImageURI + '" alt="" style="max-width: 100px;"/></div>'
                output += '<div><strong>filename</strong><br/>' + d.filename + '</div>'
                output += '<div><strong>flippedH</strong><br/>' + d.flippedH + '</div>'
                output += '<div><strong>flippedV</strong><br/>' + d.flippedV + '</div>'
                output += '<div><strong>originalFile</strong><br/>File</div>'
                output += '<div><strong>rotation</strong><br/>' + d.rotation + '</div>'
                return output
            }
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
    a {
        color: #0cf;
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
            width: 20%;
        }
        .cropper {
            width: 60%;
        }
        .events {
            width: 20%;
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
