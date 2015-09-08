/*
 * gulpfile.js
 * 
 * All automated tasks should find a home in here.
 */

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  through = require('through2'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  uglifyify = require('uglifyify'),
  babelify = require('babelify'),
  gettextParser = require('gettext-parser');

var THEMEDIR = './application/themes/janeswalk';

var paths = {
  js: THEMEDIR + '/js',
  js_lib: [
    THEMEDIR + '/js/app.js',
    THEMEDIR + '/js/extend.js',
    THEMEDIR + '/js/shims.js',
  ],
  jsx_app: THEMEDIR + '/js/router.jsx',
  jsx_views: [THEMEDIR + '/js/router.jsx'],
  jsx: [THEMEDIR + '/js/components/**/*.jsx'],
  languages: './languages',
  mos: ['./languages/*/*.mo'],
  less: [THEMEDIR + '/css/main.less'],
  css: THEMEDIR + '/css/',
  react_views: THEMEDIR + '/js/components/'
};

/**
 * Compile our CSS
 */
gulp.task('css', function() {
  return gulp.src(paths.less)
    .pipe(less({compress: false}))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest(paths.css));
});

/**
 * Build React/Flux application
 */
gulp.task('js', function() {
  return browserify({
    entries: paths.jsx_app,
    transform: [babelify],
    extensions: ['.jsx']
  })
    .bundle()
    .pipe(source('janeswalk.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('janeswalk.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
});

/**
 * Build JSX templates for all our custom blocks
 */
gulp.task('blocks', function() {
  // Run for each block view in array
  return ['./blocks/page_list/templates/typeahead/', './blocks/page_list/templates/walk_filters/'].map(function(template) {
    return browserify({
      shim: {
        react: {
          path: 'global:React',
          exports: 'react'
        }
      },
      entries: template + 'view.jsx',
      transform: [reactify],
      extensions: ['.jsx']
    })
      .bundle()
      .pipe(source('view.js'))
      .pipe(gulp.dest(template))
  });
});

// Build JSON from the mo files
gulp.task('i18nJson', function() {
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
gulp.task('mo', function() {
  var options = {
    username: 'janeswalk_anon',
    password: 'anonemouse'
  }
});

gulp.task('watch', function() {
  gulp.watch(paths.css + '**/*.less', ['css']);
  gulp.watch(paths.jsx, ['jsx_app']);
  gulp.watch(paths.jsx_views, ['jsx_app']);
  gulp.watch('./blocks/**/*.jsx', ['blocks']);
});

gulp.task('default', function() {
});
