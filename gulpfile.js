var gulp       = require('gulp');
var package    = require('./package.json');
var rename     = require('gulp-rename');
var replace    = require('gulp-replace');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');
var notify     = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var stylish    = require('jshint-stylish');
var del        = require('del');

/**
 * Paths for sources to be used with gulp
 */
var sources = {
  javascript: {
    dist: './dist/',
    src: './src/**/*'
  }
};

/**
 * deletes the last build
 */
gulp.task('clean', function (cb) {
  return del(sources.javascript.dist, cb);
});

/**
 * jshint task for javascript files
 */
gulp.task('jslint', function () {
  return gulp.src(sources.javascript.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Build task for javascript files
 */
gulp.task('scripts', ['clean', 'jslint'], function () {
  var stream = gulp.src(sources.javascript.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(sources.javascript.dist))
    .pipe(notify({ message: 'javascript complete', 'onLast': true }));
});

/**
 * Build task puts everything together for building the application
 */
gulp.task('default', ['scripts'],  function (cb) {
  del('./tmp', cb);
});