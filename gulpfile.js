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
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass');

gulp.task('css', function () {
  gulp.src('themes/janeswalk/css/pages/sass/screen.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulp.dest('themes/janeswalk/css'));
});

gulp.task('default', function() {
  // place code for your default task here
});
