'use strict'; 
 
var gulp = require('gulp'),
    jshint = require("gulp-jshint"),
    ts = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    normaliseCss = require('node-normalize-scss'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglifyjs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('minify-html', function () {
    return gulp.src('./*.html')
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
          includePaths: normaliseCss.includePaths,
          outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 15 versions'],
          cascade: true
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/siteFiles/css'));
});

gulp.task('ts', function () {
  return gulp.src('./ts/*.ts')
  .pipe(sourcemaps.init())
  .pipe(ts(tsconfig.compilerOptions))
  .pipe(uglify())
  .pipe(gulp.dest('dist/siteFiles/js'));
});

gulp.task("lint", function () {
    return gulp.src("./dist/siteFiles/js/main.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('optimise-images', function () {
  return gulp.src('./temp-images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./dist/siteFiles/images'));
});

gulp.task('serve', function () {

  // Create LiveReload server
  browserSync({
    notify: true,
    logPrefix: 'Project by BeingOnline',
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });

  gulp.watch("./dist/siteFiles/js/*.js").on('change', reload);
  gulp.watch('ts/**', ['ts']);

  gulp.watch('temp-images/**', ['optimise-images']);
  
  gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);
  gulp.watch('./sass/*.scss', ['sass']);
  
  gulp.watch("./dist/*.html").on('change', reload);
  gulp.watch('./*.html', ['minify-html']);

});

gulp.task('default', ['lint','ts','optimise-images','sass','minify-html','serve']);

