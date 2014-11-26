/*
 * gulpfile.js
 * Keeping this as experimental - running time shows both css tasks in grunt 
 * vs gulp execute approx 0.8s. Gulp is marginally, though not significantly,
 * faster. Grunt has planned features in 0.5 for pipes, which grunt has now,
 * though grunt has more support. I don't love the very jQuery-ish approach
 * to function chaining; I'd rather just directly pass some callbacks around.
 *
 * tl;dr use grunt for now; consider gulp abandoned, but leave here in case 
 * someone wants to use it.
 */

var gulp = require('gulp'),
  path = require('path'),
  autoprefixer = require('gulp-autoprefixer'),
  less = require('gulp-less'),
  browserify = require('browserify'),
  reactify = require('reactify');

var paths = {
  js: ['./themes/janeswalk/js/v2/'],
  jsx: ['./themes/janeswalk/js/views/'],
  css: ['./themes/janeswalk/css/']
};

gulp.task('css', function() {
  return gulp.src('./themes/janeswalk/css/main.less')
    .pipe(less({compress: true}))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest('./themes/janeswalk/css/'));
});

// TODO: decide if each view should be its own JSX, or there should
// be larger bundles
gulp.task('js', function() {
  return browserify()
    .transform(reactify)
    .add(paths.jsx[0] + 'CreateWalk.jsx')
    .bundle()
    .pipe(gulp.dest(['./']));
});

gulp.task('default', function() {
  // place code for your default task here
});
