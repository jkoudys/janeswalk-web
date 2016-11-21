const webpack = require('webpack');
const precss = require('precss');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const base = {
  entry: [paths.jsx_app],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?-url'),
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url!less-loader?-relativeUrls'),
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },

  postcss: () => [precss],

  plugins: [
    new ExtractTextPlugin('../css/janeswalk.css', { allChunks: true }),
  ],
};

const prod = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.min.js',
  },
  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});

const dev = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.js',
  },
});

module.exports = { prod, dev };
