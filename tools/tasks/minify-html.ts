/******************************************************************

  TASK - minify-html
  Copy, minify, remove comments and white space.

  Packages:

  1.  Minfying html
      gulp-htmlmin      - https://www.npmjs.com/package/gulp-htmlmin

  2.  Provide caching of html files
      gulp-cached       - https://www.npmjs.com/package/gulp-cached

  3.  Browsersync for localhost server
      browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/

// import Gulp library
import { task, src, dest } from 'gulp';

// Project Settings
import { HTMLConfig, HTML_MINIFIER_OPTIONS } from '../constants';

// NPM Dev Dependencies

// Minfying html
const htmlmin = require('gulp-htmlmin');

// Provide caching of html files
const cache = require('gulp-cached');

// Browsersync for localhost server
const browserSync = require('browser-sync');

// task
task('minify-html', () => {
    return src(HTMLConfig.start)
     .pipe(cache('linting'))
     .pipe(htmlmin(HTML_MINIFIER_OPTIONS))
     .pipe(dest(HTMLConfig.end))
     .pipe( browserSync.stream() );
});