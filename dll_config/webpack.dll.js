/**
 * 使用dll将一些第三方库单独打包，然后加到html里面
 * 常用的有vue、react、react Dom 、jquery、 ajax等
 */

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    // 打包生成的值为react
    'react': ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, './'),
    library: '[name]_[hash]', // 打包库向外暴露出去内容的名字
  },
  plugins: [
    // 打包生产一个manifest.json的映射文件 --》 提供react库的映射关系
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的名称
      path: resolve(__dirname, 'manifest.json') // 输出文件路径
    })
  ]
}