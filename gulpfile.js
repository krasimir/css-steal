var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
 
gulp.task('build-lib', function() {
  return gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('lib'))
    .pipe(rename('csssteal.min.js'))
    .pipe(gulp.dest('lib'));
});

gulp.task('chrome', function () {
  browserify({ entries: 'chrome/js/src/index.js', debug: true })
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(source('script.js'))
    .pipe(gulp.dest('chrome/js'))
    .pipe(buffer())
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('chrome/js'));
});

gulp.task('watch', function() {
  gulp.watch(['chrome/js/src/*.js', 'src/index.js'], ['chrome', 'build-lib']);
});

gulp.task('default', ['build-lib', 'chrome']);
gulp.task('dev', ['build-lib', 'chrome', 'watch']);