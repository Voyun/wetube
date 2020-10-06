"use strict";

var path = require("path"); // const ExtractCSS = require("extract-text-webpack-plugin");


var MiniExtractCSS = require("mini-css-extract-plugin");

var autoprefixer = require("autoprefixer");

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
var OUTPUT_DIR = path.resolve(__dirname, "static");
var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniExtractCSS.loader,
        options: {
          hmr: process.env.WEBPACK_ENV === "development"
        }
      }, "css-loader", {
        loader: "postcss-loader",
        options: {
          plugins: function plugins() {
            return [autoprefixer({
              overrideBrowserslist: "cover 99.5%"
            })];
          }
        }
      }, "sass-loader"]
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new MiniExtractCSS({
    filename: "styles.css"
  })]
};
module.exports = config;