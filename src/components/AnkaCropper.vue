<template>
    <div class="vueAnkaCropper">
        <div class="ankaCropper" :class="[opts.skin]">
            <div v-if="!file" class="ankaCropper__droparea" @drop.prevent="dropFile" @dragover.prevent>
                <input type="file" class="ankaCropper__fileInput" ref="fileInput" v-show="false" @change="selectFile"/>
                <div>{{opts.dropareaMessage}}</div>
                <button class="ankaCropper__selectButton" @click="triggerInput">{{opts.selectButtonLabel}}</button>
            </div>
            <div v-if="file" class="ankaCropper__navigation">
                <a href="#" @click.prevent title="Upload a new image">
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
                <a href="#" @click.prevent title="Cancel">
                   <img :src="require('../assets/feather/' + opts.skin + '/x-circle.svg')" alt="cancel icon" width="16" height="16"/>
                </a>
                <a href="#" @click.prevent title="Save">
                   <img :src="require('../assets/feather/' + opts.skin + '/save.svg')" alt="save icon" width="16" height="16"/>
                </a>
            </div>
            <div v-if="file" class="ankaCropper__mainArea">
                <div :style="{background: '#40496f', width: canvasWidth + 'px', height: canvasHeight + 'px', float: 'left'}"></div>
                <div :style="{background: '#d14423', width: previewWidth + 'px', height: canvasHeight + 'px', float: 'left'}"></div>
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
            cropperWidth: 100,
            defaultOptions: {
                cropperHeight: false,
                dropareaMessage: 'Drop file here or use the button below.',
                layoutBreakpoint: 950,
                maxCropperHeight: 800,
                maxFileSize: 8000000,
                selectButtonLabel: 'Select Files',
                skin: 'dark'
            },
            file: false,
            image: false,
            imageWidth: 0,
            imageHeight: 0,
            loadingImage: false,
            rotation: 0
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
        opts () {
            return Object.assign({}, this.defaultOptions, this.options)
        },
        imageRatio () {
            if (!this.imageHeight) return 0
            return Math.round((this.imageWidth / this.imageHeight) * 1000) / 1000
        },
        canvasWidth () {
            let mw = this.cropperWidth - 24
            if (this.cropperWidth <= this.opts.layoutBreakpoint) return mw
            return Math.floor(0.65 * mw)
        },
        canvasHeight () {
            let calculatedHeight = Math.floor(this.canvasWidth / this.imageRatio)
            let maxHeight = this.opts.maxCropperHeight
            if (maxHeight && maxHeight > 100 && maxHeight < calculatedHeight) { return maxHeight - 80 }
            return calculatedHeight
        },
        previewWidth () {
            let mw = this.cropperWidth - 24
            if (this.cropperWidth <= this.opts.layoutBreakpoint) return mw
            return Math.floor(0.35 * mw)
        }
    },
    mounted () {
        this.getCropperWidth()
        window.addEventListener('resize', this.getCropperWidth)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.getCropperWidth)
    },
    methods: {
        getCropperWidth () {
            let elSize = this.$el.getBoundingClientRect()
            this.cropperWidth = elSize.width
        },
        triggerInput () {
            let input = this.$refs.fileInput
            input.click()
        },
        selectFile (evt) {
            let file = evt.currentTarget.files[0]
            this.useFile(file)
        },
        dropFile (evt) {
            let file = evt.dataTransfer.files[0]
            this.useFile(file)
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
                }
                img.onerror = () => {
                    this.loadingImage = false
                }
                img.src = evt.target.result
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
