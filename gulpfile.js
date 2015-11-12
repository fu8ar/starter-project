'use strict';
 
var gulp = require('gulp'),
	sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

  gulp.task('html', function () {
    gulp.watch("./*.html").on('change', reload);
  });

  gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./stylesheets'));
  });
 
  gulp.task('serve', function () {

    // Create LiveReload server
    browserSync({
      notify: true,
      logPrefix: 'Project by BeingOnline',
      server: {
        index: "index.html",
        directory: true
      }
    });

    gulp.watch("./stylesheets/*.css").on('change', reload);
    gulp.watch('./sass/*.scss', ['sass']);

  });

  gulp.task('default', ['html', 'sass', 'serve'])