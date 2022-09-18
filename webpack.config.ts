/* eslint-disable import/no-extraneous-dependencies */
<<<<<<< HEAD
import fs from "fs";
import path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const getRoot = (dir: string): string => {
  if (fs.existsSync(path.resolve(dir, "package.json"))) {
    return dir;
  }
  return getRoot(path.resolve(dir, ".."));
};

const isDevelopment = process.env.NODE_ENV === "development";
const projectRoot = getRoot(__dirname);

const config: webpack.Configuration = {
  mode: "development",
  target: "web",
  entry: path.resolve(projectRoot, "src", "index.ts"),
  output: {
    path: projectRoot + "/dist",
    filename: "[name]-[fullhash].js",
    chunkFilename: "[name].bundle-[fullhash].js",
    publicPath: "/",
=======
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
>>>>>>> main
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
<<<<<<< HEAD
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
=======
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
>>>>>>> main
          enforce: true,
        },
      },
    },
  },
  resolve: {
<<<<<<< HEAD
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve("tsconfig.json"),
      }),
    ],
    extensions: [".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              context: __dirname,
              configFile: path.resolve("tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(css)$/,
        resolve: { extensions: [".css"] },
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: `postcss-loader`,
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "./",
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [
    require("autoprefixer"),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, "src", "index.html"),
      filename: "index.html",
=======
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
>>>>>>> main
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
<<<<<<< HEAD
      filename: isDevelopment ? "[name].css" : "[name].[fullhash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[fullhash].css",
    }),
  ],
};

export default config;
=======
      filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css',
    }),
  ],
}

export default config
>>>>>>> main
