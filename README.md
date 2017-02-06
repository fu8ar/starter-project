# starter-project

This project add functionality top manage and automatically:

1. Creates a local server for your project to run on, using broswersync, which allows multiple screens on multiple devices to view the project simultaneously, as well as see click events and changes to be automically rendered without the need of browser refresh. 
2. Compiles sass to css, as well as automatically prefixing css3 properties that are not supported by legacy browers.
3. Compiles ES6 to ES5 Javascript, allowing you to use the latest ECMAScript 2016 Language Specification
4. Minifies all html, removing spaces and comments.
5. Optimsies all images files.


# Set up Project

Once the project has been downloaded/cloned, using terminal/command line, cd into the project and type the following commands:

**'npm install'** 

This will download all of the node packages required for your project to run.

**'bower install'** 

This will download all of the bower packages. For example, jQuery and Bootstrap.

# Run Project

To start this project, run the following command:

**'gulp'**

# Run Project in production

This will remove all map files. By default, all css and js will be minfied as standard.

**'gulp --production'**




