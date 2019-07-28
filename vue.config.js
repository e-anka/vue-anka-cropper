// vue.config.js
module.exports = {
    devServer: {
        proxy: 'http://localhost/vue-anka-cropper/'
        },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-anka-cropper/'
    : '/'
}
