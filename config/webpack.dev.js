const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const AppConfig = require("../app.config");
const webpackConfigBase = require("./webpack.base");
const chalk = require("chalk");

console.log(`${chalk.green("The current running environments：")}${chalk.blue("development")}`);

const webpackConfigDev = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"),
    },
    historyApiFallback: true,
    open: AppConfig.autoOpen || false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    hot: true,
    client: {
      logging: "error",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    allowedHosts: "all",
    port: AppConfig.port,
    proxy: AppConfig.proxy || {},
  },
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
