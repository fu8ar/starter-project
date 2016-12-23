'use strict'; 
 
/*
  NPM Packages
*/
const gulp = require('gulp'),
    
    // Compiling sass to css and optimising 
    sass = require('gulp-sass'),
    normaliseCss = require('node-normalize-scss'),
    autoprefixer = require('gulp-autoprefixer'),
    
    // Minfying html
    htmlmin = require('gulp-htmlmin'),

    // Compiling es6 to es5 and combining them to one file
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),

    // Optimsing images
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    
    // Adding sourcemaps to css and js for debugging
    sourcemaps = require('gulp-sourcemaps'),

    // Browsersync for localhost server
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

/*
  Task 1
  Compiling sass into css
  Adding prefixes
  Adding source maps
*/
gulp.task('compile-sass', () => {
    return gulp.src('./sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
          includePaths: normaliseCss.includePaths,
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 15 versions'],
          cascade: true
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./dist/siteFiles/css'));
});

/*
  Task 2
  Minifying HTML
*/
gulp.task('minify-html', () => {
    return gulp.src('./*.html')
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('./dist/'))
});

/*
  Task 3
  Compiling es6 into es5
  Adding source maps
  Concatenating all js files together
*/
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

/*
  Task 4
  Optimising all images
*/
gulp.task('optimise-images', () => {
  return gulp.src('./temp-images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('./dist/siteFiles/images'));
});

/*
  Task 5
  Launching a localhost server using Browsersync
  Watching all sass, js, newly saved images to reload tasks
*/
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

/*
  Starting point
  Loading all tasks on project load.
*/
gulp.task('default', [
  'compile-sass',
  'minify-html',
  'compile-concat-js',
  'optimise-images',
  'start-server'
]);

