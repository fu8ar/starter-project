/******************************************************************

  TASK - compile-vendor
  Concatenating all vender js files together

  Packages:

  1.    Compiling es6 to es5 and combining them to one file and minifying
        gulp-concat       - https://www.npmjs.com/package/gulp-concat
        gulp-uglify       - https://www.npmjs.com/package/gulp-uglify

  2.    Browsersync for localhost server
        browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/


// import Gulp library
import { task, src, dest } from 'gulp';

// Project Settings
import { VendorConfig } from '../constants';

// NPM Dev Dependencies

// Combining all vendor file into one file and minifying
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

// Task
task('compile-vendor', () => {
    return src(VendorConfig.libraries)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(dest(VendorConfig.end))
        .pipe(browserSync.stream());
});