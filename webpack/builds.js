const webpack = require('webpack');
const precss = require('precss');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ImportPlugin = require('babel-plugin-import');

const base = {
  entry: [paths.js_app, ...paths.js_blocks],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?-url' }),
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?-url!less-loader?-relativeUrls' }),
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },

  plugins: [
    new ExtractTextPlugin({ filename: '../css/janeswalk.css', allChunks: true }),
  ],
};

const prod = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.min.js',
  },
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]),
});

const dev = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.js',
  },
});

module.exports = { prod, dev };
