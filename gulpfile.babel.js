'use strict'; 
 
import gulp from 'gulp';
import jshint from "gulp-jshint";
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
const reload = browserSync.reload;

gulp.task("lint", () => {
  return gulp.src("./dist/siteFiles/js/main.js")
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
  gulp.watch("./dist/siteFiles/js/main.js").on('change', reload);
});

gulp.task('es6', () => {
  return gulp.src('./es6/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/siteFiles/js'));
});

gulp.task('optimise-images', () => {
  return gulp.src('./temp-images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./dist/siteFiles/images'));
});

gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/siteFiles/css'));
});

gulp.task('minify-html', () => {
 return gulp.src('./*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('serve', () => {

  // Create LiveReload server
  browserSync({
    notify: true,
    logPrefix: 'Project by BeingOnline',
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });

  gulp.watch('es6/**', ['es6']);
  gulp.watch('temp-images/**', ['optimise-images']);
  gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch("./dist/*.html").on('change', reload);
  gulp.watch('./*.html', ['minify-html']);

});

gulp.task('default', ['lint', 'es6', 'optimise-images', 'sass', 'minify-html', 'serve']);

