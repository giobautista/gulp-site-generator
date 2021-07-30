var gulp          = require('gulp');
var scpClient     = require('scp2');
var sass          = require('gulp-sass')(require('sass'));
var sourcemaps    = require('gulp-sourcemaps');
var cleanCss      = require('gulp-clean-css');
var postcss       = require('gulp-postcss');
var handlebars    = require('gulp-compile-handlebars');
var rename        = require('gulp-rename');
var autoprefixer  = require('autoprefixer');
var imagemin      = require('gulp-imagemin');
var minify        = require('gulp-minify');
var concat        = require('gulp-concat');

// Deploy using SSH
function deploySCP2() {
  return scpClient.scp('./dist', {
    host: 'host',
    username: 'username',
    password: 'password',
    path: '/remote/path'
  }, function (err) { })
}

// Build HTML Pages
function buildHTML() {
  return gulp.src('./src/pages/**/*.{hbs,handlebars,html}')
    .pipe(handlebars({}, {
      ignorePartials: true,
      batch: ['./src/partials', './src/layouts']
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./dist'));
};

// Compile SASS
function compileCSS() {
  return gulp.src(['./src/scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/css/'))
}

// Compile JavaScript
function compileJS() {
  return gulp.src(['./src/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/js'));
};

// Optimize Images
function optimizeImages() {
  return gulp.src(['./src/images/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'));
};

// Watchers
function watcher() {
  gulp.watch(['./src/layouts/*.hbs', './src/partials/*.hbs', './src/pages/*.hbs'], gulp.series(buildHTML));
  gulp.watch(['./src/scss/*.scss'], gulp.series(compileCSS));
  gulp.watch(['./src/js/*.js'], gulp.series(compileJS));
}

// Gulp Commands
// gulp watch|html|css|js|images
// exports.deploy  = deploySCP2;
exports.watch   = gulp.series(buildHTML, compileCSS, compileJS, optimizeImages, watcher);
exports.html    = buildHTML;
exports.css     = compileCSS;
exports.js      = compileJS;
exports.images  = optimizeImages;
exports.default = gulp.series(buildHTML, compileCSS, compileJS, optimizeImages);
