/******************************************************************

  TASK - compile-sass
  Compiling sass into CSS, adding prefixes and adding source maps

  Packages:

  1.    Decide if in development or production mode
        gulp-util         - https://www.npmjs.com/package/gulp-util
        gulp-if           - https://www.npmjs.com/package/gulp-if

  2.    Adding sourcemaps to css and js for debugging
        gulp-sourcemaps   - https://www.npmjs.com/package/gulp-sourcemaps

  3.    Compiling sass to css and optimising 
        gulp-sass         - https://www.npmjs.com/package/gulp-sass
        gulp-autoprefixer - https://www.npmjs.com/package/gulp-autoprefixer

  4.    Browsersync for localhost server
        browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/

// import Gulp library
import { task, src, dest } from 'gulp';

// Project Settings
import { sassConfig } from '../constants';

// NPM Dev Dependencies

// Decide if in development or production mode
const util = require('gulp-util');
const gulpif = require('gulp-if');

// Adding sourcemaps to css and js for debugging
const sourcemaps = require('gulp-sourcemaps');
const addSourceMaps = !util.env.production;

// Browsersync for localhost server
const browserSync = require('browser-sync');

// Compiling sass to css and optimising
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Task
task('compile-sass', () => {
    return src(sassConfig.start)
      .pipe(gulpif(addSourceMaps, sourcemaps.init()))
      .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: true
      }))
      .pipe(gulpif(addSourceMaps, sourcemaps.write()))
      .pipe(dest(sassConfig.end))
      .pipe(browserSync.stream());
});