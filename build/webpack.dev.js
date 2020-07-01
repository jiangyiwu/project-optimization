const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
process.env.NODE_ENV = 'development';
const commons = require('./webpack.base.js');

module.exports = merge(commons, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true, // 启动gzip压缩
    port: 9000,
    clientLogLevel: 'none',
    // quiet: true
    // 代理服务器
    proxy: {
      // 在devServer中有/api/***请求，转发到target指向的服务器
      '/api': {
        target: 'https:***.***./',
        // 发送请求时，请求路径重写。 将/api/*** ---》 /** 去掉/api
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:10].css',
      chunkFilename: '[id].[hash:10].css',
    })
  ],
  /**
   * devtool  内联：在文件内部生成sourc-map  外部：在外部单独生成source-map文件
   * source-map: 提示错误信息，并提供源代码错误位置（外部）
   * inline-source-map: 提示错误信息，并提供源代码错误位置，精确到列（内联）
   * hidden-source-map: 提示错误代码原因，没有源代码错误位置，只有构建后错误代码位置（外部）（作用： 隐藏源代码）
   * eval-source-map: 提示错误信息，并提供源代码错误位置（内联|每一个文件都生成一个相对应的source-map）
   * nosources-source-map: 提示错误信息,没有任何源代码信息（外部）（作用： 隐藏源代码）
   * cheap-source-map: 提示错误信息，并提供源代码错误位置，精确到行，不精确到列（外部）
   * cheap-module-source-map: 提示错误信息，提示源代码位置（外部）
   * 
   * 速度：eval>inline>cheap...
   * eval-cheap-source-map > eval-source-map
   * 
   * 调试友好：
   * source-map
   * cheap-module-source-map
   * cheap-source-map
   * 
   * 综上
   * 开发环境推荐： eval-source-map
   * 生产环境推荐： 需要隐藏源代码: nosources-source-map(全部隐藏)|hidden-source-map（只隐藏源代码，会提示构建后代码错误信息）
   * 无需隐藏源代码只需要提供速度: source-map|cheap-module-source-map
   */
  devtool: 'eval-source-map'
});
