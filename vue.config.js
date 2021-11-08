module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ban-pick/' // Thay tên repository của các bạn vào đây nhé
    : './'
}
