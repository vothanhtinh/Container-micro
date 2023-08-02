const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: [path.resolve("./src/index.ts")],
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    crossOriginLoading: "anonymous",
  },
  devServer: {
    open: false,
    hot: true,
    historyApiFallback: true,
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        Products: "Products@http://localhost:3001/product.js",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-redux": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-redux"],
        },
        "@reduxjs/toolkit": {
          singleton: true,
          eager: true,
          requiredVersion: deps["@reduxjs/toolkit"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
      filename: "./index.html",
      chunksSortMode: "none",
    }),
  ],
};
