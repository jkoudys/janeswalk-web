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
  reactify = require('reactify'),
  gettextParser = require('gettext-parser');

var paths = {
  js: './themes/janeswalk/js',
  js_lib: [
    './themes/janeswalk/js/app.js',
    './themes/janeswalk/js/extend.js',
    './themes/janeswalk/js/shims.js',
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

gulp.task('jsx_app', function() {
  return browserify({
    entries: paths.jsx_app,
    transform: [reactify],
    extensions: ['.jsx'],
  })
    .bundle()
    .pipe(source('janeswalk.js'))
    .pipe(gulp.dest(paths.js))
    .pipe(rename('janeswalk.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
});

gulp.task('browserify', function(callback) {
  return browserify({
    entries: paths.react_views + 'CreateWalk.jsx',
    transform: [reactify],
    extensions: ['.jsx'],
  })
    .bundle()
    .pipe(source('CreateWalk.js'))
    .pipe(gulp.dest(paths.react_views))
});

// TODO: very lazy task; needs to be generalized for all blocks, not just one!
gulp.task('blocks', function() {
  return browserify({
    shim: {
      react: {
        path: 'global:React',
        exports: 'react'
      }
    },
    entries: './blocks/page_list/templates/typeahead/view.jsx',
    transform: [reactify],
    extensions: ['.jsx']
  })
    .bundle()
    .pipe(source('view.js'))
    .pipe(gulp.dest('./blocks/page_list/templates/typeahead/'))
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
  // place code for your default task here
});
