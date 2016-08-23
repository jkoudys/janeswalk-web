const webpack = require('webpack');
const paths = require('./paths');

const base = {
  entry: [paths.jsx_app],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
      },
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
};

const production = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  watch: false,
});

const dev = Object.assign({}, base, {
  output: {
    path: paths.js,
    filename: 'janeswalk.js',
  },
  watch: true,
});

module.exports = { production, dev };
