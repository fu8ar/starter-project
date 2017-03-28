# starter-project

This project add functionality to manage and automatically:

1. Create a local server for your project to run on, using broswersync, which allows multiple screens on multiple devices to view the project simultaneously, as well as see click events and changes to be automically rendered without the need of browser refresh. 
2. Compiles sass to css, as well as automatically prefixing css3 properties that are not supported by legacy browers.
3. Compiles ES6 to ES5 Javascript, allowing you to use the latest ECMAScript 2016 Language Specification
4. Minifies all html, removing spaces and comments.
5. Optimsies all images files.
6. Imports Twitter Bootstrap 4 Alpha 6 and includes it within a ITCSS CSS Architecture layout.


# Set up Project

Once the project has been downloaded/cloned, using terminal/command line, cd into the project and type the following commands:

**'npm install'** 

This will download all of the node packages required for your project to run.

# Run Project

To start this project, run the following command:

**'gulp'**

# Run Project in production

This will remove all map files. By default, all css and js will be minfied as standard.

**'gulp --production'**

# Publish Project

This project can be uploaded to a staging and production environment.

To upload to staging:

**'gulp publish'**

To upload to production:

**'gulp publish --production'**





