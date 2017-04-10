/******************************************************************

  STARTING POINT
  Loading all tasks on project load.

  1. Default Task
  Loading all development tasks on project load.

  2. Publish Task
  Publish either CSS, JavaScript, and Images to Staging/Production via FTP 

*******************************************************************/

// import Gulp library
import { task, src } from 'gulp';

// Task
task('default', [
  'start-server', 
  'minify-html', 
  'compile-sass', 
  'compile-vendor',
  'compile-typescript', 
  'optimise-images', 
  'watch'
]);