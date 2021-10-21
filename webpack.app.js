const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  experiments: {
    asset: true
  },
  entry: {
    app: './src/index.js',
    appSettings: './src/settings.js'
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: 'svgo-loader',
        type: 'asset'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      /*{ test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },*/
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.jsx',
      '.vue',
      '.json',
    ],
    alias: {
      /* vue: 'vue/dist/vue.esm-bundler.js'*/
      assets: path.resolve(__dirname, 'img')
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jQuery",
      "window.jQuery": "jquery"
    }),
  ]
};