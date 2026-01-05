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
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
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
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                quietDeps: true, // ✅ Придушує Sass deprecation warnings
                includePaths: []
              }
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource', // ✅ Замість file-loader (застарів)
        generator: {
          filename: 'images/[hash][ext][query]'
        },
        exclude: /fonts/ // Виключаємо SVG шрифти
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(otf|eot|ttf|woff2?|svg)$/,
        type: 'asset/inline', // ✅ Замість url-loader (застарів)
        include: /fonts/, // Тільки шрифти
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // 8kb limit
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] // ✅ Додано .tsx
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './app/index.html',
      inject: 'body' // ✅ Додано для правильної інжекції скриптів
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      HASH: JSON.stringify(Date.now().toString(16)) // ✅ Виправлено синтаксис
    })
  ],
  // ✅ Додано devServer конфігурацію
  devServer: {
    static: {
      directory: path.join(__dirname, 'build')
    },
    compress: true,
    port: 8081,
    hot: true,
    open: true
  }
};