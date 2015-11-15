# starter-project

This project add functionality top manage and automatically:

1. Creates a sever to be run on, using broswersync, which allows multiple screens on multiple devices to view and preview the view, as well as see click events and changes to be automically rendered without the need of refreshing. 
2. Compile sass to css, as well as automatically prefixing css3 properties that are not supported by lagacy browers.
3. Detect errors and potential problems in JavaScript codeand output to command line/terminal

First you will need to do the following in order to use.

# Install Ruby and Sass for PC

Ruby comes preinstalled with Mac's, however you need to add Ruby if you are working on a machine. This can be done by using the ruby installer:

http://rubyinstaller.org/

You should also download the dev kit which can be found on the link above. This will give you a Ruby command line powershell application that will let you use the Ruby libraries.

The dev kit needs to be extracted first, perferably inside a folder (that can be anywhere). Then, with command line, go inside folder and type in the follwoung two commands:

'ruby dk.rb init'
'ruby dk.rb install'
'gem install sass'

* a good reference worth watching is https://www.youtube.com/watch?v=zPFsgxPb430 *

# Install Sass for Mac

Using a Mac, sass can be installed throught the terminal by adding the following: 'gem install sass'

# Gulp Packages

Gulp packages included here are as follows:

node-normalize-scss - https://www.npmjs.com/package/node-normalize-scss
gulp 				- https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
gulp-sass			- https://www.npmjs.com/package/gulp-sass
gulp prefixer 		- https://www.npmjs.com/package/gulp-autoprefixer
gulp-jshint 		- https://www.npmjs.com/package/gulp-jshint
browsersync 		- http://www.browsersync.io/docs/gulp/

# Add Node Modules

Once the project has been downloaded/cloned, cd into the project and type into the command line/terminal 'npm install'

# Run Project

To use gulp to watch your sass files and auto update browser, type into the command link:

'gulp'

The command line should print something like this:

----------------------------------
Local: http://localhost:3000
External: http://10.0.1.13:3000
----------------------------------
UI: http://localhost:3001
UI External: http://10.0.1.13:3001
----------------------------------

 Any device can view your project using the first 2 addresses - external for other pc's, as well as tablets and mobiles under the same network.


# Test javascript files for errors

'gulp lint'