'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var server = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var csso = require('gulp-csso');
var autoprefixer = require('autoprefixer');

gulp.task('css', function () {
  return gulp.src('docs/css/style.css')
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('docs/css'))
});

gulp.task('sprite', function () {
  return gulp.src('docs/img/inline/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('docs/img'));
});

gulp.task('images', function () {
  return gulp.src('docs/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img'))
});

gulp.task('server', function () {
  server.init({
    server: 'docs/',
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('docs/img/icon-*.svg', gulp.series('sprite', 'refresh'));
  gulp.watch('docs/css/style.css', gulp.series('css', 'refresh'));
  gulp.watch('docs/*.html', gulp.series('refresh'));
  gulp.watch('docs/js/*.js', gulp.series('refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series('css', 'images', 'sprite'));
gulp.task('start', gulp.series('build', 'server'));
