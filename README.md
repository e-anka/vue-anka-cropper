# vue-anka-cropper
> An easy image cropper and (optionally) uploader component for vue.js

Please note it's an early version. Documentation is under construction, no demo yet.

## Installation

### NPM
```bash
npm install vue-anka-cropper
```

and then in your app:

```js
import vueAnkaCropper from 'vue-anka-cropper'
...
components: {vueAnkaCropper}
...
<style>
@import '../node_modules/vue-anka-cropper/dist/VueAnkaCropper.css';
...
```
### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/vue-anka-cropper@0.1.0/dist/VueAnkaCropper.css">
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://unpkg.com/vue-anka-cropper/dist/VueAnkaCropper.umd.min.js"></script>
```

## Usage

Most basic example. This is going to insert the cropper with default options:

```html
<template>
    <div>
        <h1>Vue Anka Cropper Example</h1>
        <vue-anka-cropper></vue-anka-cropper>
    </div>
</template>
<script>
import vueAnkaCropper from 'vue-anka-cropper'
export default {
    name: 'cropperDemo',
    components: {vueAnkaCropper}
}
</script>
```

Example with all the options and events:

```html
<template>
    <div>
        <h1>Vue Anka Cropper Example</h1>
        <vue-anka-cropper
           :options="{
               aspectRatio: 1,
               closeOnSave: true,
               cropArea: 'box',
               croppedHeight: 400,
               croppedWidth: 400,
               cropperHeight: false,
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
               maxFileSize: 8000000,
               overlayFill: 'rgba(0, 0, 0, 0.5)',
               previewOnDrag: true,
               previewQuality: 0.65,
               resultQuality: 0.8,
               resultMimeType: 'image/jpeg',
               selectButtonLabel: 'Select Files',
               showPreview: true,
               skin: 'light',
               uploadData: {},
               uploadTo: false}"
            @cropper-error="someAction(errorMessage)"
            @cropper-file-selected="someAction(file)"
            @cropper-preview="someAction(imageSource)"
            @cropper-saved="someAction(cropData)"
            @cropper-cancelled="someAction()"
            @cropper-uploaded="someAction(serverResponse)"></vue-anka-cropper>
    </div>
