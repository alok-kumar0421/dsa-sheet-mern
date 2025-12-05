const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" }); // <--- important

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/_redirects" }] 
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL)
    })
  ]
};
