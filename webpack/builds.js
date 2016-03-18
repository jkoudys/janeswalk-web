const webpack = require('webpack');
const paths = require('./paths');

const wpModules = {
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
};

const production = {
  entry: [paths.jsx_app],
  output: {
    path: paths.js,
    filename: 'janeswalk.min.js',
  },
  module: wpModules,
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
};

const dev = {
  entry: [paths.jsx_app],
  output: {
    path: paths.js,
    filename: 'janeswalk.js',
  },
  module: wpModules,
  watch: true,
};

module.exports = { production, dev };
