const webpack = require("webpack");
module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath:
    process.env.NODE_ENV === "production"
      ? "./" // Thay tên repository của các bạn vào đây nhé
      : "./",
  devServer: {
    port: 3000,
  },
};
