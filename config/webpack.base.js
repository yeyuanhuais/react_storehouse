const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const AppConfig = require("../app.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const sourceMap = false; //生不生map
const resolve = (relatedPath) => {
  return path.join(__dirname, relatedPath);
};
const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};
module.exports = {
  context: resolve("../"),
  entry: {
    main: "./src/main",
  },
  output: {
    path: resolve("../dist"),
    filename: isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    chunkFilename: isDev ? "js/[contenthash:8].js" : "js/[contenthash:8].js",
    publicPath: "/",
    // library: {
    //   name: AppConfig.appName,
    //   type: "umd",
    // },
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".json"],
    modules: ["../node_modules"],
    alias: {
      "@": resolve("../src"),
      components: resolve("../src/components"),
      pages: resolve("../src/pages"),
      assets: resolve("../src/assets"),
      plugins: resolve("../src/plugins"),
      ...(AppConfig.alias || {}),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage", // babel 就可以按需加载 polyfill，并且不需要手动引入 @babel/polyfill：
                    targets: "> 1%,last 2 versions,not ie <= 11",
                    corejs: 2,
                  },
                ],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: 2,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                  },
                ],
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                "@babel/plugin-proposal-class-properties",
                [
                  "import",
                  {
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true, // `style: true` 会加载 less 文件
                  },
                ],
              ],
            },
          },
          // {
          //   loader: "ts-loader",
          //   options: {
          //     transpileOnly: true,
          //     happyPackMode: false,
          //   },
          // },
        ],
      },
      {
        test: /\.(css|less)$/i,
        use: [
          isDev ? "style-loader" : { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap,
              modules: {
                mode: "local",
                localIdentName: "[local]--[hash:base64:5]",
                auto: (resourcePath) => {
                  return !/(\/|\\)node_modules(\/|\\)|(\/|\\)src(\/|\\)assets/g.test(resourcePath);
                },
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  hack: `true; @import "${resolve("../src/assets/style/theme.less")}";`,
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "img/[hash][ext][query]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "media/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.bpmn$/i,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.title": JSON.stringify(AppConfig.title),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: resolve("../public/favicon.ico"),
      hash: false, //防止相同缓存
      inject: true,
      filename: "index.html",
      templateParameters: {
        title: AppConfig.title || "",
        isdev: process.env.NODE_ENV === "development",
      },
      minify: isDev ? {} : { minify },
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "public",
        },
      ],
    }),
  ],
  stats: "errors-warnings",
  node: {
    global: true,
  },
};
