/* eslint-disable import/no-extraneous-dependencies */
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
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  resolve: {
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