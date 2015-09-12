var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 
gulp.task('default', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('lib'))
    .pipe(rename('csssteal.min.js'))
    .pipe(gulp.dest('lib'));
});