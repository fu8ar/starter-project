'use strict';
 
var gulp = require('gulp'),
  jshint = require("gulp-jshint"),
	sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

  gulp.task('html', function () {
    gulp.watch("./*.html").on('change', reload);
  });

  gulp.task("lint", function() {
    gulp.src("./siteFiles/js/main.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
    gulp.watch("./siteFiles/js/main.js").on('change', reload);
  });

  gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./siteFiles/css'));
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

    gulp.watch("./siteFiles/css/*.css").on('change', reload);
    gulp.watch('./sass/*.scss', ['sass']);

  });

  gulp.task('default', ['html', 'lint', 'sass', 'serve'])




  