<template>
    <div class="vueAnkaCropper">
        <div class="ankaCropper" :class="[opts.skin]">
           <input type="file" class="ankaCropper__fileInput" ref="fileInput" v-show="false" @change="selectFile"/>
            <div v-if="!file" class="ankaCropper__droparea" @drop.prevent="dropFile" @dragover.prevent>
                <div>{{opts.dropareaMessage}}</div>
                <button class="ankaCropper__selectButton" @click="triggerInput">{{opts.selectButtonLabel}}</button>
            </div>
            <div v-if="file" class="ankaCropper__navigation">
                <a href="#" @click.prevent="triggerInput" title="Upload a new image">
                   <img :src="require('../assets/feather/' + opts.skin + '/upload.svg')" alt="upload icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent title="Rotate clockwise">
                   <img :src="require('../assets/feather/' + opts.skin + '/rotate-cw.svg')" alt="rotate clockwise icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent title="Flip horizontally">
                   <img :src="require('../assets/feather/' + opts.skin + '/flip-horizontal.svg')" alt="flip horizontal icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent title="Flip vertically">
                   <img :src="require('../assets/feather/' + opts.skin + '/flip-vertical.svg')" alt="flip vertical icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent="file = false" title="Cancel">
                   <img :src="require('../assets/feather/' + opts.skin + '/x-circle.svg')" alt="cancel icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent title="Save">
                   <img :src="require('../assets/feather/' + opts.skin + '/save.svg')" alt="save icon" width="16" height="16"/>
                </a>
            </div>
            <div v-if="file" class="ankaCropper__mainArea">
                <div :style="{background: '#40496f', width: cropperWidth + 'px', height: cropperHeight + 'px', float: 'left'}">
                    <canvas
                        ref="canvas"
                        :width="canvasWidth"
                        :height="canvasHeight"
                        style="background: #ccc;"></canvas>
                </div>
                <div :style="{background: '#d14423', width: previewWidth + 'px', height: cropperHeight + 'px', float: 'left'}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ankaCropper',
    data () {
        return {
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
            canvas: false,
            ctx: false,
            defaultOptions: {
                aspectRatio: 0.5, // false or number, always width / height, locks aspect ratio of cropper. It should equal to croppedWidth / croppedHeight (if they're not false), otherwise cropped image will be distorted,
                cropArea: 'box', // box or circle for round selections. If circle, aspect ratio will be locked to 1
                croppedHeight: false, // desired height of cropped image (or false)
                croppedWidth: false, // desired width of cropped image (or false). If aspectRatio is not false, cropped width and height should match the aspect ratio (width / height), otherwise cropped image will be distorted
                cropperHeight: false,
                dropareaMessage: 'Drop file here or use the button below.',
                frameLineDash: [5,3], // dash pattern of the dashed line of the cropping frame
                frameStrokeColor: 'rgba(255, 255, 255, 0.8)', // main color of the stroke of the cropping frame
                handleFillColor: 'rgba(255, 255, 255, 0.2)',
                handleHoverFillColor: 'red',
                handleHoverStrokeColor: 'blue',
                handleSize: 10, // size of the dragging handle in cropper
                handleStrokeColor: 'rgba(255, 255, 255, 0.8)',
                layoutBreakpoint: 950,
                maxCropperHeight: 600,
                maxFileSize: 8000000,
                overlayFill: 'rgba(0, 0, 0, 0.5)', // fill of the masking overlay
                selectButtonLabel: 'Select Files',
                skin: 'dark'
            },
            fullWidth: 500, // width of whole ui
            file: false,
            h: 100,
            image: false,
            imageWidth: 0,
            imageHeight: 0,
            loadingImage: false,
            rotation: 0,
            w: 100,
            x: 20,
            y: 20
        }
    },
    props: {
        options: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        canvasHeight () {
            if (this.imageRatio <= this.cropperRatio) { return this.cropperHeight }
            return Math.round(this.cropperWidth / this.imageRatio)
        },
        canvasWidth () {
            if (this.imageRatio >= this.cropperRatio) { return this.cropperWidth }
            return Math.round(this.imageRatio * this.canvasHeight)
        },
        cropperHeight () {
            if (this.opts.cropperHeight && this.fullWidth > this.opts.layoutBreakpoint) { return this.opts.cropperHeight - 80 }
            let calculatedHeight = Math.floor(this.cropperWidth / this.imageRatio)
            let maxHeight = this.opts.maxCropperHeight
            if (maxHeight && maxHeight > 100 && maxHeight < calculatedHeight) { return maxHeight - 80 }
            return calculatedHeight
        },
        cropperRatio () {
            return Math.round((this.cropperWidth / this.cropperHeight) * 1000) / 1000
        },
        cropperWidth () {
            let mw = this.fullWidth - 24
            if (this.fullWidth <= this.opts.layoutBreakpoint) return mw
            return Math.floor(0.65 * mw)
        },
        imageRatio () {
            if (!this.imageHeight) return 0
            return Math.round((this.imageWidth / this.imageHeight) * 1000) / 1000
        },
        markers () {
            return {
                nw: {x: this.x - this.opts.handleSize, y: this.y - this.opts.handleSize},
                ne: {x: this.x + this.w - this.opts.handleSize, y: this.y - this.opts.handleSize},
                sw: {x: this.x - this.opts.handleSize, y: this.y + this.h - this.opts.handleSize},
                se: {x: this.x + this.w - this.opts.handleSize, y: this.y + this.h - this.opts.handleSize}
            }
        },
        opts () {
            let opts = Object.assign({}, this.defaultOptions, this.options)
            if (opts.cropArea === 'circle') opts.aspectRatio = 1
            return opts
        },
        previewWidth () {
            let mw = this.fullWidth - 24
            if (this.fullWidth <= this.opts.layoutBreakpoint) return mw
            return Math.floor(0.35 * mw)
        }
    },
    mounted () {
        this.getFullWidth()
        window.addEventListener('resize', this.getFullWidth)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.getFullWidth)
    },
    methods: {
        drawCanvas () {
            if (!this.ctx) { return }
            this.drawImageOnCanvas()
            this.drawOverlay()
            this.drawMarkers(0, 0)
        },
        drawImageOnCanvas () {
            if (!this.image) { return }
            this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
        },
        drawMarkers (mouseX, mouseY) {
            let ctx = this.ctx
            this.canvas.style.cursor = 'default'
            // draw selection border
            ctx.beginPath()
            if (this.opts.cropArea !== 'circle') {
                ctx.rect(this.x, this.y, this.w, this.h)
            } else {
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI)
            }
            if (ctx.isPointInPath(mouseX, mouseY)) {
                this.canvas.style.cursor = 'move'
            }
            ctx.setLineDash(this.opts.frameLineDash)
            ctx.strokeStyle = this.opts.frameStrokeColor
            ctx.stroke()
            // clear dash
            ctx.setLineDash([])
            // draw markers
            for (let p in this.markers) {
                let marker = this.markers[p]
                ctx.beginPath()
                ctx.rect(marker.x, marker.y, this.opts.handleSize * 2, this.opts.handleSize * 2)
                ctx.fillStyle = this.opts.handleFillColor
                ctx.strokeStyle = this.opts.handleStrokeColor
                if (ctx.isPointInPath(mouseX, mouseY)) {
                    ctx.fillStyle = this.opts.handleHoverFillColor
                    ctx.strokeStyle = this.opts.handleHoverStrokeColor
                    this.canvas.style.cursor = p + '-resize'
                }
                ctx.fill()
                ctx.stroke()
            }
        },
        drawOverlay () {
            let ctx = this.ctx
            ctx.fillStyle = this.opts.overlayFill
            ctx.fillRect(0, 0, this.canvasWidth, this.y)
            ctx.fillRect(0, this.y, this.x, this.h)
            ctx.fillRect(this.x + this.w, this.y, this.canvasWidth - (this.x + this.w), this.h)
            ctx.fillRect(0, this.y + this.h, this.canvasWidth, this.canvasHeight - (this.y + this.h))
            if (this.opts.cropArea === 'circle') {
                ctx.beginPath()
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, Math.PI, 1.5 * Math.PI)
                ctx.lineTo(this.x, this.y)
                ctx.closePath()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 1.5 * Math.PI, 2 * Math.PI)
                ctx.lineTo(this.x + this.w, this.y)
                ctx.closePath()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 0.5 * Math.PI)
                ctx.lineTo(this.x + this.w, this.y + this.h)
                ctx.closePath()
                ctx.fill()
                ctx.beginPath()
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0.5 * Math.PI, Math.PI)
                ctx.lineTo(this.x, this.y + this.h)
                ctx.closePath()
                ctx.fill()
            }
        },
        dropFile (evt) {
            let file = evt.dataTransfer.files[0]
            this.useFile(file)
        },
        getFullWidth () {
            let elSize = this.$el.getBoundingClientRect()
            this.fullWidth = elSize.width
            this.$nextTick(this.drawCanvas)
        },
        humanFileSize: function (bytes, si) {
            if (si === undefined) si = true
            var thresh = si ? 1000 : 1024
            if (Math.abs(bytes) < thresh) {
                return bytes + ' B'
            }
            var units = si
                ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
            var u = -1
            do {
                bytes /= thresh
                ++u
            } while (Math.abs(bytes) >= thresh && u < units.length - 1)
            return bytes.toFixed(1) + ' ' + units[u]
        },
        selectFile (evt) {
            let file = evt.currentTarget.files[0]
            this.useFile(file)
        },
        startCanvas () {
            if (this.image) {
                this.canvas = this.$refs.canvas
                this.ctx = this.canvas.getContext('2d')
                let [ir, ar] = [this.imageRatio, this.opts.aspectRatio]
                if (ar >= ir) {
                    this.w = Math.round(this.canvasWidth / 2)
                    this.h = Math.round(this.w / ar)
                } else {
                    this.h = Math.round(this.canvasHeight / 2)
                    console.log('calcuc ', this.canvasHeight, this.h, ar)
                    this.w = Math.round(this.h * ar)
                }
                this.x = Math.round((this.canvasWidth - this.w) / 2)
                this.y = Math.round((this.canvasHeight - this.h) / 2)
                this.drawCanvas()
            } else {
                this.canvas = false
                this.ctx = false
            }
        },
        triggerInput () {
            let input = this.$refs.fileInput
            input.click()
        },
        useFile (file) {
            if (this.allowedMimeTypes.indexOf(file.type) === -1) {
                this.$emit('cropper-error', 'Wrong file type: ' + file.type)
                return
            }
            if (this.opts.maxFileSize && file.size > this.opts.maxFileSize) {
                let fileSize = this.humanFileSize(file.size)
                this.$emit('cropper-error', 'File too large (' + fileSize + ')! Max file size is ' + this.humanFileSize(this.opts.maxFileSize))
                return
            }
            this.file = file
            this.$emit('file-selected', file)
        }
    },
    watch: {
        file (nf) {
            this.rotation = 0
            let reader = new FileReader()
            reader.onload = (evt) => {
                let img = new Image()
                img.onload = () => {
                    this.imageWidth = img.width
                    this.imageHeight = img.height
                    this.image = img
                    this.loadingImage = false
                    this.$nextTick(this.startCanvas)
                }
                img.onerror = (error) => {
                    this.loadingImage = false
                    this.imageWidth = 0
                    this.imageHeight = 0
                    this.image = false
                    this.file = false
                    this.$emit('cropper-error', 'Image reading error' + error)
                }
                img.src = evt.target.result
            }
            reader.onerror = (error) => {
                this.file = false
                this.$emit('cropper-error', 'File reading error' + error)
            }
            if (nf) {
                reader.readAsDataURL(this.file)
            } else {
                this.imageWidth = 0
                this.imageHeight = 0
                this.image = false
            }
        }
    }
}
</script>
<style lang="scss">
    .ankaCropper {
        background: #e3eaf0;
        border-radius: 3px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.3);
        position: relative;
        overflow: hidden;
    }

    .ankaCropper__droparea {
        text-align: center;
        margin: 2em;
        padding: 2em;
    }

    .ankaCropper__selectButton {
        border: none;
        padding: 10px 20px;
        margin: 10px;
        border-radius: 3px;
    }

    .ankaCropper__navigation {
        padding: 12px;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
        a {
            display: inline-block;
            padding: 8px;
            width: 16px; height: 16px;
            margin-right: 10px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 1px 1px 2px rgba(0, 0, 0, 0.25);
        }
    }

    .ankaCropper__mainArea {
        margin: 20px 12px;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }

    /***************************/
    /*        SKINS            */
    /***************************/
    .ankaCropper.light {
        background: #e3eaf0;
        color: #0f1114;
        .ankaCropper__droparea {
            border: dashed 2px #367bb7;
        }
        .ankaCropper__selectButton {
            background: #1c6bd6;
            color: #fff;
        }
        .ankaCropper__navigation {
            background: #e8f2fa;
            a:hover {
                background: #fff;
            }
        }
    }
    .ankaCropper.dark {
        background: #0f1114;
        color: #eee;
        .ankaCropper__droparea {
            border: dashed 2px #3e424b;
        }
        .ankaCropper__selectButton {
            background: #334f90;
            color: #fff;
        }
        .ankaCropper__navigation {
            background: #1d2227;
            a {background: #272c31;}
            a:hover {
                background: #000;
            }
        }
    }

</style>
