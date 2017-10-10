/******************************************************************

  TASK - compile-typescript
  Compiling Typescript into es5 Adding source maps

  Packages:

  1.    Decide if in development or production mode
        gulp-util         - https://www.npmjs.com/package/gulp-util
        gulp-if           - https://www.npmjs.com/package/gulp-if

  2.    Adding sourcemaps to css and js for debugging
        gulp-sourcemaps   - https://www.npmjs.com/package/gulp-sourcemaps

  3.    Compiling es6 to es5 and combining them to one file and minifying
        gulp-uglify       - https://www.npmjs.com/package/gulp-uglify

  4.  Browsersync for localhost server
      browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/

// import Gulp library
import { task, src, dest } from 'gulp';

// Project Settings
import { TSConfig } from '../constants';

// NPM Dev Dependencies

// decide if in development or production mode
const util = require('gulp-util');
const gulpif = require('gulp-if');

// Adding sourcemaps to css and js for debugging
const sourcemaps = require('gulp-sourcemaps');
const addSourceMaps = !util.env.production;

// Browsersync for localhost server
const browserSync = require('browser-sync');

// Compile from typescript to javascript and uglify
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

// Task
task('compile-typescript', () => {
    return src(TSConfig.start)
        .pipe(gulpif(addSourceMaps, sourcemaps.init()))
        .pipe(ts({
            noImplicitAny: true,
            out: TSConfig.fileName
        }))
        .pipe(uglify())
        .pipe(gulpif(addSourceMaps, sourcemaps.write('.')))
        .pipe(dest(TSConfig.end))
        .pipe(browserSync.stream());
});