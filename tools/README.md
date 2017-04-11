# Tools Folder

This folder is primarily used for controlling projects tasks. These are as follows:

1. Run local server using BrowserSyn
2. Compile SASS with/without sourcemaps
3. Compile Typscript with/without sourcemaps
4. Bundle, concat and uglify all js libraries
5. Optimize and manage images structure
6. Minify, remove commentsof all HTML files
7. Upload projects files via FTP to staging/production area

**tasks**

This is where development and production tasks are held.

**tsconfig.json**

The tsconfig file is only for compiling the gulpfile.ts. 

Project ts files are compiled via gulp-typescript npm package within the task 'compile-typscript'

**constants.ts**

This ts file hold all settings needed to complete the tasks.
