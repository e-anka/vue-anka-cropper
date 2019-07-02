<template>
    <div class="vueAnkaCropper">
        <div class="ankaCropper" :class="[opts.skin]">
           <div class="ankaCropper__navigation" v-if="file">
                <a href="#" @click.prevent="triggerInput" title="Upload a new image" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </a>
                <a href="#" @click.prevent="rotate(-90)" title="Rotate counterclockwise" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-ccw"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                </a>
                <a href="#" @click.prevent="rotate(90)" title="Rotate clockwise" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </a>
                <a href="#" @click.prevent="flip('h')" title="Flip horizontally" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path style="fill:none" d="M 9.7148438,2.8183594 1.8203125,18 c -0.7648346,1.324499 0.1796183,2.982419 1.7089844,3 h 6.1855469 z m 4.5703122,0 V 21 h 6.185547 c 1.529366,-0.01758 2.47382,-1.675501 1.708985,-3 z" id="path2"/></svg>
                </a>
                <a href="#" @click.prevent="flip('v')" title="Flip vertically" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path style="fill:none" d="M 21.090975,9.7148433 5.9093341,1.820312 c -1.324499,-0.7648346 -2.982419,0.1796183 -3,1.7089844 v 6.1855469 z m 0,4.5703127 H 2.9093341 v 6.185547 c 0.01758,1.529366 1.675501,2.47382 3,1.708985 z" id="path2"/></svg>
                </a>
                <a href="#" @click.prevent="cancelCrop" title="Cancel" class="ankaCropper__navButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0c55f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </a>
                <a href="#" @click.prevent="doCrop" title="Save" class="ankaCropper__saveButton">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save
                </a>
            </div>
           <input type="file" class="ankaCropper__fileInput" ref="fileInput" v-show="false" @change="selectFile"/>
            <div v-if="!file" class="ankaCropper__droparea" @drop.prevent="dropFile" @dragover.prevent>
                <div>{{opts.dropareaMessage}}</div>
                <button class="ankaCropper__selectButton" @click="triggerInput">{{opts.selectButtonLabel}}</button>
            </div>
            <div v-if="file" class="ankaCropper__mainArea">
                <div :style="{width: cropperWidth + 'px', height: cropperHeight + 'px', float: 'left'}">
                    <canvas
                        ref="canvas"
                        :width="canvasWidth"
                        :height="canvasHeight"
                        style="background: #ccc;"
                        @mousemove="moveMouse"
                        @mousedown="startDrag"
                        @mouseup="stopDrag"
                        @mouseleave="dragged = false"
                        ></canvas>
                </div>
                <div v-if="opts.showPreview" class="ankaCropper__previewArea" :style="{width: prevdivWidth + 'px', height: prevdivHeight + 'px', float: 'left'}">
                    <img :src="previewImage" :style="{width: previewSize.w + 'px', height: previewSize.h + 'px', borderRadius: opts.cropArea === 'circle' ? '50%' : 0}">
                </div>
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
                aspectRatio: 1, // false or number, always width / height, locks aspect ratio of cropper. It should equal to croppedWidth / croppedHeight
                closeOnSave: true,
                cropArea: 'box', // box or circle for round selections. If circle, aspect ratio will be locked to 1
                croppedHeight: 400, // desired height of cropped image (or false)
                croppedWidth: 400, // desired width of cropped image (or false)
                cropperHeight: false,
                dropareaMessage: 'Drop file here or use the button below.',
                frameLineDash: [5,3], // dash pattern of the dashed line of the cropping frame
                frameStrokeColor: 'rgba(255, 255, 255, 0.8)', // main color of the stroke of the cropping frame
                handleFillColor: 'rgba(255, 255, 255, 0.2)',
                handleHoverFillColor: 'rgba(255, 255, 255, 0.4)',
                handleHoverStrokeColor: 'rgba(255, 255, 255, 1)',
                handleSize: 10, // size of the dragging handle in cropper
                handleStrokeColor: 'rgba(255, 255, 255, 0.8)',
                layoutBreakpoint: 850,
                maxCropperHeight: 768,
                maxFileSize: 8000000, // 8MB
                overlayFill: 'rgba(0, 0, 0, 0.5)', // fill of the masking overlay
                previewOnDrag: true,
                previewQuality: 0.65,
                resultQuality: 0.8,
                resultMimeType: 'image/jpeg',
                selectButtonLabel: 'Select Files',
                showPreview: true,
                skin: 'dark',
                uploadData: {}, // additional upload data, such as user id or whatever
                uploadTo: false
            },
            dragged: false,
            fullWidth: 500, // width of whole ui
            file: false,
            fliph: false,
            flipv: false,
            h: 100,
            image: false,
            imageWidth: 0,
            imageHeight: 0,
            loadingImage: false,
            minW: 8, // minimum dimensions of the cropping window
            minH: 8, // minimum dimensions of the cropping window
            mx: 0,
            my: 0,
            over: false,
            previewImage: false,
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
        cropData () {
            let scale = Math.round((this.imageWidth / this.canvasWidth + this.imageHeight / this.canvasHeight) / .002) / 1000
            let [rot, fh, fv] = [this.rotation, this.fliph, this.flipv]
            let x = this.x * scale
            let y = this.y * scale
            let w = this.w * scale
            let h = this.h * scale
            let a = this.imageWidth - x - w
            let b = this.imageHeight - y - h

            let nx, ny, nw, nh

            if ((rot === 0 && !fh && !fv) || (rot === 180 && fh && fv)) {
                nx = x
                ny = y
            }
            if ((rot === 90 && !fh && !fv) || (rot === 270 && fh && fv)) {
                nx = y
                ny = a
            }
            if ((rot === 180 && !fh && !fv) || (rot === 0 && fh && fv)) {
                nx = a
                ny = b
            }
            if ((rot === 270 && !fh && !fv) || (rot === 90 && fh && fv)) {
                nx = b
                ny = x
            }
            if ((rot === 0 && fh && !fv) || (rot === 180 && !fh && fv)) {
                nx = a
                ny = y
            }
            if ((rot === 90 && fh && !fv) || (rot === 270 && !fh && fv)) {
                nx = y
                ny = x
            }
            if ((rot === 180 && fh && !fv) || (rot === 0 && !fh && fv)) {
                nx = x
                ny = b
            }
            if ((rot === 270 && fh && !fv) || (rot === 90 && !fh && fv)) {
                nx = b
                ny = a
            }
            if (rot === 0 || rot === 180) {
                nw = w
                nh = h
            } else {
                nw = h
                nh = w
            }
            return {x: nx, y: ny, w: nw, h: nh}
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
            if (this.fullWidth <= this.opts.layoutBreakpoint || !this.opts.showPreview) return mw
            return Math.floor(0.65 * mw)
        },
        cx () {
            let box = this.canvas.getBoundingClientRect()
            return this.mx - box.left
        },
        cy () {
            let box = this.canvas.getBoundingClientRect()
            return this.my - box.top
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
        prevdivHeight () {
            if (this.fullWidth > this.opts.layoutBreakpoint) return this.cropperHeight
            return 300
        },
        prevdivWidth () {
            let mw = this.fullWidth - 24
            if (this.fullWidth <= this.opts.layoutBreakpoint) return mw
            return Math.floor(0.35 * mw)
        },
        previewCanvas () {
            if (!this.image || !this.resultCanvas) { return false }
            let canvas = document.createElement('canvas')
            canvas.width = this.previewSize.w
            canvas.height = this.previewSize.h
            let ctx = canvas.getContext('2d')
            ctx.drawImage(this.resultCanvas, 0, 0, canvas.width, canvas.height)
            return canvas
        },
        previewSize () {
            let [dw, dh] = [this.prevdivWidth - 20, this.prevdivHeight - 20]
            let pdratio = Math.round((dw / dh) * 1000) / 1000
            let resratio = Math.round((this.resultWidth / this.resultHeight) * 1000) / 1000
            let pw, ph
            if (resratio > pdratio) {
                pw = dw
                ph = dw / resratio
            } else {
                ph = dh
                pw = ph * resratio
            }
            return {w: Math.min(pw, this.resultWidth), h: Math.min(ph, this.resultHeight)}
        },
        resultCanvas () {
            if (!this.image) { return false }
            let canvas = document.createElement('canvas')
            canvas.width = this.resultWidth
            canvas.height = this.resultHeight
            let ctx = canvas.getContext('2d')
            ctx.save()
            if (this.fliph) {
                ctx.translate(this.previewSize.w, 0);
                ctx.scale(-1, 1)
            }
            if (this.flipv) {
                ctx.translate(0, this.previewSize.h);
                ctx.scale(1, -1)
            }
            let rotated = this.rotation === 90 || this.rotation === 270
            let w = rotated ? canvas.height : canvas.width
            let h = rotated ? canvas.width : canvas.height
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(this.rotation * Math.PI / 180)
            ctx.drawImage(
                this.image,
                this.cropData.x,
                this.cropData.y,
                this.cropData.w,
                this.cropData.h,
                -w / 2,
                -h / 2,
                w,
                h)
            ctx.restore()
            return canvas
        },
        resultWidth () {
            let [ar, cw, ch] = [this.opts.aspectRatio, this.opts.croppedWidth, this.opts.croppedHeight]
            let imageFactor = Math.round((this.imageWidth / this.canvasWidth) * 1000) / 1000
            let ratio = ar ? ar : this.w / this.h
            if (cw && !ch) { return cw }
            if (!cw && !ch) { return Math.round(this.w * imageFactor) }
            if (!cw && ch) { return Math.round(ch * ratio) }
            let resultRatio = cw / ch
            if (ratio >= resultRatio) { return cw }
            return Math.round(ch * ratio)
        },
        resultHeight () {
            let [ar, cw, ch] = [this.opts.aspectRatio, this.opts.croppedWidth, this.opts.croppedHeight]
            let imageFactor = Math.round((this.imageHeight / this.canvasHeight) * 1000) / 1000
            let ratio = ar ? ar : this.w / this.h
            if (ch && !cw) { return ch }
            if (!cw && !ch) { return Math.round(this.h * imageFactor) }
            if (!ch && cw) { return Math.round(cw / ratio) }
            let resultRatio = cw / ch
            if (ratio <= resultRatio) { return ch }
            return Math.round(cw / ratio)
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
        cancelCrop () {
            let input = this.$refs.fileInput
            input.type = ''
            input.type = 'file'
            this.file = false
            this.$emit('cropper-cancelled')
        },
        doCrop () {
            let resultImage = this.resultCanvas.toDataURL(this.opts.resultMimeType, this.opts.resultQuality)

            let n = this.file.name.lastIndexOf('.')
            let fname = this.file.name.substring(0, n)

            let finalData = {
                originalFile: this.file,
                filename: fname,
                rotation: this.rotation,
                cropCoords: this.cropData,
                flippedH: this.fliph,
                flippedV: this.flipv,
                croppedImageURI: resultImage
            }

            this.resultCanvas.toBlob((blob) => {
                let nd = new Date()
                blob.lastModified = nd.getTime()
                blob.lastModifiedDate = nd
                blob.name = fname
                finalData.croppedFile = blob
                this.$emit('cropper-saved', finalData)
                if (this.opts.uploadTo) {
                    let formData = new FormData()
                    for (let p in finalData) {
                        formData.append(p, finalData[p])
                    }
                    for (let m in this.opts.uploadData) {
                        formData.append(m, this.opts.uploadData[m])
                    }
                    axios.post(this.opts.uploadTo, formData)
                        .then((response) => {
                            this.$emit('cropper-uploaded', response)
                            if (this.opts.closeOnSave) {
                                this.file = false
                            }
                        })
                } else if (this.opts.closeOnSave) {
                    this.file = false
                }
            }, this.opts.resultMimeType, this.opts.resultQuality)
        },
        drawCanvas () {
            if (!this.ctx) { return }
            this.drawImageOnCanvas()
            this.drawOverlay()
            this.drawMarkers()
            if (this.opts.showPreview && this.opts.previewOnDrag && this.previewCanvas) {
                this.previewImage = this.previewCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
            }
        },
        drawImageOnCanvas () {
            if (!this.image) { return }
            this.ctx.save()
            if (this.fliph) {
                this.ctx.translate(this.canvasWidth, 0);
                this.ctx.scale(-1, 1)
            }
            if (this.flipv) {
                this.ctx.translate(0, this.canvasHeight);
                this.ctx.scale(1, -1)
            }
            let rotated = this.rotation === 90 || this.rotation === 270
            let w = rotated ? this.canvasHeight : this.canvasWidth
            let h = rotated ? this.canvasWidth : this.canvasHeight
            this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
            this.ctx.rotate(this.rotation * Math.PI / 180)
            this.ctx.drawImage(this.image, -w / 2, -h / 2, w, h)
            this.ctx.restore()
        },
        drawMarkers () {
            let [mouseX, mouseY] = [this.cx, this.cy]
            let ctx = this.ctx
            this.canvas.style.cursor = 'default'
            this.over = false
            // draw selection border
            ctx.beginPath()
            if (this.opts.cropArea !== 'circle') {
                ctx.rect(this.x, this.y, this.w, this.h)
            } else {
                ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, 2 * Math.PI)
            }
            if (ctx.isPointInPath(mouseX, mouseY)) {
                this.over = 'all'
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
                    this.over = p
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
        flip (direction) {
            if (direction === 'v') {
                this.flipv = !this.flipv
                this.y = this.canvasHeight - this.y - this.h
            } else {
                this.fliph = !this.fliph
                this.x = this.canvasWidth - this.x - this.w
            }
            this.drawCanvas()
            if (this.opts.showPreview && !this.opts.previewOnDrag && this.previewCanvas) {
                this.previewImage = this.previewCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
            }
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
        moveMouse (evt) {
            let mx = evt.clientX
            let my = evt.clientY
            let dx = mx - this.mx
            let dy = my - this.my
            if (this.dragged) { this.updateCoords(dx, dy) }
            this.mx = mx
            this.my = my
            this.drawCanvas()
        },
        rotate (delta) {
            let canvasSize = [this.canvasWidth, this.canvasHeight]
            if (this.fliph ? !this.flipv : this.flipv) {
                this.rotation -= delta
            } else {
                this.rotation += delta
            }
            if (this.rotation > 270) { this.rotation = 0 }
            if (this.rotation < 0) {this.rotation = 270 }
            let w = this.imageWidth
            let h = this.imageHeight
            this.imageWidth = h
            this.imageHeight = w
            this.$nextTick(() => {
                let scaleX = this.canvasHeight / canvasSize[0]
                let scaleY = this.canvasWidth / canvasSize[1]
                let nx = this.canvasWidth - this.y * scaleY - this.h * scaleY
                let ny = this.x * scaleX
                let nw = this.h * scaleY * this.opts.aspectRatio
                let nh = this.w * scaleX * this.opts.aspectRatio
                this.x = Math.round(nx)
                this.y = Math.round(ny)
                this.w = Math.round(nw)
                this.h = Math.round(nh)
                this.updateCoords()
                this.drawCanvas()
                if (this.opts.showPreview && !this.opts.previewOnDrag && this.previewCanvas) {
                    this.previewImage = this.previewCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
                }
            })
        },
        selectFile (evt) {
            let file = evt.currentTarget.files[0]
            if (file) { this.useFile(file) }
        },
        startCanvas () {
            if (this.image) {
                this.canvas = this.$refs.canvas
                this.ctx = this.canvas.getContext('2d')
                let [ir, ar] = [this.imageRatio, this.opts.aspectRatio]
                if (!ar) {
                    this.w = Math.round(this.canvasWidth / 2)
                    this.h = Math.round(this.canvasHeight / 2)
                } else if (ar >= ir) {
                    this.w = Math.round(this.canvasWidth / 2)
                    this.h = Math.round(this.w / ar)
                } else {
                    this.h = Math.round(this.canvasHeight / 2)
                    this.w = Math.round(this.h * ar)
                }
                this.x = Math.round((this.canvasWidth - this.w) / 2)
                this.y = Math.round((this.canvasHeight - this.h) / 2)
                this.drawCanvas()
            } else {
                this.canvas = false
                this.ctx = false
            }
            if (this.opts.showPreview && this.previewCanvas) {
                this.previewImage = this.previewCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
            }
        },
        startDrag () {
            this.dragged = this.over
        },
        stopDrag () {
            this.dragged = false
            let preview = this.resultCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
            this.$emit('cropper-preview', preview)
            if (this.opts.showPreview && this.previewCanvas) {
                this.previewImage = this.previewCanvas.toDataURL('image/jpeg', this.opts.previewQuality)
            }
        },
        triggerInput () {
            let input = this.$refs.fileInput
            input.click()
        },
        updateCoords (dx, dy) {
            let nx = this.x
            let ny = this.y
            let nw = this.w
            let nh = this.h
            let ar = this.opts.aspectRatio
            switch (this.dragged) {
            case 'all':
                nx = this.x + dx
                ny = this.y + dy
                break
            case 'nw':
                nx = this.x + dx
                ny = this.y + dy
                nw = this.w - dx
                nh = this.h - dy
                break
            case 'ne':
                ny = this.y + dy
                nw = this.w + dx
                nh = this.h - dy
                break
            case 'sw':
                nx = this.x + dx
                nw = this.w - dx
                nh = this.h + dy
                break
            case 'se':
                nw = this.w + dx
                nh = this.h + dy
                break
            }
            // keep aspect ratio
            if (ar) {
                nh = nw / ar
            }
            // keep minimal dimensions
            if (nw < this.minW || nh < this.minH) {
                if (ar && ar > 1) {
                    nh = this.minH
                    nw = nh * ar
                } else if (ar && ar < 1) {
                    nw = this.minW
                    nh = nw / ar
                } else {
                    if (nw < this.minW) { nw = this.minW }
                    if (nh < this.minH) { nh = this.minH }
                }
            }
            // don't expand over canvas width
            if (nw + nx > this.canvasWidth) {
                nw = this.canvasWidth - nx
                if (ar) { nh = nw / ar }
                if (nw / ar < this.minH && ar && ar > 1) {
                    nh = this.minH
                    nw = nh * ar
                    nx = this.canvasWidth - nw
                }
                if (nw < this.minW) {
                    nw = this.minW
                    nx = this.canvasWidth - nw
                }
            }
            // don't expand over canvas height
            if (nh + ny > this.canvasHeight) {
                nh = this.canvasHeight - ny
                if (ar) { nw = nh * ar }
                if (nh * ar < this.minW && ar && ar < 1) {
                    nw = this.minW
                    nh = nw / ar
                    ny = this.canvasHeight - nh
                }
                if (nh < this.minH) {
                    nh = this.minH
                    ny = this.canvasHeight - nh
                }
            }
            // dont cross 0 borders
            if (nx < 0) { nx = 0 }
            if (ny < 0) { ny = 0 }
            this.x = nx
            this.y = ny
            this.w = nw
            this.h = nh
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
            this.$emit('cropper-file-selected', file)
        }
    },
    watch: {
        file (nf) {
            this.rotation = 0
            this.fliph = false
            this.flipv = false
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
                let input = this.$refs.fileInput
                input.val = ''
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
        font-family: Avenir, Helvetica, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        a {
            text-decoration: none;
        }
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
        cursor: pointer;
        transition: all 0.3s;
    }

    .ankaCropper__navigation {
        padding: 12px;
        border-radius: 3px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    }

    .ankaCropper__navButton {
        border-radius: 3px;
        display: inline-block;
        padding: 8px;
        width: 16px; height: 16px;
        margin-right: 10px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 1px 1px 2px rgba(0, 0, 0, 0.25);
    }

    .ankaCropper__saveButton {
        border-radius: 3px;
        float: right;
        padding: 8px 20px;
        display: inline-block;
        height: 16px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 1px 1px 2px rgba(0, 0, 0, 0.25);
        font-size: 14px;
        svg {
            vertical-align: bottom;
        }
    }

    .ankaCropper__mainArea {
        margin: 12px;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
    }

    .ankaCropper__previewArea {
        display: flex;
        justify-content: center;
        align-items: center;
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
        .ankaCropper__selectButton, .ankaCropper__saveButton {
            background: #1c6bd6;
            color: #fff;
            &:hover {
                background: #1b5bb2;
            }
        }
        .ankaCropper__navigation {
            background: #e8f2fa;
        }
        .ankaCropper__navButton {
            svg { stroke: #0f1114; }
        }
        .ankaCropper__navButton:hover {
            background: #fff;
        }
    }
    .ankaCropper.dark {
        background: #0f1114;
        color: #eee;
        .ankaCropper__droparea {
            border: dashed 2px #3e424b;
        }
        .ankaCropper__selectButton, .ankaCropper__saveButton {
            background: #334f90;
            color: #fff;
            &:hover {
                background: #335dbe;
            }
        }
        .ankaCropper__navigation {
            background: #1d2227;
        }
        .ankaCropper__navButton {
            background: #272c31;
            svg { stroke: #eee; }
            &:hover {
                background: #000;
            }
        }
    }

</style>
