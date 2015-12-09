'use strict';
 
var gulp = require('gulp'),
  jshint = require("gulp-jshint"),
	sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyHTML = require('gulp-minify-html'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

  gulp.task("lint", function() {
    gulp.src("./dist/siteFiles/js/main.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
    gulp.watch("./dist/siteFiles/js/main.js").on('change', reload);
  });

  gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: true
      }))
      .pipe(gulp.dest('./dist/siteFiles/css'));
  });

  gulp.task('minify-html', function() {
    var opts = {
      conditionals: true,
      spare:true
    };
   
    return gulp.src('./*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./dist/'));
  });
 
  gulp.task('serve', function () {

    // Create LiveReload server
    browserSync({
      notify: true,
      logPrefix: 'Project by BeingOnline',
      server: {
        baseDir: "dist",
        index: "./dist/index.html",
        directory: true
      }
    });

    gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);
    gulp.watch('./sass/*.scss', ['sass']);

    gulp.watch("./dist/*.html").on('change', reload);
    gulp.watch('./*.html', ['minify-html']);

  });

  gulp.task('default', ['lint', 'sass', 'minify-html', 'serve'])




