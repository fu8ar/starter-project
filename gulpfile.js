'use strict'; 
 
var gulp = require('gulp'),
    jshint = require("gulp-jshint"),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    normaliseCss = require('node-normalize-scss'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('compile-sass', () => {
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

gulp.task('minify-html', () => {
    return gulp.src('./*.html')
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./dist/'))
});

gulp.task('compile-concat-js', () => {
    return gulp.src('js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(e) {
          console.log('>>> ERROR', e);
          // emit here
          this.emit('end');
        })
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/siteFiles/js'));
});

gulp.task("lint", () => {
    return gulp.src("./dist/siteFiles/js/main.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
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

gulp.task('start-server', () => {

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
  gulp.watch('js/**', ['compile-concat-js']);

  gulp.watch('temp-images/**', ['optimise-images']);
  
  gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);
  gulp.watch('./sass/*.scss', ['compile-sass']);
  
  gulp.watch("./dist/*.html").on('change', reload);
  gulp.watch('./*.html', ['minify-html']);

});

gulp.task('default', [
  'compile-sass',
  'minify-html',
  'compile-concat-js',
  'lint',
  'optimise-images',
  'start-server'
]);

