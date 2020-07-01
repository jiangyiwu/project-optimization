const devMode = process.env.NODE_ENV === 'development';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 缓存
 * 1、babel缓存
 * cacheDirectory: true
 * 第二次打包速度更快
 * 
 * 2、文件缓存
 * 代码上线后，更好使用，利用缓存
 * 
 * hash: 每次构建webpack都会生成一个唯一的hash值
 * 问题: js和css都是使用同一个hash，导致如果只修改js或者css的情况下，重新打包后，导致所有文件名被修改，缓存失效
 * 
 * chunkhash:根据chunk生成hash值，如果打包来源于同一个chunk，那么hash值就一样
 * 问题: js和css的hash值还是一样，因为css是在js中被引入，依旧未曾解决第一中方式hash导致的缓存问题。
 * 
 * contenthash:根据文件内容生成hash值，不同文件hash值不一样，修改某个文件后，仅对修改文件进行构建，
 * 生成带有新的hash值的文件，未修改的文件缓存依然有效。
 */

 /**
  * tree shaking（树摇）顾名思义 摇晃树木使得落叶掉下，意为去除无用代码（webpack4摇得不彻底，webpack5会死命摇）
  * 前提：需使用es6模块化，开启production环境
  * 作用： 减少代码体积
  * 影响： 可能会导致构建的时候，干掉css文件或者@babel/polyfill
  * （会认为这些代码是无用代码，因为没有地方用到）设置"sideEffects":false可查看现象
  * 解决办法：在package.json中增加"sideEffects":["*.css", "*.scss"]
  */

const { resolve } = path;

module.exports = {
  entry: {
    // 将html文件在入口引入是为了在开启热更新后，可以及时更新html文件，否则在html文件修改后，不会自动更新
    index: [resolve(__dirname, '../index/index.js'), resolve(__dirname, '../index/template.html')],
    lazyLoad: resolve(__dirname, '../lazyload/index.js'),
    tsPage: resolve(__dirname, '../tsPage/index.ts')
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:10].js'
  },
  module: {
    rules: [
      {
        // 以下loader只会匹配一个 提升构建速度
        // 使用oneOf不能有两个配置处理同一种类型的文件，因为只会使用一个处理；可以提取其他的出去，这里只保留一个
        oneOf: [
          {
            test: /\.(png|jpg|gif|jepg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 20 * 1024,
                  name: '[hash:10].[ext]' //[hash:10]取前10位hash [ext]使用图片原扩展名
                }
              }
            ]
          },
          // 用于处理html中img标签中引入的图片被url-loader解析
          {
            test: /\.html$/,
            use:['html-loader']
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            // 只对src目录下的资源进行处理
            // include: resolve(__dirname, '/src'),
            // enforce: 'pre', // pre 优先执行 post延后执行
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    // {
                    //   // 按需加载
                    //   useBuiltIns: 'usage',
                    //   // 指定版本
                    //   corejs: {
                    //     version: 3
                    //   },
                    //   // 指定具体兼容到哪个版本浏览器
                    //   targets: {
                    //     chrome: '60',
                    //     firefox: '60',
                    //     ie: '9',
                    //     safari: '10',
                    //     edge: '17'
                    //   }
                    // }
                  ]
                ],
                plugins: ['@babel/plugin-transform-react-jsx'],
                // 开启babel缓存。第二次构建时，会读取之前的缓存，没有发生变化的模版将不会再次构建，提升构建速度
                cacheDirectory: true
              }
            }
          },
          {
            test: /\.(c|sc|sa)ss$/,
            use: [
              // 开发环境用style-loader 用于热更新css,提高开发更新效率
              devMode ? "style-loader" : MiniCssExtractPlugin.loader, // 将 JS 字符串生成为 style 节点
              'css-loader', // 将 CSS 转化成 CommonJS 模块
              'sass-loader', // 将 Sass 编译成 CSS
              // 帮postcss找到package.json中browserlist里面的配置，通过配置加载指定css兼容性样式
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')()
                  ]
                }
              }
            ]
          },
          {
            test: /\.tsx?$/,
            use: ['ts-loader'],
            exclude: /node_modules/
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react',
      filename: 'index.html',
      template: resolve(__dirname, '../index/template.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'lazyLoad.html',
      template: resolve(__dirname, '../lazyload/index.html'),
      chunks: ['lazyLoad']
    }),
    new HtmlWebpackPlugin({
      filename: 'tsPage.html',
      template: resolve(__dirname, '../tsPage/index.html'),
      chunks: ['tsPage']
    })
  ],
  /**
   * 可以将node_modules中的代码单独打包一个chunk输出
   * 自动分析多入口是否有公共的依赖，如果有就会提取单独打包一个chunk
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 修改a文件导致b文件hash值变化，导致缓存失效。
    runtimeChunk: {
      name: entrypoint => `runtime_${entrypoint.name}`
    }
  },
  // 拒绝将js内部引用的jQuery打包进去；使用该属性后，需要在html将拒绝打包的资源单独引入
  externals: {
    jquery: 'jQuery'
  },
  // 解析模块的规则
  resolve: {
    // 配置解析模块别名 简写路径
    // 如果需要在css中引用图片地址 需要用～'图片路径' ~@images...
    alias: {
      '$css': resolve(__dirname, 'src/css'),
      '@images': resolve(__dirname, 'src/images')
    },
    // 忽略文件后缀名
    extensions: ['.js', '.json', '.vue', '.ts']
  }
}
