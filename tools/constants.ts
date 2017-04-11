// NPM Dev Dependencies

// png plugin
const pngquant = require('imagemin-pngquant');

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
  compiled: './dist/siteFiles/js/*.js'
}

// Image Optimsation Settings
export const IMAGE_OPTIMIZATION_OPTIONS = {
  progressive: true,
  svgoPlugins: [{removeViewBox: false}],
  use: [pngquant()]
};

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
      host:     'ftp.hostname.co.uk',
      username:     'username.co.uk',
      password: 'password',
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
      images: './dist/siteFiles/images/*.{png,gif,jpg}',
      all: [
        './dist/siteFiles/css/*.css',
        './dist/siteFiles/js/*.js',
        './dist/siteFiles/images/*.{png,gif,jpg}'
      ]
    }
  }

  export const FTP_OPTIONS = {
    host:     publishConfig.hosting.host,
    user:     publishConfig.hosting.username,
    password: publishConfig.hosting.password,
    parallel: 10,
    log:      util.log
  }





