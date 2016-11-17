/*
 * gulpfile.js
 *
 * All automated tasks should find a home in here.
 */

const gulp = require('gulp');
const gettextParser = require('gettext-parser');
const gutil = require('gulp-util');
const less = require('gulp-less');
const through = require('through2');
const webpack = require('webpack');
const builds = require('./webpack/builds.js');
const paths = require('./webpack/paths.js');

gulp.task('prod', () => {
  webpack(builds.production, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  });
});

gulp.task('css', () => (
  gulp.src(paths.less)
    .pipe(less({ compress: false }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest(paths.css))
));

gulp.task('watch.css', () => {
  gulp.watch(`${paths.css}**/*.less`, ['css']);
});

/**/
gulp.task('js', () => {
  gulp.run('js.theme', 'js.blocks', 'js.global');
});

gulp.task('js.theme', () => {
  webpack(builds.dev, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  });
});
gulp.task('js.blocks', () => {
  [
    './blocks/page_list/templates/typeahead/',
    './blocks/page_list/templates/walk_filters/',
  ].map(entry => webpack({
    entry: [`${entry}block.js`],
    output: {
      path: entry,
      filename: 'view.js',
    },
    module: {
      loaders: [{
        test: /\.less$/,
        loader: 'style!css!less',
      }, {
        test: /\.jsx?$/,
        exclude: /(bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      }],
    },
    watch: true,
  }, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  }));
});

gulp.task('js.global', () => {
  webpack({
    entry: ['babel-polyfill', 'whatwg-fetch', 'intl', 'intl/locale-data/jsonp/en.js', './js/sticky.js', './js/shims.js', './js/jwobject.js'],
    output: {
      path: './js',
      filename: 'jwglobal.js',
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(bower_components|node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      }],
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.ProvidePlugin({ require: 'requirejs/require' }),
    ],
    watch: true,
  }, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  });
});


// Build JSON from the mo files
gulp.task('i18n.json', () => {
  gulp.src(paths.mos)
    .pipe(
      (() => {
        const stream = through.obj((file, enc, cb) => {
          const trans = gettextParser.mo.parse(file.contents);

          // Remove redundant ID, as that's the key already
          for (const i in trans.translations) {
            for (const j in trans.translations[i]) {
              const plural = trans.translations[i][j].msgid_plural;
              if (plural) {
                // Build the key for plurals as singular_plural
                trans.translations[i][`${j}_${plural}`] =
                  trans.translations[i][j].msgstr;
                delete trans.translations[i][j];
              } else {
                trans.translations[i][j] = trans.translations[i][j].msgstr;
              }
            }
          }

          file.contents = new Buffer(JSON.stringify(trans));
          file.path = gutil.replaceExtension(file.path, '.json');
          cb(null, file);
        });
        return stream;
      })())
    .pipe(gulp.dest(paths.languages));
});

// Placeholder for 'download po and build mos' task
gulp.task('i18n.mo', () => {
  const options = {
    username: 'janeswalk_anon',
    password: 'anonemouse',
  };
  return options;
});

gulp.task('watch', () => {
  gulp.watch(`${paths.css}**/*.less`, ['css']);
  gulp.watch(paths.jsx, ['js.theme']);
  gulp.watch(paths.jsx_views, ['js.theme']);
  gulp.watch('./blocks/**/*.jsx', ['js.blocks']);
});

gulp.task('default', () => {
  // place code for your default task here
  gulp.run('js.theme', 'watch.css', 'js.blocks', 'js.global');
});
