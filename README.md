# starter-project

This project add functionality top manage and automatically:

1. Creates a sever to be run on, using broswersync, which allows multiple screens on multiple devices to view and preview the view, as well as see click events and changes to be automically rendered without the need of refreshing. 
2. Compile sass to css, as well as automatically prefixing css3 properties that are not supported by lagacy browers.

First you will need to do the following in order to use.

# Install Ruby 

Ruby comes preinstalled with Mac's, however you need to add Ruby if you are working on a machine. This can be done by using the ruby installer:

http://rubyinstaller.org/

You should also download the dev kit which can be found on the link above. This will give you a Ruby command line powershell application that will let you use the Ruby libraries.

The dev kit needs to be extracted first, perferably inside a folder (that can be anywhere). Then, with command line, go inside folder and type in the follwoung two commands:

'ruby dk.rb init'
'ruby dk.rb install'
'gem install sass'

** a good reference worth watching is https://www.youtube.com/watch?v=zPFsgxPb430

# Install Sass

Using a Mac, sass can be installed throught the terminal by adding the following: 'gem install sass'


Gulp pacakages included here are as follows:

node-normalize-scss - https://www.npmjs.com/package/node-normalize-scss
gulp 				- https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
gulp-sas 			- https://www.npmjs.com/package/gulp-sass
gulp prefixer 		- https://www.npmjs.com/package/gulp-autoprefixer
browsersync 		- http://www.browsersync.io/docs/gulp/


# Add Node Modules

type into the command line 'npm install'

# Gulp Run

To use gulp to watch your sass files and auto update browser, type into the command link:

'gulp'