var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var plumber = require('gulp-plumber');
 
gulp.task('build-lib', function() {
  return gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('lib'))
    .pipe(rename('csssteal.min.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('chrome', function () {
  return gulp.src('chrome/js/src/index.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('chrome/js'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('chrome/js'));
});

gulp.task('watch', function() {
  gulp.watch(['chrome/js/src/*.js', 'src/index.js'], ['chrome', 'build-lib']);
});

gulp.task('default', ['build-lib', 'chrome']);
gulp.task('dev', ['build-lib', 'chrome', 'watch']);