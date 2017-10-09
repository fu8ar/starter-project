// NPM Dev Dependencies

// decide if in development or production mode
const util = require('gulp-util');


// BrowserSync
export const PROJECT_NAME = "Starter Project";
export const BROWSER_SYNC_OPTIONS = {
  baseDir: "dist",
  index: "index.html"
}

// Sass Setting
export const sassConfig = {
  start: './src/sass/*.scss',
  end: './dist/siteFiles/css',
  compiled: './dist/siteFiles/css/*.css'
}

// HTML Minify Settings
export const HTML_MINIFIER_OPTIONS = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

export const HTMLConfig = {
  start: './src/*.html',
  end: './dist/',
  compiled: './dist/*.html'
}

// Vendor Config
export const VendorConfig = {
  libraries: [
    './node_modules/jquery/dist/jquery.slim.js',
    './node_modules/popper.js/dist/umd/popper.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/slick-carousel/slick/slick.js'
  ],
  end: './dist/siteFiles/js'
}

// TS settings
export const TSConfig = {
  start: './src/ts/main.ts',
  end: './dist/siteFiles/js',
  fileName: 'main.min.js',
  compiled: './dist/siteFiles/js/*.js',
  reload: true
}

export const ImageConfig = {
  start: 'src/images/**',
  end: './dist/siteFiles/images',
  compiled: 'siteFiles/images/**'
}

/// Published Settings


// Publish Default Tettings
export const publishConfig = {

    // ftp details
    hosting: {
      host:     'Enter Hostname Here',
      username: 'Enter Username Here',
      password: 'Enter Password Here'
    },

    // where the files end up
    fileLocations: {
      staging: '/staged',
      production: '/www'
    },

    // this is a default value
    filesToPublish: 'css',

    // where the files live on local
    filesRoutes: {
      css: './dist/siteFiles/css/*.css',
      javascript: './dist/siteFiles/js/*.js',
      images: './dist/siteFiles/images/**/**',
      fonts: './dist/siteFiles/fonts/**/**',
      all: [
        './dist/siteFiles/css/*.css',
        './dist/siteFiles/js/*.js',
        './dist/siteFiles/images/**/**'
      ]
    }
  }

  export const FTP_OPTIONS = {
    host:     publishConfig.hosting.host,
    user:     publishConfig.hosting.username,
    password: publishConfig.hosting.password 
  }





