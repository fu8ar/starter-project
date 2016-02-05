# starter-project

This project add functionality top manage and automatically:

1. Creates a local server for you project to run on, using broswersync, which allows multiple screens on multiple devices to view the project simultaneously, as well as see click events and changes to be automically rendered without the need of browser refresh. 
2. Compiles sass to css, as well as automatically prefixing css3 properties that are not supported by legacy browers.
3. Detects errors and potential problems in JavaScript code and outputs to command line/terminal.

First you will need to do the following in order to use.

# Install Ruby and Sass for PC

Ruby comes preinstalled with Mac's, however you need to add Ruby if you are working on a PC. This can be done by using the ruby installer:

http://rubyinstaller.org/

You should also download the dev kit which can be found on the link above. This will give you a Ruby command line powershell application that will let you use the Ruby libraries.

The dev kit needs to be extracted first, perferably inside a folder (that can be anywhere). Then, with command line, cd inside folder and type in following commands:

'ruby dk.rb init'
'ruby dk.rb install'
'gem install sass'

* a good reference worth watching is https://www.youtube.com/watch?v=zPFsgxPb430 *

# Install Sass for Mac

Using a Mac, sass can be installed throught the terminal by adding the following: 'gem install sass'

# Gulp Packages

Gulp packages included here are as follows:

node-normalize-scss - https://www.npmjs.com/package/node-normalize-scss
gulp 								- https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
gulp-sass						- https://www.npmjs.com/package/gulp-sass
gulp prefixer 			- https://www.npmjs.com/package/gulp-autoprefixer
gulp-jshint 				- https://www.npmjs.com/package/gulp-jshint
browsersync 				- http://www.browsersync.io/docs/gulp/
gulp-imagemin				- https://www.npmjs.com/package/gulp-imagemin
imagemin-pngquant 	- https://www.npmjs.com/package/imagemin-pngquant

# Add Node Modules

Once the project has been downloaded/cloned, cd into the project and type into the command line/terminal 

'npm install' 

This will download all of the gulp packages listed above, into your project.

# Run Project

To use gulp to watch your sass files and auto update browser, and to lint your javascript files, type into the command link:

'gulp'

The command line should print something like this:

 ----------------------------------
       Local: http://localhost:3000
    External: http://10.0.1.13:3000
 ----------------------------------
          UI: http://localhost:3001
 UI External: http://10.0.1.13:3001
 ----------------------------------

 Any device can view your project using the first 2 addresses - external for other other devices using the same network.




