/******************************************************************

  TASK - prompt
  Publish Selections and FTP details

  Packages:

  1.    User input for validation and publish configuration
        gulp-prompt 

  2.    Decide if in development or production mode
        gulp-util         - https://www.npmjs.com/package/gulp-util
        gulp-if           - https://www.npmjs.com/package/gulp-if

*******************************************************************/

// import Gulp library
import { task, src } from 'gulp';

// Project Settings
import { publishConfig, FTP_OPTIONS } from '../constants';

// NPM Dev Dependencies

// user input for production
const prompt = require('gulp-prompt');

// decide if in development or production mode
const util = require('gulp-util');
const gulpif = require('gulp-if');

task('prompt',  () => {

  return src('./dist/siteFiles/js/main.js')
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
    .pipe(gulpif(util.env.production, prompt.prompt(
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
            if(username !== publishConfig.hosting.username){
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