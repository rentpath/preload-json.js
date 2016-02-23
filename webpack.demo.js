var webpack = require('webpack')

module.exports = {
  entry: './src/demo.js',
  output: { path: __dirname + '/demo', filename: 'demo.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
