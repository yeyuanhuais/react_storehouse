const path = require("path");
const AppConfig = require("../app.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpackConfigBase = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const chalk = require("chalk");

console.log(`${chalk.green("The current running environments：")}${chalk.blue("production")}`);
const webpackConfigProd = {
  mode: "production",
  devtool: false,
  optimization: {
    removeAvailableModules: false,
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          maxSize: 200 * 1024,
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[contenthash:8].css",
      ignoreOrder: true,
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: AppConfig.analyzer ? "server" : "disabled",
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          delete: ["./dist.zip"],
          archive: [
            {
              source: "./dist",
              destination: "./dist.zip",
            },
          ],
        },
      },
    }),
  ],
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
