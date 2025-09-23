const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, './app/index.ts')
  },

  output: {
    path: path.join(__dirname, './build'),
    publicPath: "/",
    filename: '[name].bundle.js' //adding [name], fixed bug with multi-loading
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 65 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(otf|eot|svg|ttf|woff2?|woff)$/,
        use: 'url-loader?limit=8192',
        exclude: /img/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html' }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      HASH: JSON.stringify(new Date().getTime().toString(16))
    })
  ],

  // 👇 додано для webpack-dev-server v5
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // як у тебе було в логах
    },
    port: 8081,
    hot: true,
    open: true,
    historyApiFallback: true
  }
}
