(function(e){function t(t){for(var r,o,n=t[0],l=t[1],h=t[2],c=0,u=[];c<n.length;c++)o=n[c],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);p&&p(t);while(u.length)u.shift()();return s.push.apply(s,h||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],r=!0,n=1;n<i.length;n++){var l=i[n];0!==a[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=i[0]))}return e}var r={},a={app:0},s=[];function o(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=r,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(i,r,function(t){return e[t]}.bind(null,r));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/vue-anka-cropper/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var h=0;h<n.length;h++)t(n[h]);var p=l;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"0cd6":function(e,t,i){},"475e":function(e,t,i){"use strict";var r=i("0cd6"),a=i.n(r);a.a},"56d7":function(e,t,i){"use strict";i.r(t);i("cadf"),i("551c"),i("f751"),i("097d");var r=i("2b0e"),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("h1",[e._v("Vue Anka Image Cropper and (optionally) Uploader")]),e._m(0),i("div",{staticClass:"row"},[i("div",{staticClass:"options"},[i("h2",[e._v("Options")]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.useAr,expression:"useAr"}],attrs:{type:"checkbox",id:"useAr"},domProps:{checked:Array.isArray(e.useAr)?e._i(e.useAr,null)>-1:e.useAr},on:{change:function(t){var i=e.useAr,r=t.target,a=!!r.checked;if(Array.isArray(i)){var s=null,o=e._i(i,s);r.checked?o<0&&(e.useAr=i.concat([s])):o>-1&&(e.useAr=i.slice(0,o).concat(i.slice(o+1)))}else e.useAr=a}}}),i("label",{attrs:{for:"aspectRatio"}},[e._v("Aspect ratio "+e._s(e.aspectRatio))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.ar,expression:"ar",modifiers:{number:!0}}],attrs:{type:"range",id:"aspectRatio",max:"5",min:"0.2",step:"0.01"},domProps:{value:e.ar},on:{__r:function(t){e.ar=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.closeOnSave,expression:"closeOnSave"}],attrs:{type:"checkbox",id:"closeOnSave"},domProps:{checked:Array.isArray(e.closeOnSave)?e._i(e.closeOnSave,null)>-1:e.closeOnSave},on:{change:function(t){var i=e.closeOnSave,r=t.target,a=!!r.checked;if(Array.isArray(i)){var s=null,o=e._i(i,s);r.checked?o<0&&(e.closeOnSave=i.concat([s])):o>-1&&(e.closeOnSave=i.slice(0,o).concat(i.slice(o+1)))}else e.closeOnSave=a}}}),i("label",{attrs:{for:"closeOnSave"}},[e._v("Close on save")])]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"cropArea"}},[e._v("Crop area")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.cropArea,expression:"cropArea"}],attrs:{id:"cropArea"},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.cropArea=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"box"}},[e._v("box")]),i("option",{attrs:{value:"circle"}},[e._v("circle")])])]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"croppedHeight"}},[e._v("Cropped height "+e._s(e.croppedHeight))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.croppedHeight,expression:"croppedHeight",modifiers:{number:!0}}],attrs:{type:"range",id:"croppedHeight",max:"800",min:"40",step:"1"},domProps:{value:e.croppedHeight},on:{__r:function(t){e.croppedHeight=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"croppedWidth"}},[e._v("Cropped width "+e._s(e.croppedWidth))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.croppedWidth,expression:"croppedWidth",modifiers:{number:!0}}],attrs:{type:"range",id:"croppedWidth",max:"800",min:"40",step:"1"},domProps:{value:e.croppedWidth},on:{__r:function(t){e.croppedWidth=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.useCropperH,expression:"useCropperH"}],attrs:{type:"checkbox",id:"useCropperH"},domProps:{checked:Array.isArray(e.useCropperH)?e._i(e.useCropperH,null)>-1:e.useCropperH},on:{change:function(t){var i=e.useCropperH,r=t.target,a=!!r.checked;if(Array.isArray(i)){var s=null,o=e._i(i,s);r.checked?o<0&&(e.useCropperH=i.concat([s])):o>-1&&(e.useCropperH=i.slice(0,o).concat(i.slice(o+1)))}else e.useCropperH=a}}}),i("label",{attrs:{for:"cropperH"}},[e._v("Cropper height "+e._s(e.cropperH))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cropperH,expression:"cropperH",modifiers:{number:!0}}],attrs:{type:"range",id:"croppedHeight",max:"1000",min:"200",step:"1"},domProps:{value:e.cropperH},on:{__r:function(t){e.cropperH=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"dropareaMessage"}},[e._v("Drop area message")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.dropareaMessage,expression:"dropareaMessage"}],attrs:{type:"text",id:"dropareaMessage"},domProps:{value:e.dropareaMessage},on:{input:function(t){t.target.composing||(e.dropareaMessage=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"selectButtonLabel"}},[e._v("Select button label")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.selectButtonLabel,expression:"selectButtonLabel"}],attrs:{type:"text",id:"selectButtonLabel"},domProps:{value:e.selectButtonLabel},on:{input:function(t){t.target.composing||(e.selectButtonLabel=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"frameLineDash"}},[e._v("Frame line dash")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.dash,expression:"dash"}],attrs:{type:"text",id:"frameLineDash"},domProps:{value:e.dash},on:{keydown:function(t){return!t.type.indexOf("key")&&108!==t.keyCode&&188!==t.keyCode&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addDash(t)},input:function(t){t.target.composing||(e.dash=t.target.value)}}}),e._l(e.frameLineDash,(function(t,r){return i("span",{key:r+"chip",staticClass:"chip",attrs:{title:"Click to remove"},on:{click:function(t){return t.preventDefault(),e.removeDash(r)}}},[e._v(e._s(t))])})),i("p",[e._v("Use input to add numbers. Click on a number to remove it. This controles dashing style of the cropping frame.")])],2),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"frameStrokeColor"}},[e._v("Frame stroke color")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.frameStrokeColor,expression:"frameStrokeColor"}],attrs:{type:"text",id:"frameStrokeColor"},domProps:{value:e.frameStrokeColor},on:{input:function(t){t.target.composing||(e.frameStrokeColor=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"handleFillColor"}},[e._v("Handle fill color")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.handleFillColor,expression:"handleFillColor"}],attrs:{type:"text",id:"handleFillColor"},domProps:{value:e.handleFillColor},on:{input:function(t){t.target.composing||(e.handleFillColor=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"handleHoverFillColor"}},[e._v("Handle hover fill color")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.handleHoverFillColor,expression:"handleHoverFillColor"}],attrs:{type:"text",id:"handleHoverFillColor"},domProps:{value:e.handleHoverFillColor},on:{input:function(t){t.target.composing||(e.handleHoverFillColor=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"handleHoverStrokeColor"}},[e._v("Handle hover stroke color")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.handleHoverStrokeColor,expression:"handleHoverStrokeColor"}],attrs:{type:"text",id:"handleHoverStrokeColor"},domProps:{value:e.handleHoverStrokeColor},on:{input:function(t){t.target.composing||(e.handleHoverStrokeColor=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"handleStrokeColor"}},[e._v("Handle stroke color")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.handleStrokeColor,expression:"handleStrokeColor"}],attrs:{type:"text",id:"handleStrokeColor"},domProps:{value:e.handleStrokeColor},on:{input:function(t){t.target.composing||(e.handleStrokeColor=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"overlayFill"}},[e._v("Overlay fill")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.overlayFill,expression:"overlayFill"}],attrs:{type:"text",id:"overlayFill"},domProps:{value:e.overlayFill},on:{input:function(t){t.target.composing||(e.overlayFill=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"handleSize"}},[e._v("Handle size "+e._s(e.handleSize))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.handleSize,expression:"handleSize",modifiers:{number:!0}}],attrs:{type:"range",id:"handleSize",max:"50",min:"4",step:"1"},domProps:{value:e.handleSize},on:{__r:function(t){e.handleSize=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"layoutBreakpoint"}},[e._v("Layout breakpoint "+e._s(e.layoutBreakpoint))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.layoutBreakpoint,expression:"layoutBreakpoint",modifiers:{number:!0}}],attrs:{type:"range",id:"layoutBreakpoint",max:"1000",min:"400",step:"1"},domProps:{value:e.layoutBreakpoint},on:{__r:function(t){e.layoutBreakpoint=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"maxCropperHeight"}},[e._v("Max cropper height "+e._s(e.maxCropperHeight))]),i("input",{directives:[{name:"model",rawName:"v-model.number",value:e.maxCropperHeight,expression:"maxCropperHeight",modifiers:{number:!0}}],attrs:{type:"range",id:"maxCropperHeight",max:"2000",min:"200",step:"1"},domProps:{value:e.maxCropperHeight},on:{__r:function(t){e.maxCropperHeight=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.previewOnDrag,expression:"previewOnDrag"}],attrs:{type:"checkbox",id:"previewOnDrag"},domProps:{checked:Array.isArray(e.previewOnDrag)?e._i(e.previewOnDrag,null)>-1:e.previewOnDrag},on:{change:function(t){var i=e.previewOnDrag,r=t.target,a=!!r.checked;if(Array.isArray(i)){var s=null,o=e._i(i,s);r.checked?o<0&&(e.previewOnDrag=i.concat([s])):o>-1&&(e.previewOnDrag=i.slice(0,o).concat(i.slice(o+1)))}else e.previewOnDrag=a}}}),i("label",{attrs:{for:"previewOnDrag"}},[e._v("Preview on drag")])]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.showPreview,expression:"showPreview"}],attrs:{type:"checkbox",id:"showPreview"},domProps:{checked:Array.isArray(e.showPreview)?e._i(e.showPreview,null)>-1:e.showPreview},on:{change:function(t){var i=e.showPreview,r=t.target,a=!!r.checked;if(Array.isArray(i)){var s=null,o=e._i(i,s);r.checked?o<0&&(e.showPreview=i.concat([s])):o>-1&&(e.showPreview=i.slice(0,o).concat(i.slice(o+1)))}else e.showPreview=a}}}),i("label",{attrs:{for:"showPreview"}},[e._v("Show Preview")])]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"skin"}},[e._v("Skin")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.skin,expression:"skin"}],attrs:{id:"skin"},on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.skin=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"light"}},[e._v("Light")]),i("option",{attrs:{value:"dark"}},[e._v("Dark")])])]),i("h3",[e._v("Disabled")]),i("p",[e._v("Options below are disabled, because there's no way to use them on github, but you can use them in your code")]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"maxFileSize"}},[e._v("Max file size (in bytes)")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.maxFileSize,expression:"maxFileSize"}],attrs:{type:"text",id:"maxFileSize",disabled:""},domProps:{value:e.maxFileSize},on:{input:function(t){t.target.composing||(e.maxFileSize=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"previewQuality"}},[e._v("Preview quality")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.previewQuality,expression:"previewQuality"}],attrs:{type:"text",id:"previewQuality",disabled:""},domProps:{value:e.previewQuality},on:{input:function(t){t.target.composing||(e.previewQuality=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"resultQuality"}},[e._v("Result quality")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.resultQuality,expression:"resultQuality"}],attrs:{type:"text",id:"resultQuality",disabled:""},domProps:{value:e.resultQuality},on:{input:function(t){t.target.composing||(e.resultQuality=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"resultMimeType"}},[e._v("Result mime type")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.resultMimeType,expression:"resultMimeType"}],attrs:{type:"text",id:"resultMimeType",disabled:""},domProps:{value:e.resultMimeType},on:{input:function(t){t.target.composing||(e.resultMimeType=t.target.value)}}})]),i("div",{staticClass:"form-group"},[i("label",{attrs:{for:"uploadTo"}},[e._v("Upload to")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.upl,expression:"upl"}],attrs:{type:"text",id:"uploadTo",disabled:""},domProps:{value:e.upl},on:{input:function(t){t.target.composing||(e.upl=t.target.value)}}})]),e._m(1)]),i("div",{staticClass:"cropper"},[i("h2",[e._v("Cropper")]),i("vue-anka-cropper",{attrs:{options:e.options},on:{"cropper-mounted":function(t){return e.debug(t,"cropper-mounted")},"cropper-error":function(t){return e.debug(t,"cropper-error")},"cropper-file-selected":function(t){return e.debug(t,"cropper-file-selected")},"cropper-preview":function(t){return e.debug(t,"cropper-preview")},"cropper-saved":function(t){return e.debug(t,"cropper-saved")},"cropper-cancelled":function(t){return e.debug(t,"cropper-cancelled")},"cropper-uploaded":function(t){return e.debug(t,"cropper-uploaded")},"cropper-before-destroy":function(t){return e.debug(t,"cropper-before-destroy")}}})],1),i("div",{staticClass:"events"},[i("h2",[e._v("Events "),i("a",{staticStyle:{"font-size":"1rem"},attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.events=[]}}},[e._v("Clear")])]),e._l(e.events,(function(t,r){return i("div",{key:r,style:{opacity:r?.5:1}},[i("h3",{staticClass:"h5"},[e._v(e._s(t.name))]),i("div",{domProps:{innerHTML:e._s(e.printEv(t))}})])}))],2)])])},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{"text-align":"center"}},[i("a",{attrs:{href:"https://github.com/e-anka/vue-anka-cropper",target:"_blank"}},[e._v("View on Github")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"form-group"},[i("span",[e._v("Upload data")]),i("p",[e._v("An object, holding any data you'd like to upload together with cropped image.")])])}],o=(i("7f7f"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vueAnkaCropper"},[i("div",{staticClass:"ankaCropper",class:[e.opts.skin]},[e.file?i("div",{staticClass:"ankaCropper__navigation"},[i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Upload a new image"},on:{click:function(t){return t.preventDefault(),e.triggerInput(t)}}},[i("svg",{staticClass:"feather feather-upload",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{attrs:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),i("polyline",{attrs:{points:"17 8 12 3 7 8"}}),i("line",{attrs:{x1:"12",y1:"3",x2:"12",y2:"15"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Rotate counterclockwise"},on:{click:function(t){return t.preventDefault(),e.rotate(-90)}}},[i("svg",{staticClass:"feather feather-rotate-ccw",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("polyline",{attrs:{points:"1 4 1 10 7 10"}}),i("path",{attrs:{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Rotate clockwise"},on:{click:function(t){return t.preventDefault(),e.rotate(90)}}},[i("svg",{staticClass:"feather feather-rotate-cw",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("polyline",{attrs:{points:"23 4 23 10 17 10"}}),i("path",{attrs:{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Flip horizontally"},on:{click:function(t){return t.preventDefault(),e.flip("h")}}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{staticStyle:{fill:"none"},attrs:{d:"M 9.7148438,2.8183594 1.8203125,18 c -0.7648346,1.324499 0.1796183,2.982419 1.7089844,3 h 6.1855469 z m 4.5703122,0 V 21 h 6.185547 c 1.529366,-0.01758 2.47382,-1.675501 1.708985,-3 z",id:"path2"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Flip vertically"},on:{click:function(t){return t.preventDefault(),e.flip("v")}}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{staticStyle:{fill:"none"},attrs:{d:"M 21.090975,9.7148433 5.9093341,1.820312 c -1.324499,-0.7648346 -2.982419,0.1796183 -3,1.7089844 v 6.1855469 z m 0,4.5703127 H 2.9093341 v 6.185547 c 0.01758,1.529366 1.675501,2.47382 3,1.708985 z",id:"path2"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Cancel"},on:{click:function(t){return t.preventDefault(),e.cancelCrop(t)}}},[i("svg",{staticClass:"feather feather-x-circle",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("circle",{attrs:{cx:"12",cy:"12",r:"10"}}),i("line",{attrs:{x1:"15",y1:"9",x2:"9",y2:"15"}}),i("line",{attrs:{x1:"9",y1:"9",x2:"15",y2:"15"}})])]),i("a",{staticClass:"ankaCropper__saveButton",attrs:{href:"#",title:"Save"},on:{click:function(t){return t.preventDefault(),e.doCrop(t)}}},[i("svg",{staticClass:"feather feather-save",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#fff","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{attrs:{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}}),i("polyline",{attrs:{points:"17 21 17 13 7 13 7 21"}}),i("polyline",{attrs:{points:"7 3 7 8 15 8"}})]),e._v(" Save\n            ")])]):e._e(),i("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileInput",staticClass:"ankaCropper__fileInput",attrs:{type:"file"},on:{change:e.selectFile}}),e.file?e._e():i("div",{staticClass:"ankaCropper__droparea",on:{drop:function(t){return t.preventDefault(),e.dropFile(t)},dragover:function(e){e.preventDefault()}}},[i("div",[e._v(e._s(e.opts.dropareaMessage))]),i("button",{staticClass:"ankaCropper__selectButton",on:{click:e.triggerInput}},[e._v(e._s(e.opts.selectButtonLabel))])]),e.file?i("div",{staticClass:"ankaCropper__mainArea"},[i("div",{style:{width:e.cropperWidth+"px",height:e.cropperHeight+"px",float:"left"}},[i("canvas",{ref:"canvas",staticStyle:{background:"#ccc"},attrs:{width:e.canvasWidth,height:e.canvasHeight},on:{mousemove:e.moveMouse,mousedown:e.startDrag,mouseup:e.stopDrag,mouseleave:function(t){e.dragged=!1}}})]),e.opts.showPreview?i("div",{staticClass:"ankaCropper__previewArea",style:{width:e.prevdivWidth+"px",height:e.prevdivHeight+"px",float:"left"}},[i("img",{style:{width:e.previewSize.w+"px",height:e.previewSize.h+"px",borderRadius:"circle"===e.opts.cropArea?"50%":0},attrs:{src:e.previewImage}})]):e._e()]):e._e()])])}),n=[],l=(i("6c7b"),i("bc3a")),h=i.n(l),p={name:"ankaCropper",data:function(){return{allowedMimeTypes:["image/jpeg","image/png","image/gif"],canvas:!1,ctx:!1,defaultOptions:{aspectRatio:1,closeOnSave:!0,cropArea:"box",croppedHeight:400,croppedWidth:400,cropperHeight:!1,dropareaMessage:"Drop file here or use the button below.",frameLineDash:[5,3],frameStrokeColor:"rgba(255, 255, 255, 0.8)",handleFillColor:"rgba(255, 255, 255, 0.2)",handleHoverFillColor:"rgba(255, 255, 255, 0.4)",handleHoverStrokeColor:"rgba(255, 255, 255, 1)",handleSize:10,handleStrokeColor:"rgba(255, 255, 255, 0.8)",layoutBreakpoint:850,maxCropperHeight:768,maxFileSize:8e6,overlayFill:"rgba(0, 0, 0, 0.5)",previewOnDrag:!0,previewQuality:.65,resultQuality:.8,resultMimeType:"image/jpeg",selectButtonLabel:"Select File",showPreview:!0,skin:"light",uploadData:{},uploadTo:!1},dragged:!1,fullWidth:500,file:!1,fliph:!1,flipv:!1,h:100,image:!1,imageWidth:0,imageHeight:0,loadingImage:!1,minW:8,minH:8,mx:0,my:0,over:!1,previewImage:!1,rotation:0,w:100,x:20,y:20}},props:{options:{type:Object,default:function(){return{}}}},computed:{canvasHeight:function(){return this.imageRatio<=this.cropperRatio?this.cropperHeight:Math.round(this.cropperWidth/this.imageRatio)},canvasWidth:function(){return this.imageRatio>=this.cropperRatio?this.cropperWidth:Math.round(this.imageRatio*this.canvasHeight)},cropData:function(){var e,t,i,r,a=Math.round((this.imageWidth/this.canvasWidth+this.imageHeight/this.canvasHeight)/.002)/1e3,s=[this.rotation,this.fliph,this.flipv],o=s[0],n=s[1],l=s[2],h=this.x*a,p=this.y*a,c=this.w*a,u=this.h*a,d=this.imageWidth-h-c,v=this.imageHeight-p-u;return(0===o&&!n&&!l||180===o&&n&&l)&&(e=h,t=p),(90===o&&!n&&!l||270===o&&n&&l)&&(e=p,t=d),(180===o&&!n&&!l||0===o&&n&&l)&&(e=d,t=v),(270===o&&!n&&!l||90===o&&n&&l)&&(e=v,t=h),(0===o&&n&&!l||180===o&&!n&&l)&&(e=d,t=p),(90===o&&n&&!l||270===o&&!n&&l)&&(e=p,t=h),(180===o&&n&&!l||0===o&&!n&&l)&&(e=h,t=v),(270===o&&n&&!l||90===o&&!n&&l)&&(e=v,t=d),0===o||180===o?(i=c,r=u):(i=u,r=c),{x:e,y:t,w:i,h:r}},cropperHeight:function(){if(this.opts.cropperHeight&&this.fullWidth>this.opts.layoutBreakpoint)return this.opts.cropperHeight-80;var e=Math.floor(this.cropperWidth/this.imageRatio),t=this.opts.maxCropperHeight;return t&&t>100&&t<e?t-80:e},cropperRatio:function(){return Math.round(this.cropperWidth/this.cropperHeight*1e3)/1e3},cropperWidth:function(){var e=this.fullWidth-24;return this.fullWidth<=this.opts.layoutBreakpoint||!this.opts.showPreview?e:Math.floor(.65*e)},cx:function(){var e=this.canvas.getBoundingClientRect();return this.mx-e.left},cy:function(){var e=this.canvas.getBoundingClientRect();return this.my-e.top},imageRatio:function(){return this.imageHeight?Math.round(this.imageWidth/this.imageHeight*1e3)/1e3:0},markers:function(){return{nw:{x:this.x-this.opts.handleSize,y:this.y-this.opts.handleSize},ne:{x:this.x+this.w-this.opts.handleSize,y:this.y-this.opts.handleSize},sw:{x:this.x-this.opts.handleSize,y:this.y+this.h-this.opts.handleSize},se:{x:this.x+this.w-this.opts.handleSize,y:this.y+this.h-this.opts.handleSize}}},opts:function(){var e=Object.assign({},this.defaultOptions,this.options);return"circle"===e.cropArea&&(e.aspectRatio=1),e},prevdivHeight:function(){return this.fullWidth>this.opts.layoutBreakpoint?this.cropperHeight:300},prevdivWidth:function(){var e=this.fullWidth-24;return this.fullWidth<=this.opts.layoutBreakpoint?e:Math.floor(.35*e)},previewCanvas:function(){if(!this.image||!this.resultCanvas)return!1;var e=document.createElement("canvas");e.width=this.previewSize.w,e.height=this.previewSize.h;var t=e.getContext("2d");return t.drawImage(this.resultCanvas,0,0,e.width,e.height),e},previewSize:function(){var e,t,i=this.prevdivWidth-20,r=this.prevdivHeight-20,a=Math.round(i/r*1e3)/1e3,s=Math.round(this.resultWidth/this.resultHeight*1e3)/1e3;return s>a?(e=i,t=i/s):(t=r,e=t*s),{w:Math.min(e,this.resultWidth),h:Math.min(t,this.resultHeight)}},resultCanvas:function(){if(!this.image)return!1;var e=document.createElement("canvas");e.width=this.resultWidth,e.height=this.resultHeight;var t=e.getContext("2d");t.save(),this.fliph&&(t.translate(this.previewSize.w,0),t.scale(-1,1)),this.flipv&&(t.translate(0,this.previewSize.h),t.scale(1,-1));var i=90===this.rotation||270===this.rotation,r=i?e.height:e.width,a=i?e.width:e.height;return t.translate(e.width/2,e.height/2),t.rotate(this.rotation*Math.PI/180),t.drawImage(this.image,this.cropData.x,this.cropData.y,this.cropData.w,this.cropData.h,-r/2,-a/2,r,a),t.restore(),e},resultWidth:function(){var e=[this.opts.aspectRatio,this.opts.croppedWidth,this.opts.croppedHeight],t=e[0],i=e[1],r=e[2],a=Math.round(this.imageWidth/this.canvasWidth*1e3)/1e3,s=t||this.w/this.h;if(i&&!r)return i;if(!i&&!r)return Math.round(this.w*a);if(!i&&r)return Math.round(r*s);var o=i/r;return s>=o?i:Math.round(r*s)},resultHeight:function(){var e=[this.opts.aspectRatio,this.opts.croppedWidth,this.opts.croppedHeight],t=e[0],i=e[1],r=e[2],a=Math.round(this.imageHeight/this.canvasHeight*1e3)/1e3,s=t||this.w/this.h;if(r&&!i)return r;if(!i&&!r)return Math.round(this.h*a);if(!r&&i)return Math.round(i/s);var o=i/r;return s<=o?r:Math.round(i/s)}},mounted:function(){this.getFullWidth(),this.$emit("cropper-mounted"),window.addEventListener("resize",this.getFullWidth)},beforeDestroy:function(){this.$emit("cropper-before-destroy"),window.removeEventListener("resize",this.getFullWidth)},methods:{cancelCrop:function(){var e=this.$refs.fileInput;e.type="",e.type="file",this.file=!1,this.$emit("cropper-cancelled")},doCrop:function(){var e=this,t=this.resultCanvas.toDataURL(this.opts.resultMimeType,this.opts.resultQuality),i=this.file.name.lastIndexOf("."),r=this.file.name.substring(0,i),a={originalFile:this.file,filename:r,rotation:this.rotation,cropCoords:this.cropData,flippedH:this.fliph,flippedV:this.flipv,croppedImageURI:t};this.resultCanvas.toBlob((function(t){var i=new Date;if(t.lastModified=i.getTime(),t.lastModifiedDate=i,t.name=r,a.croppedFile=t,e.$emit("cropper-saved",a),e.opts.uploadTo){var s=new FormData;for(var o in a)s.append(o,a[o]);for(var n in e.opts.uploadData)s.append(n,e.opts.uploadData[n]);h.a.post(e.opts.uploadTo,s).then((function(t){e.$emit("cropper-uploaded",t),e.opts.closeOnSave&&(e.file=!1)}))}else e.opts.closeOnSave&&(e.file=!1)}),this.opts.resultMimeType,this.opts.resultQuality)},drawCanvas:function(){this.ctx&&(this.drawImageOnCanvas(),this.drawOverlay(),this.drawMarkers(),this.opts.showPreview&&this.opts.previewOnDrag&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality)))},drawImageOnCanvas:function(){if(this.image){this.ctx.save(),this.fliph&&(this.ctx.translate(this.canvasWidth,0),this.ctx.scale(-1,1)),this.flipv&&(this.ctx.translate(0,this.canvasHeight),this.ctx.scale(1,-1));var e=90===this.rotation||270===this.rotation,t=e?this.canvasHeight:this.canvasWidth,i=e?this.canvasWidth:this.canvasHeight;this.ctx.translate(this.canvasWidth/2,this.canvasHeight/2),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.drawImage(this.image,-t/2,-i/2,t,i),this.ctx.restore()}},drawMarkers:function(){var e=[this.cx,this.cy],t=e[0],i=e[1],r=this.ctx;for(var a in this.canvas.style.cursor="default",this.over=!1,r.beginPath(),"circle"!==this.opts.cropArea?r.rect(this.x,this.y,this.w,this.h):r.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,0,2*Math.PI),r.isPointInPath(t,i)&&(this.over="all",this.canvas.style.cursor="move"),r.setLineDash(this.opts.frameLineDash),r.strokeStyle=this.opts.frameStrokeColor,r.stroke(),r.setLineDash([]),this.markers){var s=this.markers[a];r.beginPath(),r.rect(s.x,s.y,2*this.opts.handleSize,2*this.opts.handleSize),r.fillStyle=this.opts.handleFillColor,r.strokeStyle=this.opts.handleStrokeColor,r.isPointInPath(t,i)&&(r.fillStyle=this.opts.handleHoverFillColor,r.strokeStyle=this.opts.handleHoverStrokeColor,this.canvas.style.cursor=a+"-resize",this.over=a),r.fill(),r.stroke()}},drawOverlay:function(){var e=this.ctx;e.fillStyle=this.opts.overlayFill,e.fillRect(0,0,this.canvasWidth,this.y),e.fillRect(0,this.y,this.x,this.h),e.fillRect(this.x+this.w,this.y,this.canvasWidth-(this.x+this.w),this.h),e.fillRect(0,this.y+this.h,this.canvasWidth,this.canvasHeight-(this.y+this.h)),"circle"===this.opts.cropArea&&(e.beginPath(),e.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,Math.PI,1.5*Math.PI),e.lineTo(this.x,this.y),e.closePath(),e.fill(),e.beginPath(),e.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,1.5*Math.PI,2*Math.PI),e.lineTo(this.x+this.w,this.y),e.closePath(),e.fill(),e.beginPath(),e.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,0,.5*Math.PI),e.lineTo(this.x+this.w,this.y+this.h),e.closePath(),e.fill(),e.beginPath(),e.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,.5*Math.PI,Math.PI),e.lineTo(this.x,this.y+this.h),e.closePath(),e.fill())},dropFile:function(e){var t=e.dataTransfer.files[0];this.useFile(t)},flip:function(e){"v"===e?(this.flipv=!this.flipv,this.y=this.canvasHeight-this.y-this.h):(this.fliph=!this.fliph,this.x=this.canvasWidth-this.x-this.w),this.drawCanvas(),this.opts.showPreview&&!this.opts.previewOnDrag&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality))},getFullWidth:function(){var e=this.$el.getBoundingClientRect();this.fullWidth=e.width,this.$nextTick(this.drawCanvas)},humanFileSize:function(e,t){void 0===t&&(t=!0);var i=t?1e3:1024;if(Math.abs(e)<i)return e+" B";var r=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],a=-1;do{e/=i,++a}while(Math.abs(e)>=i&&a<r.length-1);return e.toFixed(1)+" "+r[a]},moveMouse:function(e){var t=e.clientX||e.touches[0].clientX,i=e.clientY||e.touches[0].clientY,r=t-this.mx,a=i-this.my;this.dragged&&this.updateCoords(r,a),this.mx=t,this.my=i,this.drawCanvas()},rotate:function(e){var t=this,i=[this.canvasWidth,this.canvasHeight];(this.fliph?!this.flipv:this.flipv)?this.rotation-=e:this.rotation+=e,this.rotation>270&&(this.rotation=0),this.rotation<0&&(this.rotation=270);var r=this.imageWidth,a=this.imageHeight;this.imageWidth=a,this.imageHeight=r,this.$nextTick((function(){var e=t.canvasHeight/i[0],r=t.canvasWidth/i[1],a=t.canvasWidth-t.y*r-t.h*r,s=t.x*e,o=t.h*r*t.opts.aspectRatio,n=t.w*e*t.opts.aspectRatio;t.x=Math.round(a),t.y=Math.round(s),t.w=Math.round(o),t.h=Math.round(n),t.updateCoords(),t.drawCanvas(),t.opts.showPreview&&!t.opts.previewOnDrag&&t.previewCanvas&&(t.previewImage=t.previewCanvas.toDataURL("image/jpeg",t.opts.previewQuality))}))},selectFile:function(e){var t=e.currentTarget.files[0];t&&this.useFile(t),this.getFullWidth()},startCanvas:function(){var e=this;if(this.image){this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d");var t=[this.imageRatio,this.opts.aspectRatio],i=t[0],r=t[1];r?r>=i?(this.w=Math.round(this.canvasWidth/2),this.h=Math.round(this.w/r)):(this.h=Math.round(this.canvasHeight/2),this.w=Math.round(this.h*r)):(this.w=Math.round(this.canvasWidth/2),this.h=Math.round(this.canvasHeight/2)),this.x=Math.round((this.canvasWidth-this.w)/2),this.y=Math.round((this.canvasHeight-this.h)/2),this.drawCanvas()}else this.canvas=!1,this.ctx=!1;this.opts.showPreview&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality)),this.canvas.addEventListener("touchstart",(function(t){t.preventDefault(),e.startDrag(t)})),this.canvas.addEventListener("touchend",(function(t){t.preventDefault(),e.stopDrag(t)})),this.canvas.addEventListener("touchmove",(function(t){t.preventDefault(),e.moveMouse(t)}))},startDrag:function(e){void 0!==e.touches&&(this.mx=e.touches[0].clientX,this.my=e.touches[0].clientY,this.drawCanvas()),this.dragged=this.over},stopDrag:function(){this.dragged=!1;var e=this.resultCanvas.toDataURL("image/jpeg",this.opts.previewQuality);this.$emit("cropper-preview",e),this.opts.showPreview&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality))},triggerInput:function(){var e=this.$refs.fileInput;e.click()},updateCoords:function(e,t){var i=this.x,r=this.y,a=this.w,s=this.h,o=this.opts.aspectRatio;switch(this.dragged){case"all":i=this.x+e,r=this.y+t;break;case"nw":i=this.x+e,r=this.y+t,a=this.w-e,s=this.h-t;break;case"ne":r=this.y+t,a=this.w+e,s=this.h-t;break;case"sw":i=this.x+e,a=this.w-e,s=this.h+t;break;case"se":a=this.w+e,s=this.h+t;break}o&&(s=a/o),(a<this.minW||s<this.minH)&&(o&&o>1?(s=this.minH,a=s*o):o&&o<1?(a=this.minW,s=a/o):(a<this.minW&&(a=this.minW),s<this.minH&&(s=this.minH))),a+i>this.canvasWidth&&(a=this.canvasWidth-i,o&&(s=a/o),a/o<this.minH&&o&&o>1&&(s=this.minH,a=s*o,i=this.canvasWidth-a),a<this.minW&&(a=this.minW,i=this.canvasWidth-a)),s+r>this.canvasHeight&&(s=this.canvasHeight-r,o&&(a=s*o),s*o<this.minW&&o&&o<1&&(a=this.minW,s=a/o,r=this.canvasHeight-s),s<this.minH&&(s=this.minH,r=this.canvasHeight-s)),i<0&&(i=0),r<0&&(r=0),this.x=i,this.y=r,this.w=a,this.h=s},useFile:function(e){if(-1!==this.allowedMimeTypes.indexOf(e.type))if(this.opts.maxFileSize&&e.size>this.opts.maxFileSize){var t=this.humanFileSize(e.size);this.$emit("cropper-error","File too large ("+t+")! Max file size is "+this.humanFileSize(this.opts.maxFileSize))}else this.file=e,this.$emit("cropper-file-selected",e);else this.$emit("cropper-error","Wrong file type: "+e.type)}},watch:{file:function(e){var t=this;this.rotation=0,this.fliph=!1,this.flipv=!1;var i=new FileReader;i.onload=function(e){var i=new Image;i.onload=function(){t.imageWidth=i.width,t.imageHeight=i.height,t.image=i,t.loadingImage=!1,t.$nextTick(t.startCanvas)},i.onerror=function(e){t.loadingImage=!1,t.imageWidth=0,t.imageHeight=0,t.image=!1,t.file=!1,t.$emit("cropper-error","Image reading error"+e)};var r=t.$refs.fileInput;r.val="",i.src=e.target.result},i.onerror=function(e){t.file=!1,t.$emit("cropper-error","File reading error"+e)},e?i.readAsDataURL(this.file):(this.imageWidth=0,this.imageHeight=0,this.image=!1)}}},c=p,u=(i("475e"),i("2877")),d=Object(u["a"])(c,o,n,!1,null,null,null),v=d.exports,m={name:"app",data:function(){return{closeOnSave:!0,cropArea:"box",croppedHeight:400,croppedWidth:400,dropareaMessage:"Drop file here or use the button below.",frameLineDash:[5,3],frameStrokeColor:"rgba(255, 255, 255, 0.8)",handleFillColor:"rgba(255, 255, 255, 0.2)",handleHoverFillColor:"rgba(255, 255, 255, 0.4)",handleHoverStrokeColor:"rgba(255, 255, 255, 1)",handleSize:10,handleStrokeColor:"rgba(255, 255, 255, 0.8)",layoutBreakpoint:850,maxCropperHeight:768,maxFileSize:4e6,overlayFill:"rgba(0, 0, 0, 0.5)",previewOnDrag:!0,previewQuality:.65,resultQuality:.8,resultMimeType:"image/jpeg",selectButtonLabel:"Select File",showPreview:!0,skin:"light",uploadData:{},uploadTo:!1,cropperH:500,useCropperH:!1,dash:"",upl:"/api/upload-file.php",useAr:!0,ar:1,events:[]}},computed:{options:function(){return{aspectRatio:this.aspectRatio,closeOnSave:this.closeOnSave,cropArea:this.cropArea,croppedHeight:this.croppedHeight,croppedWidth:this.croppedWidth,cropperHeight:this.cropperHeight,dropareaMessage:this.dropareaMessage,frameLineDash:this.frameLineDash,frameStrokeColor:this.frameStrokeColor,handleFillColor:this.handleFillColor,handleHoverFillColor:this.handleHoverFillColor,handleHoverStrokeColor:this.handleHoverStrokeColor,handleSize:this.handleSize,handleStrokeColor:this.handleStrokeColor,layoutBreakpoint:this.layoutBreakpoint,maxCropperHeight:this.maxCropperHeight,maxFileSize:this.maxFileSize,overlayFill:this.overlayFill,previewOnDrag:this.previewOnDrag,previewQuality:this.previewQuality,resultQuality:this.resultQuality,resultMimeType:this.resultMimeType,selectButtonLabel:this.selectButtonLabel,showPreview:this.showPreview,skin:this.skin,uploadData:this.uploadData,uploadTo:this.uploadTo}},cropperHeight:function(){return!!this.useCropperH&&this.cropperH},aspectRatio:function(){return!!this.useAr&&this.ar}},methods:{debug:function(e,t){this.events.unshift({name:t,payload:e}),this.events.lenght>10&&this.events.pop()},printEv:function(e){if(void 0===e.payload)return"No payload";if("cropper-preview"===e.name)return'Image data URI<br/><img src="'+e.payload+'" alt="" style="max-width: 100px;"/>';if("cropper-error"===e.name)return e.payload;if("cropper-file-selected"===e.name)return"Payload: selected file";if("cropper-saved"===e.name){var t=e.payload,i="<div><strong>cropCoords</strong><br/>";for(var r in t.cropCoords)i+=r+": "+t.cropCoords[r]+"<br/>";return i+="</div>",i+="<div><strong>croppedFile</strong><br/>Blob</div>",i+='<div><strong>croppedImageURI</strong><br/><img src="'+t.croppedImageURI+'" alt="" style="max-width: 100px;"/></div>',i+="<div><strong>filename</strong><br/>"+t.filename+"</div>",i+="<div><strong>flippedH</strong><br/>"+t.flippedH+"</div>",i+="<div><strong>flippedV</strong><br/>"+t.flippedV+"</div>",i+="<div><strong>originalFile</strong><br/>File</div>",i+="<div><strong>rotation</strong><br/>"+t.rotation+"</div>",i}},addDash:function(e){var t=parseInt(e.target.value.trim());isNaN(t)||this.frameLineDash.push(t),this.dash=""},removeDash:function(e){this.frameLineDash.splice(e,1)}},components:{VueAnkaCropper:v}},f=m,g=(i("5c0b"),Object(u["a"])(f,a,s,!1,null,null,null)),w=g.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(w)}}).$mount("#app")},"5c0b":function(e,t,i){"use strict";var r=i("e332"),a=i.n(r);a.a},e332:function(e,t,i){}});
//# sourceMappingURL=app.99027ee4.js.map