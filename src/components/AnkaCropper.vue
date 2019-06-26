<template>
    <div class="vueAnkaCropper">
        <div class="ankaCropper" :class="[opts.skin]">
            <div class="ankaCropper__droparea">
                <input type="file" class="ankaCropper__fileInput" ref="fileInput" v-show="false"/>
                <div>{{opts.dropareaMessage}}</div>
                <button class="ankaCropper__selectButton" @click="triggerInput">{{opts.selectButtonLabel}}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ankaCropper',
    data () {
        return {
            defaultOptions: {
                dropareaMessage: 'Drop file here or use the button below',
                selectButtonLabel: 'Select files',
                skin: 'light'
            }
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
        }
    },
    methods: {
        triggerInput () {
            let input = this.$refs.fileInput
            input.click()
        },
        selectFile (evt) {
            this.loadingImage = true
            var file = evt.currentTarget.files[0]
            if (file === undefined) { return }
            var mimetypes = ['image/jpeg', 'image/png', 'image/gif']
            if (mimetypes.indexOf(file.type) !== -1) {
                this.file = file
                this.$emit('image-selected')
            } else {
                this.showToaster({title: 'Unsupported File Type: ' + file.type, content: 'Please upload only .jpg, .gif and .png files.', timeout: 3000, toasterClass: 'error'})
                this.cancelCrop('upload-error')
                console.log('unsupported file type: ', file.type)
                this.loadingImage = false
            }
        },
        readImageFromUrl (url) {
            var leafname = url.split('\\').pop().split('/').pop()
            var self = this
            axios.get(url, {responseType: 'blob'})
                .then(function (response) {
                    var blob = response.data
                    blob.name = leafname
                    self.file = blob
                })
                .catch(function (error) {
                    self.file = false
                    self.cancelCrop('upload-error')
                    console.log('Image file reading error. Url: ' + this.imageUrl + 'could not be retrieved', error)
                })
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

    /***************************/
    /*        SKINS            */
    /***************************/
    .ankaCropper.light {
        background: #e3eaf0;
        color: #222;
        .ankaCropper__droparea {
            border: dashed 2px #367bb7;
        }
        .ankaCropper__selectButton {
            background: #1c6bd6;
            color: #fff;
        }
    }
    .ankaCropper.dark {
        background: #0b0d0f;
        color: #eee;
        .ankaCropper__droparea {
            border: dashed 2px #3e424b;
        }
        .ankaCropper__selectButton {
            background: #334f90;
            color: #fff;
        }
    }

</style>
