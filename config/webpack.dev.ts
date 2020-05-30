import merge from "webpack-merge";
import commonConfig from "./webpack.common";
import webpack from "webpack";

const devConfig: webpack.Configuration = {
  devServer: {
    port: 3000,
    hot: true,
    stats: {
      modules: false
    },
    historyApiFallback: true,
    proxy: {
      "/api/v1/": {
        target: "http://lms-dev.pakhomov.im/",
        secure: false,
        changeOrigin: true
      }
    }
  },
  mode: "development",
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.(scss|sass)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.module\.(scss|sass)$/i,
        use: [
          "style-loader",
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
  }
};

export default merge(commonConfig, devConfig);

