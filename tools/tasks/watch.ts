/******************************************************************

  TASK - watch
  Reload browserSync on HTML, SASS, JS, Image file change 

  Packages:

  1.  Browsersync for localhost server
      browser-sync      - https://www.npmjs.com/package/browser-sync

*******************************************************************/


// import Gulp library
const gulp = require('gulp');

// Project Settings
import { HTMLConfig, sassConfig, TSConfig, ImageConfig } from '../constants';

// NPM Dev Dependencies

// Browsersync for localhost server
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// task
gulp.task('watch', () => {


  gulp.watch(HTMLConfig.start, ['minify-html']); 
  gulp.watch(HTMLConfig.compiled).on('change', reload);

  gulp.watch(sassConfig.start, ['compile-sass']);
  gulp.watch(sassConfig.compiled).on('change', reload);

  gulp.watch(TSConfig.start, ['compile-typescript']);
  gulp.watch(TSConfig.compiled).on('change', reload);

  gulp.watch(ImageConfig.start, ['optimise-images']); 
  gulp.watch(ImageConfig.compiled).on('change', reload);

});