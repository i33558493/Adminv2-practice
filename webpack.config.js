const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js',
    publicPath: '/dist/' //默认根目录，改指定为dist
  },
  module: {
    rules: [
      //react(jsx)语法
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      //css文件
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //sass文件
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },

      //图片加载
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      //字体图标加载
      {
        //正则表达式加入对字体版本后缀字符串的匹配
        test: /\.(eot|svg|ttf|woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // name: './font/[hash:16].[ext]'  //暂无作用
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    //处理HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //编译前清理文件夹
    new CleanWebpackPlugin()
  ],
  devServer: {
    // contentBase: './dist'
    port: 8086
  }
};
