/*
 * gulpfile.js
 * 
 * All automated tasks should find a home in here.
 */

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  gettextParser = require('gettext-parser'),
  gutil = require('gulp-util'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream'),
  through = require('through2'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack');

var paths = {
  js: './themes/janeswalk/js',
  js_lib: [
    './themes/janeswalk/js/app.js',
    './themes/janeswalk/js/extend.js',
    './themes/janeswalk/js/shims.js',
    './themes/janeswalk/js/tiny-pubsub.js'
  ],
  jsx_app: './themes/janeswalk/js/router.jsx',
  jsx_views: ['./themes/janeswalk/js/router.jsx'],
  jsx: ['./themes/janeswalk/js/components/**/*.jsx'],
  languages: './languages',
  mos: ['./languages/*/*.mo'],
  less: ['./themes/janeswalk/css/main.less'],
  css: './themes/janeswalk/css/',
  react_views: './themes/janeswalk/js/components/'
};

gulp.task('css', function() {
  return gulp.src(paths.less)
    .pipe(less({compress: false}))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch.css', function() {
  gulp.watch(paths.css + '**/*.less', ['css']);
});

gulp.task('js', function() {
  gulp.run('js.theme', 'js.blocks', 'js.global');
});

gulp.task('js.theme', function() {
  // TODO: transform: [babelify.configure({optional: ['optimisation.react.inlineElements']})],
  webpack({
    entry: [paths.jsx_app],
    output: {
      path: paths.js,
      filename: 'janeswalk.js'
    },
    module: {
      loaders: [{
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.jsx?$/,
        exclude: /(bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      }, {
        test: /\.json$/,
        loader: 'json'
      }],
    },
    watch: true
  }, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
  });
});

gulp.task('js.blocks', function() {
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
    './blocks/search/templates/header/',
    './blocks/page_list/templates/typeahead/',
    './blocks/page_list/templates/walk_filters/'
  ].map(function(entry) {
    webpack({
      entry: [entry + 'view.jsx'],
      output: {
        path: entry,
        filename: 'view.js'
      },
      module: {
        loaders: [{
          test: /\.less$/,
          loader: 'style!css!less'
        }, {
          test: /\.jsx?$/,
          exclude: /(bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react'],
          },
        }],
      },
    }, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack:build", err);
      gutil.log("[webpack:build]", stats.toString({
        colors: true
      }));
    });
  });
});

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

// Build JSON from the mo files
gulp.task('i18n.json', function() {
  gulp.src(paths.mos)
    .pipe(
      (function() {
        var stream = through.obj(function(file, enc, cb) {
          var locale = file.history[0].substring(file.base.length)
            .split('/')[0];
          var trans = gettextParser.mo.parse(file.contents);

          // Remove redundant ID, as that's the key already
          for (var i in trans.translations) {
            for (var j in trans.translations[i]) {
              var plural = trans.translations[i][j]['msgid_plural'];
              if (plural) {
                // Build the key for plurals as singular_plural
                trans.translations[i][j + '_' + plural] =
                  trans.translations[i][j]['msgstr'];
                delete trans.translations[i][j];
              } else {
                trans.translations[i][j] = trans.translations[i][j]['msgstr'];
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
gulp.task('i18n.mo', function() {
  var options = {
    username: 'janeswalk_anon',
    password: 'anonemouse'
  }
});

gulp.task('watch', function() {
  gulp.watch(paths.css + '**/*.less', ['css']);
  gulp.watch(paths.jsx, ['js.theme']);
  gulp.watch(paths.jsx_views, ['js.theme']);
  gulp.watch('./blocks/**/*.jsx', ['js.blocks']);
});

gulp.task('default', function() {
  // place code for your default task here
});
