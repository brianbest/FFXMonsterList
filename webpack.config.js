import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    main: path.resolve(process.cwd(), './src/app.js')
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  devServer:{
    static: "./dist",
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Brian's Website",
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    tailwindcss,
  ],
  resolve: { extensions: ["*", ".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx|cjs)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    tailwindcss,
                    autoprefixer
                  ];
                }
              }
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  }
}