/*
 * gulpfile.js
 *
 * All automated tasks should find a home in here.
 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const gettextParser = require('gettext-parser');
const gutil = require('gulp-util');
const less = require('gulp-less');
const through = require('through2');
const webpack = require('webpack');
const builds = require('./webpack/builds.js');

const paths = {
  js: './themes/janeswalk/js',
  js_lib: [
    './themes/janeswalk/js/app.js',
    './themes/janeswalk/js/extend.js',
    './themes/janeswalk/js/shims.js',
    './themes/janeswalk/js/tiny-pubsub.js',
  ],
  jsx_app: './themes/janeswalk/js/router.jsx',
  jsx_views: ['./themes/janeswalk/js/router.jsx'],
  jsx: ['./themes/janeswalk/js/components/**/*.jsx'],
  languages: './languages',
  mos: ['./languages/*/*.mo'],
  less: ['./themes/janeswalk/css/main.less'],
  css: './themes/janeswalk/css/',
  react_views: './themes/janeswalk/js/components/',
};

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
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest(paths.css))
));

gulp.task('watch.css', () => {
  gulp.watch(`${paths.css}**/*.less`, ['css']);
});

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
  /*
  // Run for each block view in array
  return [
    './blocks/search/templates/header/',
    './blocks/page_list/templates/typeahead/',
    './blocks/page_list/templates/walk_filters/'
  ].map(function(template) {
    return browserify({
      entries: template + 'view.jsx',
      transform: [babelify.configure({optional: ['optimisation.react.inlineElements']})],
      extensions: ['.jsx', '.es6']
    })
    .bundle()
    .pipe(source('view.js'))
    .pipe(gulp.dest(template))
  });
*/
  [
//    './blocks/search/templates/header/',
    './blocks/page_list/templates/typeahead/',
    './blocks/page_list/templates/walk_filters/',
  ].map(entry => webpack({
    entry: [`${entry}view.jsx`],
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
          presets: ['es2015', 'react'],
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
    entry: ['babel-polyfill', './js/jwobject.jsx'],
    output: {
      path: './js',
      filename: 'jwglobal.js',
    },
    module: {
      loaders: [{
        test: /\.jsx$/,
        exclude: /(bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      }],
    },
    plugins: [
//      new webpack.optimize.DedupePlugin(),
//      new webpack.optimize.UglifyJsPlugin(),
    ],
    watch: true,
  }, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
  });
});

/**
 * TODO
gulp.task('js.global', function() {
  return browserify({
    entries: './js/jwobject.jsx',
    transform: [babelify.configure({optional: ['optimisation.react.inlineElements']})],
    extensions: ['.jsx', '.es6']
  })
  .bundle()
  .pipe(source('jwglobal.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./js/'));
});
*/

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
