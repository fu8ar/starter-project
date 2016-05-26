# starter-project

This project add functionality top manage and automatically:

1. Creates a local server for you project to run on, using broswersync, which allows multiple screens on multiple devices to view the project simultaneously, as well as see click events and changes to be automically rendered without the need of browser refresh. 
2. Compiles sass to css, as well as automatically prefixing css3 properties that are not supported by legacy browers.
4. Compiles Typescript to the Javascript, allowing you to use the latest ECMAScript 2016 Language Specification
3. Detects errors and potential problems in JavaScript code and outputs to command line/terminal.


First you will need to do the following in order to use.

# Install Ruby and Sass for PC

Ruby comes preinstalled with Mac's, however you need to add Ruby if you are working on a PC. This can be done by using the ruby installer:

http://rubyinstaller.org/

You should also download the dev kit which can be found on the link above. This will give you a Ruby command line powershell application that will let you use the Ruby libraries.

The dev kit needs to be extracted first, perferably inside a folder (that can be anywhere). Then, with command line, cd inside folder and type in following commands:

**'ruby dk.rb init'**
**'ruby dk.rb install'**
**'gem install sass'**

** a good reference worth watching is [https://www.youtube.com/watch?v=zPFsgxPb430](https://www.youtube.com/watch?v=zPFsgxPb430) **

# Install Sass for Mac

Using a Mac, sass can be installed throught the terminal by adding the following: **'gem install sass'**


# Install Node.js and Node Package Manager

Once the project has been downloaded/cloned, cd into the project and type into the command line/terminal 

**'npm install'** 

This will download all of the gulp packages listed above, into your project.


# Gulp Packages

Gulp packages included here are as follows:

**node-normalize-scss** - https://www.npmjs.com/package/node-normalize-scss

Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.

**gulp** - https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

Build system automating tasks: minification and copying of all JavaScript files, static images, capable of watching files to automatically rerun the task when a file is updated.

**gulp-typescript**	- https://www.npmjs.com/package/gulp-typescript

TypeScript is a superset of JavaScript which primarily provides optional static typing, classes and interfaces. One of the big benefits is to enable IDEs to provide a richer environment for spotting common errors as you type the code.

**gulp-sass**	- https://www.npmjs.com/package/gulp-sass

Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

**gulp prefixer** - https://www.npmjs.com/package/gulp-autoprefixer

Automitically add prefixers to experimental or nonstandard CSS properties

**gulp-jshint** - https://www.npmjs.com/package/gulp-jshint

JSHint is a static code analysis tool used in software development for checking if JavaScript source code complies with coding rules.

**browsersync** - http://www.browsersync.io/docs/gulp/

BrowserSync is an automation tool that makes web development faster. In the past we've automated a lot of actions like compilation of SASS files, image compression etc. BrowserSync brings a whole new type of automation to the table with batteries included.

**gulp-imagemin** - https://www.npmjs.com/package/gulp-imagemin

Minify PNG, JPEG, GIF and SVG images

**imagemin-pngquant** - https://www.npmjs.com/package/imagemin-pngquant

Works alongside gulp-imagemin to save extra bytes on PNG files: 203.79 kB vs. 164.67 kB (12.9% vs 10.4%) and you don’t notice any quality loss in the asset.


# Run Project

To use gulp to watch your sass files and auto update browser, and to lint your javascript files, type into the command link:

**'gulp'**

The command line should print something like this:

 ----------------------------------
       Local: http://localhost:3000
    External: http://10.0.1.13:3000
 ----------------------------------
          UI: http://localhost:3001
 UI External: http://10.0.1.13:3001
 ----------------------------------

 Any device can view your project using the first 2 addresses - external for other other devices using the same network.

