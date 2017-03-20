'use strict'; 
 
/******************************************************************
  NPM Packages

  // Decide if in development or production mode
  gulp-util         - https://www.npmjs.com/package/gulp-util
  gulp-if           - https://www.npmjs.com/package/gulp-if

  // Provide caching of html files
  gulp-cached       - https://www.npmjs.com/package/gulp-cached

  // Compiling sass to css and optimising 
  gulp-sass         - https://www.npmjs.com/package/gulp-sass
  gulp-autoprefixer - https://www.npmjs.com/package/gulp-autoprefixer

  // Minfying html
  gulp-htmlmin      - https://www.npmjs.com/package/gulp-htmlmin

  // Compiling es6 to es5 and combining them to one file and minifying
  gulp-babel        - https://www.npmjs.com/package/gulp-babel
  gulp-concat       - https://www.npmjs.com/package/gulp-concat
  gulp-uglify       - https://www.npmjs.com/package/gulp-uglify

  // Optimising images
  gulp-newer        - https://www.npmjs.com/package/gulp-newer
  gulp-imagemin     - https://www.npmjs.com/package/gulp-imagemin
  imagemin-pngquant - https://www.npmjs.com/package/imagemin-pngquant

  // Adding sourcemaps to css and js for debugging
  gulp-sourcemaps   - https://www.npmjs.com/package/gulp-sourcemaps

  // Browsersync for localhost server
  browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/

const gulp = require('gulp'),

    // decide if in development or production mode
    util = require('gulp-util'),
    gulpif = require('gulp-if'),

    // provide caching of html files
    cache = require('gulp-cached'),
    
    // Compiling sass to css and optimising 
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    
    // Minfying html
    htmlmin = require('gulp-htmlmin'),

    // Compiling es6 to es5 and combining them to one file and minifying
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),

    // Optimising images
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    
    // Adding sourcemaps to css and js for debugging
    sourcemaps = require('gulp-sourcemaps'),

    // Browsersync for localhost server
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


/*******************************************************************
  Gulp Configuration
*******************************************************************/

var config = {

    /*
      Development or Production?
      Command to run in Development: 'gulp'
      Command to run in Production: 'gulp --production'
    */
    production: !!util.env.production,
    sourceMaps: !util.env.production,

    // HTML
    html: {
      src: './*.html',
      dest: './dist/'
    },

    // SASS/CSS
    css: {
      src: './sass/*.scss',
      dest: './dist/siteFiles/css'
    },

    // Babel/JS/Libraries
    js: {
      src: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/tether/dist/js/tether.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './js/main.js'
      ],
      filesThatDontNeedCompiled: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/tether/dist/js/tether.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
      ],
      dest: './dist/siteFiles/js'
    },

    // Image Optimization
    image: {
      src: './temp-images/*',
      dest: './dist/siteFiles/images'
    }
};


/******************************************************************
  Gulp Tasks
*******************************************************************/


/*
  Task 1
  Launching a localhost server using Browsersync
  Watching all sass, js, newly saved images to reload tasks
*/
gulp.task('start-server', () => {

  // Create LiveReload server
  browserSync({
    notify: true,
    logPrefix: 'Project by Paul Matchett',
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });

});

/*
  Task 2
  Minifying HTML
*/
gulp.task('minify-html', () => {
    return gulp.src(config.html.src)
     .pipe(cache('linting'))
     .pipe(htmlmin({ 
        collapseWhitespace: true,
        removeComments: true  
      }))
     .pipe(gulp.dest(config.html.dest))
     .pipe(browserSync.stream());
});

/*
  Task 3
  Compiling sass into css
  Adding prefixes
  Adding source maps
*/
gulp.task('compile-sass', () => {
    return gulp.src(config.css.src)
      .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 15 versions'],
          cascade: true
      }))
      .pipe(gulpif(config.sourceMaps, sourcemaps.write()))
      .pipe(gulp.dest(config.css.dest))
      .pipe(browserSync.stream());
});

/*
  Task 4
  Compiling es6 into es5
  Adding source maps
  Concatenating all js files together
*/
gulp.task('compile-concat-js', () => {
    return gulp.src(config.js.src)
        .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
        .pipe(babel({
            presets: ['es2015'],
            ignore: config.js.filesThatDontNeedCompiled
        }))
        .on('error', function(e) {
          console.log('>>> ERROR', e);
          // emit here
          this.emit('end');
        })
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulpif(config.sourceMaps, sourcemaps.write('.')))
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.stream());
});


/*
  Task 5
  Optimising all images
*/
gulp.task('optimise-images', () => {
  return gulp.src(config.image.src)
  .pipe(newer(config.image.dest))
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest(config.image.dest))
  .pipe(browserSync.stream());
});


/*
Task 6
  Watch files 
*/
gulp.task('watch', function() {

  gulp.watch('./*.html', ['minify-html']); 
  gulp.watch("./dist/*.html").on('change', reload);

  gulp.watch('./sass/*.scss', ['compile-sass']);
  gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);

  gulp.watch('./js/**', ['compile-concat-js']);
  gulp.watch("./dist/siteFiles/js/*.js").on('change', reload);

  gulp.watch('temp-images/**', ['optimise-images']); 
  gulp.watch("./dist/siteFiles/images/**").on('change', reload);

});


/******************************************************************
  Starting point
  Loading all tasks on project load.
*******************************************************************/

gulp.task('default', [
  'start-server', 
  'minify-html', 
  'compile-sass', 
  'compile-concat-js', 
  'optimise-images', 
  'watch'
]);

