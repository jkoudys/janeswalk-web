/*
 * gulpfile.js
 * 
 * All automated tasks should find a home in here.
 */

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  uglifyify = require('uglifyify'),
  reactify = require('reactify');

var paths = {
  js: './themes/janeswalk/js',
  js_lib: [
    './themes/janeswalk/js/app.js',
    './themes/janeswalk/js/extend.js',
    './themes/janeswalk/js/shims.js',
  ],
  jsx_app: './themes/janeswalk/js/janeswalk.jsx',
  js_views: ['./themes/janeswalk/js/janeswalk.jsx', './themes/janeswalk/js/views/**/*.jsx'],
  jsx: ['./themes/janeswalk/js/views/**/*.jsx'],
  less: ['./themes/janeswalk/css/main.less'],
  css: './themes/janeswalk/css/',
  react_views: './themes/janeswalk/js/views/'
};

gulp.task('css', function() {
  return gulp.src(paths.less)
    .pipe(less({compress: true}))
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

gulp.task('watch', function() {
  gulp.watch(paths.css + '**/*.less', ['css']);
  gulp.watch(paths.jsx, ['jsx_app']);
  gulp.watch(paths.js_views, ['jsx_app']);
  gulp.watch('./blocks/**/*.jsx', ['blocks']);
});

gulp.task('default', function() {
  // place code for your default task here
});
