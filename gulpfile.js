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
  jsx_views: './themes/janeswalk/js/v2/View.jsx',
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

gulp.task('js_views', function() {
  return browserify({
    entries: paths.jsx_views,
    transform: [reactify],
    extensions: ['.jsx'],
  })
    .bundle()
//    .pipe(concat(paths.js_lib))
    .pipe(source('View.js'))
    .pipe(gulp.dest(paths.js))
//    .pipe(source('View.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest(paths.js))
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

gulp.task('watch', function() {
  gulp.watch(paths.css + '**/*.less', ['css']);
  gulp.watch(paths.jsx, ['browserify']);
  gulp.watch(paths.js_views, ['js_views']);
});

gulp.task('default', function() {
  // place code for your default task here
});
