/******************************************************************

  TASK - publish
  Publish Selections and FTP details

  Packages:

  1.    User input for validation and publish configuration
        gulp-prompt   - https://www.npmjs.com/package/gulp-prompt

  2.    Upload files vai ftp to staging or production
        vinyl-ftp     - https://www.npmjs.com/package/vinyl-ftp

  3.    Decide if in development or production mode
        gulp-util     - https://www.npmjs.com/package/gulp-util
        gulp-if       - https://www.npmjs.com/package/gulp-if

*******************************************************************/

// import Gulp library
import { task, src } from 'gulp';

// Project Settings
import { publishConfig, FTP_OPTIONS } from '../constants';

// NPM Dev Dependencies

// user input and upload via ftp
const prompt = require('gulp-prompt');
const ftp = require('vinyl-ftp');

// decide if in development or production mode
const util = require('gulp-util');
const gulpif = require('gulp-if');

// FTP Settings
function ftpConfig(){
  let ret = ftp.create(FTP_OPTIONS);
  return ret;
}

// Configuration on what files to publish
function filesToPublish(selectedOption: any){
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
  else if(selectedOption == 'Fonts'){
    ret = [publishConfig.filesRoutes.fonts];
  }
  else{
    ret = publishConfig.filesRoutes.all;
  }
  return ret;
}

task('publish', 
  ['prompt'], function () {

  // ftp settings
  var conn = ftpConfig();

  // files and folders to upload
  var selectedFiles = publishConfig.filesToPublish;
  var globs = filesToPublish(selectedFiles);

  // upload to staging or production
  const fileLocations = publishConfig.fileLocations;
  var dest = util.env.production ? fileLocations.production : fileLocations.staging;

  // gulp ftp
  return src( globs, { base: './dist/', buffer: false } )
		.pipe( conn.newer( dest ) ) // only upload newer files
		.pipe( conn.dest( dest ) );
  
});