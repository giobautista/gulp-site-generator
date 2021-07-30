const {
  src,
  dest,
  watch,
  series
}                   = require('gulp');
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require('gulp-sourcemaps');
const cleanCss      = require('gulp-clean-css');
const postcss       = require('gulp-postcss');
const rename        = require('gulp-rename');
const autoprefixer  = require('autoprefixer');
const imagemin      = require('gulp-imagemin');
const minify        = require('gulp-minify');
const concat        = require('gulp-concat');
const panini        = require('panini');
const newer         = require('gulp-newer');
const browserSync   = require('browser-sync').create();
const del           = require('del');
const chalk         = require('chalk');
const log           = console.log;

// COMPILE HTML
function compileHTML() {
  log(chalk.red.bold('---------------COMPILING HTML WITH PANINI---------------'));
  panini.refresh();
  return src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      // pageLayouts: {
      // All pages inside src/pages/blog will use the blog.html layout
      //     'blog': 'blog'
      // }
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// COPIES AND OPTIMIZES IMAGES TO DIST
function copyImages() {
  log(chalk.red.bold('---------------OPTIMIZING IMAGES---------------'));
  return src(['src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)'])
    .pipe(newer('dist/assets/images'))
    .pipe(imagemin())
    .pipe(dest('dist/assets/images'))
    .pipe(browserSync.stream());
};

// COMPILE AND CONCAT CSS
function compileSCSS() {
  log(chalk.red.bold('---------------COMPILING CSS---------------'));
  return src(['src/assets/scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css/'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// COMPILE AND CONCAT JAVASCRIPT
function compileJS() {
  log(chalk.red.bold('---------------COMPILING JS---------------'));
  return src(['src/assets/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'))
    .pipe(browserSync.stream());
};

// DELETE DIST FOLDER
function cleanDist(done) {
  log(chalk.red.bold('---------------REMOVING OLD FILES FROM DIST---------------'));
  del.sync('dist');
  return done();
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
  log(chalk.red.bold('---------------CLEARING PANINI CACHE---------------'));
  panini.refresh();
  done();
}

// BROWSER SYNC
function browserSyncInit(done) {
  log(chalk.red.bold('---------------BROWSER SYNC INIT---------------'));
  browserSync.init({
    server: './dist',
    port: 8088, // default 3000
    open: false, // default true
  });
  return done();
}

// WATCH FILES
function watchFiles() {
  watch('src/**/*.html', compileHTML);
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'], compileSCSS);
  watch('src/assets/js/*.js', compileJS);
  watch('src/assets/images/**/*', copyImages);
}

exports.default = series(cleanDist, copyImages, compileHTML, compileSCSS, compileJS, resetPages, browserSyncInit, watchFiles);
