/*
 * gulpfile.js
 * 
 * All automated tasks should find a home in here.
 */

var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  browserify = require('browserify'),
  uglifyify = require('uglifyify'),
  reactify = require('reactify');

var paths = {
  js: ['./themes/janeswalk/js/v2/**/*.js'],
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
});

gulp.task('default', function() {
  // place code for your default task here
});