</template>
<script>
import vueAnkaCropper from 'vue-anka-cropper'
export default {
    name: 'cropperDemo',
    components: {vueAnkaCropper}
}
</script>
```

## Options
| Option | Default Value | Allowed Values | Description |
|:-------|:--------------|:---------------|-------------|
| aspectRatio | 1 | false or number | if not false, it will lock the aspect ratio of cropped area. Aspect ratio everywhere in anka-cropper is width/ height |
| closeOnSave | true | boolean | whether to close the cropper after saving the result (hide the image, clear the data), not allowing further cropping |
| cropArea | 'box' | 'box' or 'circle' | Use 'circle' for round crop area (useful for avatars). If this is 'circle', aspectRatio will be locked to 1 |
| croppedHeight | 400 | false or integer | Desired height of the cropped image, in pixels |
| croppedWidth | 400 | false or integer | Desired width of the cropped image, in pixels |
| cropperHeight | false | false or integer | Fixed height of the cropper if needed. It will probably be removed in future versions, because this can be done much easier with css |
| dropareaMessage | 'Drop file here or use the button below' | string | Any message to appear in file drop area. |
| frameLineDash | [5,3] | array of intergers | A pattern of line dashes and spaces lengths. Main cropping frame will use this. Follow this specs: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash. Use [] (empty array} for continuos line |
| frameStrokeColor | 'rgba(255, 255, 255, 0.8)' | string | Color of the main cropping frame. |
| handleFillColor | 'rgba(255, 255, 255, 0.2)' | string | Color of the fill of cropping handles. |
| handleHoverFillColor | 'rgba(255, 255, 255, 0.4)' | string | Color of the fill of hovered cropping handles. |
| handleHoverStrokeColor | 'rgba(255, 255, 255, 1)' | string | Color of the stroke of hovered cropping handles. |
| handleSize | 10 | integer | Size of cropping handles, in pixels. Please note the size will be doubled, so 10 means they will be 20 x 20 pixels |
| handleStrokeColor | 'rgba(255, 255, 255, 0.8)' | string | Color of the stroke of cropping handles. |
| layoutBreakpoint | 850 | integer | If showPreview is true, this is the breakpoint at which the layout changes from vertical (preview at the bottom) to horizontal (preview on right) If showPreview is false this setting has no effect. This setting will probably be removed in future versions, because this should be handled with css. |
| maxCropperHeight | 768 | integer | Maximum height of the cropping area, in pixels |
| maxFileSize | 8000000 | false or integer | Maximum size of the file, in bytes. Set to false to allow files of any size |
| overlayFill | 'rgba(0, 0, 0, 0.5)' | string | color of the overlay outside of cropped image. |
| previewOnDrag | true | boolean | If true, the preview will be updated while user is dragging. It looks better, but may cause performance issues (especially with large files). If see such issues, change to false. |
| previewQuality | 0.65 | float | Quality of the preview image, 0 - 1. |
| resultQuality | 0.8 | float | Quality of the cropped image, 0 - 1 (if applicable, i.e. resultMimeType is a lossy type), lacking support in some browsers |
| resultMimeType | 'image/jpeg' | string | Mime type of the cropped image, any value supported by HTMLCanvasElement.toBlob() (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) |
| selectButtonLabel | 'Select Files' | string | Upload button label |
| showPreview | true | boolean | Whether to show the preview |
| skin | 'light' | string | Currently 'light' or 'dark' are available, you can also use any other name to create your own skin. |
| uploadData | {} | object | any additional data that should be uploaded with cropped image. |
| uploadTo | false | false or string | Path where to upload the cropped file. Right now, only relative path, in the same domain will work (CORS issues) |

## Events
| Event | Payload | Description |
|-----------------------|---------|---------------------------------------------------------------------------------------------|
| cropper-error | string | Fires on any file reading error, returns an error message. |
| cropper-file-selected | file | Emitted after user selected a file and it has been recognized as a valid image file.  |
| cropper-preview | dataURI | Fires when user stops dragging the cropping handle and returns image src as DataURI string. |
| cropper-saved | object | Fires when user clicked save button, returns an object described below. |
| cropper-cancelled | - | Fires when user cancels cropping. |
| cropper-uploaded | object | Fires after cropped image has been uploaded, and returns the response from server. |

### Response object

After cropping is done (user clicks on Save button) two things happen: cropper-saved event fires, and if uploadTo is not false, cropped image gets uploaded (firing cropper-uploaded event).
Cropper-saved payload is an object, containing following fields:
- **cropCoords**, an object containing cropping coordinates keyed x, y, w and h. Coordinates are scaled to original image size.
- **croppedFile**, cropped image in form of a blob
- **croppedImageURI**, cropped image as dataURI
- **filename**, name of original uploaded file, **without extension**
- **flippedH**, boolean, indicating if original image was flipped horizontally
- **flippedV**, boolean, indicating if original image was flipped vertically
- **originalFile**, original file provided by user
- **rotation**, angle of image rotation in degrees (0, 90, 180 or 270 are only possible values)

## Cropped Image Size

Options allow adding fixed ratio as well as width and height of the image. This might lead to distorted image, in case if requested width and height don't match aspect ratio. In such case, width and height will be treated as maximum allowed width and maximum allowed height, resulting in image with the requested aspect ratio, and fitting inside the box of requested dimensions. In case only one size is provided (width or height) and the other one set to false, the missing one will be calculated using either aspectRatio (if not false) or the aspect ratio of cropped area.

## Creating Your Own Skin

Right now only two skins exist, light and dark. However, if you will use any other string as skin name, it will be added to the cropper outer element. Then you can edit the css adding your skin rules.Please find the css of the dark skin below, use it as a skeleton for your skin (change "dark" to your skin name)
```css
.ankaCropper.dark {
    background: #0f1114;
    color: #eee
}

.ankaCropper.dark .ankaCropper__droparea {
    border: 2px dashed #3e424b
}

.ankaCropper.dark .ankaCropper__saveButton,
.ankaCropper.dark .ankaCropper__selectButton {
    background: #334f90;
    color: #fff
}

.ankaCropper.dark .ankaCropper__saveButton:hover,
.ankaCropper.dark .ankaCropper__selectButton:hover {
    background: #335dbe
}

.ankaCropper.dark .ankaCropper__navigation {
    background: #1d2227
}

.ankaCropper.dark .ankaCropper__navButton {
    background: #272c31
}

.ankaCropper.dark .ankaCropper__navButton svg {
    stroke: #eee
}

.ankaCropper.dark .ankaCropper__navButton:hover {
    background: #000
}

```

## RoadMap

1. Revise the code, make it smaller. Remove some calculations, as this should be done with css.
2. Add touch support
3. Watch options and update on change.






