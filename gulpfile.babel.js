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

// import Gulp library
import gulp from 'gulp';

    // decide if in development or production mode
    import util from 'gulp-util';
    import gulpif from 'gulp-if';

    // provide caching of html files
    import cache from 'gulp-cached';
    
    // Compiling sass to css and optimising 
    import sass from 'gulp-sass';
    import autoprefixer from 'gulp-autoprefixer';
    
    // Minfying html
    import htmlmin from 'gulp-htmlmin';

    // Compiling es6 to es5 and combining them to one file and minifying
    import babel from 'gulp-babel';
    import concat from 'gulp-concat';
    import uglify from 'gulp-uglify';

    // Optimising images
    import newer from 'gulp-newer';
    import imagemin from 'gulp-imagemin';
    import pngquant from 'imagemin-pngquant';
    
    // Adding sourcemaps to css and js for debugging
    import sourcemaps from 'gulp-sourcemaps';

    // Browsersync for localhost server
    import browserSync from 'browser-sync';
    const reload = browserSync.reload;

    // https://www.npmjs.com/package/gulp-prompt
    import prompt from 'gulp-prompt';
    // https://github.com/morris/vinyl-ftp
    import ftp from 'vinyl-ftp';


/*******************************************************************
  Gulp Configuration
*******************************************************************/

