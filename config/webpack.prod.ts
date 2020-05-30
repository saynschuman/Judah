import webpack from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import paths from "./path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const prodConfig: webpack.Configuration = {
  entry: paths.entryMain,
  mode: "production",
  devtool: "inline-source-map",
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: "disabled" })
  ],
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: paths.absolute.dist,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.(scss|sass)$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.module\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]-[local]-[hash:base64:5]"
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

export default merge(commonConfig, prodConfig);

