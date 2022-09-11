/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs'
import path from 'path'
import 'webpack-dev-server'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const getRoot = (dir: string): string => {
  if (fs.existsSync(path.resolve(dir, 'package.json'))) {
    return dir
  }
  return getRoot(path.resolve(dir, '..'))
}

const isDevelopment = process.env.NODE_ENV === 'development'
const projectRoot = getRoot(__dirname)

const PATHS = {
  src: path.resolve(projectRoot, 'src'),
  dist: path.resolve(projectRoot, 'dist'),
  build: path.resolve(projectRoot, 'build'),
}

const config: webpack.Configuration = {
  mode: 'development',
  target: 'web',
  entry: path.resolve(PATHS.src, 'index.ts'),
  output: {
    path: PATHS.dist,
    filename: '[name]-[fullhash].js',
    chunkFilename: '[name].bundle-[fullhash].js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      'handlebars/runtime': '/node_modules/handlebars/dist/handlebars.runtime.min.js',      
      'handlebars': '/node_modules/handlebars/dist/handlebars.min.js',
    },
    extensions: ['.ts', '.js', '.css'],
  },
  devServer: {
    static: {
      directory: PATHS.dist,
    },
    compress: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(projectRoot, 'tsconfig.json'),
          },
        },
      ],
      exclude: /(node_modules)/,
    },
    {
      test: /\.hbs/,
      loader: 'handlebars-loader',
      exclude: /(node_modules|bower_components)/
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "/public/path/to/",
          },
        },
        'css-loader'
      ],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader'
    },
    {
      test: /\.svg$/,
      loader: 'svg-url-loader'
    }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.src, 'index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css',
    }),
  ],
}

export default config
