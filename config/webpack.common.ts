import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import paths from "./path";

const commonConfig: webpack.Configuration = {
  entry: ["react-hot-loader/patch", paths.entryMain],
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    path: paths.absolute.dist,
    publicPath: "/",
  },
  resolve: {
    modules: [paths.absolute.src, "node_modules"],
    extensions: [".tsx", ".js", ".jsx", ".scss", ".css", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({ favicon: paths.favicon, template: paths.htmlTemplate }),
    new webpack.ProgressPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
      {
        test: /\.(ts|js|tsx|jsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["react-hot-loader/babel", "@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(woff|otf)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};

export default commonConfig;
