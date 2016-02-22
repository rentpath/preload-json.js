var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'lib/preload-json.js' },
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