var config = {

    projectname: "Enter name of project here",

    /*
      Development or Production?
      Command to run in Development: 'gulp'
      Command to run in Production: 'gulp --production'
    */
    isProduction: !!util.env.production,
    addSourceMaps: !util.env.production,

    // HTML
    html: {
      start: './*.html',
      minimise: true,
      dest: './dist/'
    },

    // SASS/CSS
    css: {
      start: './sass/*.scss',
      dest: './dist/siteFiles/css'
    },

    // Babel/JS/Libraries
    js: {
      start: [
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
      start: './images/*',
      dest: './dist/siteFiles/images'
    },

};


/******************************************************************
  Development Gulp Tasks
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
    logPrefix: config.projectname,
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
    return gulp.src(config.html.start)
     .pipe(cache('linting'))
     .pipe(htmlmin({ 
        collapseWhitespace: config.html.minimise,
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
    return gulp.src(config.css.start)
      .pipe(gulpif(config.addSourceMaps, sourcemaps.init()))
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: true
      }))
      .pipe(gulpif(config.addSourceMaps, sourcemaps.write()))
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
    return gulp.src(config.js.start)
        .pipe(gulpif(config.addSourceMaps, sourcemaps.init()))
        .pipe(babel({
            presets: ['es2015'],
            ignore: config.js.filesThatDontNeedCompiled
        }))
        .on('error', function(e) {
          util.log('>>> Error', util.colors.bgRed(e));
          // emit here
          this.emit('end');
        })
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulpif(config.addSourceMaps, sourcemaps.write('.')))
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.stream());
});

/*
  Task 5
  Optimising all images
*/
gulp.task('optimise-images', () => {
  return gulp.src(config.image.start)
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
gulp.task('watch', () => {

  gulp.watch('./*.html', ['minify-html']); 
  gulp.watch("./dist/*.html").on('change', reload);

  gulp.watch('./sass/*.scss', ['compile-sass']);
  gulp.watch("./dist/siteFiles/css/*.css").on('change', reload);

  gulp.watch('./js/**', ['compile-concat-js']);
  gulp.watch("./dist/siteFiles/js/*.js").on('change', reload);

  gulp.watch('images/**', ['optimise-images']); 
  gulp.watch("./dist/siteFiles/images/**").on('change', reload);

});


/*
  Starting point
  Loading all tasks on project load.
*/

gulp.task('default', [
  'start-server', 
  'minify-html', 
  'compile-sass', 
  'compile-concat-js', 
  'optimise-images', 
  'watch'
]);


/******************************************************************
  Production Gulp Tasks
*******************************************************************/

  
  // Publish Default Tettings
  let publishConfig = {

    // ftp details
    hosting: {
      host:     'ftp.hostname.co.uk',
      user:     'username.co.uk',
      password: 'password',
    },

    // where the files end up
    fileLocations: {
      staging: '/private_html',
      production: '/public_html'
    },

    // this is a default value
    filesToPublish: 'css',

    // where the files live on local
    filesRoutes: {
      css: './dist/siteFiles/css/*.css',
      javascript: './dist/siteFiles/js/*.js',
      images: './dist/siteFiles/images/*.{png,gif,jpg}',
      all: [
        './dist/siteFiles/css/*.css',
        './dist/siteFiles/js/*.js',
        './dist/siteFiles/images/*.{png,gif,jpg}'
      ]
    }
  }

/*
  Task 1
  Publish Selections and FTP details
*/
gulp.task('prompt',  () => {

  return gulp.src('./dist/siteFiles/js/main.js')
    .pipe(prompt.confirm('Are you sure you want to publish your code?'))
    .pipe(prompt.prompt(
      [{
        type: 'list',
        name: 'filesToPublish',
        message: 'Select what you want to pubish',
        choices: ['All', 'JavaScript', 'CSS', 'Images']
     }],
     function(res){
       publishConfig.filesToPublish = res.filesToPublish;
    }))
    .pipe(gulpif(config.isProduction, prompt.prompt(
      [
        {
          type: 'input',
          message: 'Please enter your hostname',
          name: 'hostname',
          validate: function(hostname){
            if(hostname !== publishConfig.hosting.host){
              util.log('Hostname is incorrect: ', util.colors.bgRed(hostname));
              return false;
            }
            return true;
          }
        },
        
        {
          type: 'input',
          message: 'Please enter your username',
          name: 'username',
          validate: function(username){
            if(username !== publishConfig.hosting.user){
              util.log('Username is incorrect: ', util.colors.bgRed(username));
              return false;
            }
            return true;
          }
        },
      
        {
          type: 'password',
          message: 'Please enter your password',
          name: 'password',
          validate: function(password){
            if(password !== publishConfig.hosting.password){
              util.log('Password is incorrect: ', util.colors.bgRed(password));
              return false;
            }
            return true;
          }
        }
      ],
      function(response){
        // store new updated ftp details
        publishConfig.hosting.host = response.hostname;
        publishConfig.hosting.username = response.username;
        publishConfig.hosting.password = response.password;
      }
    )));
});

/*
  Task 2
  Publish via FTP
*/

function ftpConfig(){
  let ret = ftp.create( {
    host:     publishConfig.hosting.host,
    user:     publishConfig.hosting.user,
    password: publishConfig.hosting.password,
    parallel: 10,
    log:      util.log
  });
  return ret;
}

function filesToPublish(selectedOption){
  let ret;
  if(selectedOption == 'CSS'){
    ret = [publishConfig.filesRoutes.css];
  }
  else if(selectedOption == 'JavaScript'){
    ret = [publishConfig.filesRoutes.javascript];
  }
  else if(selectedOption == 'Images'){
    ret = [publishConfig.filesRoutes.images];
  }
  else{
    ret = publishConfig.filesRoutes.all;
  }
  return ret;
}

function uploadTo(){
  let ret;
  const fileLocations = publishConfig.fileLocations;
  ret = config.isProduction ? fileLocations.production : fileLocations.staging;
  return ret;
}

gulp.task('publish', 
  ['minify-html', 
  'compile-sass', 
  'compile-concat-js', 
  'optimise-images',
  'prompt'], function () {

  // ftp settings
  var conn = ftpConfig();

  // files and folders to upload
  var selectedFiles = publishConfig.filesToPublish;
  var globs = filesToPublish(selectedFiles);

  // upload to staging or production
  var dest = uploadTo();

  // gulp ftp
  return gulp.src( globs, { base: './dist/', buffer: false } )
		.pipe( conn.newer( dest ) ) // only upload newer files
		.pipe( conn.dest( dest ) );
  
});
