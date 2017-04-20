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
      host:     '192.168.1.115',
      username: 'whalemarine-project.beingonline.co.uk|BeingOnlineFTP',
      password: 'Channel#3'
    },

    // where the files end up
    fileLocations: {
      staging: '/private_html',
      production: '/public_html'
    },

    // this is a default value
    filesToPublish: 'css',

    // where the files live on local
    filesRoutes: {
      css: './dist/siteFiles/css/*.css',
      javascript: './dist/siteFiles/js/*.js',
      images: './dist/siteFiles/images/**/**',
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





