const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const ENTRY_PATH = path.resolve(__dirname, 'src/main');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: ENTRY_PATH,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // so that it can watch for other changes
    static: DIST_PATH,
    hot: true // hot reload, save to refresh
  },
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].[contenthash].js',
    path: DIST_PATH,
    clean: true // remove existing previous bundles
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'read.html',
      template: path.resolve(__dirname, 'src/read.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'hear.html',
      template: path.resolve(__dirname, 'src/hear.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'contacts.html',
      template: path.resolve(__dirname, 'src/contacts.html')
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/robots.txt', to: 'robots.txt' },
        { from: 'src/favicon.ico', to: 'favicon.ico' },
      ]
    }),
    new ESLintPlugin({
      extensions: [ '.tsx', '.ts', '.js' ],
      exclude: 'node_modules'
    })
  ]
};
