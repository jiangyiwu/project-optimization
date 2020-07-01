process.env.NODE_ENV = 'production';
const merge = require('webpack-merge');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { resolve } = require('path');
const commons = require('./webpack.base.js');

module.exports = merge(commons, {
  mode: 'production',
  output: {
    publicPath: '/', // 所有资源引入公共路径前缀
    chunkFilename: '[name]_chunk.js', // 非入口chunk名称，比如代码分割的chunk用这个命名方式
    library: '[name]', // 整个库向外暴露的变量名
    /**
     * 变量名添加到哪个属性上面，这里为browser下 window对象
     * global node环境
     * commonjs: 模块化语法引入
     */
    libraryTarget: 'window', 
  },
  devtool: 'nosources-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash:10].css',
      chunkFilename: '[id].[contenthash:10].css',
    }),
    new optimizeCssAssetsWebpackPlugin(),
    // 告诉webpack哪些库不参与打包
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, '../dll_config/manifest.json')
    }),
    // 将打包的库添加到html里面
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, '../dll_config/react.js')
    })
  ]
});
