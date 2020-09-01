const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path');
module.exports = {
   context: __dirname,
   entry: './src/index.js',
   mode:'production',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
         },
         {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
      ]
   },
   // webpack stuff here ...

   //dev server configuration
   devServer: {

      // ...

      // every request made to 'locahost:8080/api/xxxx' will be proxyfied to 'http://localhost:7000/api/xxxx'
      proxy: {
         "/api/*": {
            target: "http://localhost:5000",
            secure: false,
            rewrite: function (req, options) {
               //you can handle rewrite here if you need to        
            }
         },

      }
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve(__dirname, 'src/public/index.html'),
         filename: 'index.html'
      }),
      new WorkboxPlugin.GenerateSW(),
      new MiniCssExtractPlugin({filename: '[name].css'})
   ],

};