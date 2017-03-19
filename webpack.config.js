 var path = require('path');
 var webpack = require('webpack');
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'app'),
         filename: 'index.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     }
 };
