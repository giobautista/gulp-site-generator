const {
    src,
    dest,
    watch,
    series,
    parallel
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const panini = require('panini');
const htmlreplace = require('gulp-html-replace');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const del = require('del');
const options = require('./config');
const logSymbols = require('log-symbols');
const log = console.log;

/**
 * Development Tasks
 */

// COMPILE HTML
function compileHTML() {
    panini.refresh();
    return src(options.paths.src.base + '/pages/**/*.{hbs,html}')
        .pipe(panini({
            root: options.paths.src.base + '/pages/',
            layouts: options.paths.src.base + '/layouts/',
            // pageLayouts: {
            // All pages inside src/pages/blog will use the blog.html layout
            //     'blog': 'blog'
            // }
            partials: options.paths.src.base + '/partials/',
            helpers: options.paths.src.base + '/helpers/',
            data: options.paths.src.base + '/data/'
        }))
        .pipe(dest(options.paths.dist.base))
        .pipe(browserSync.stream());
}

// COPIES AND OPTIMIZES IMAGES TO DIST
function copyImages() {
    return src(options.paths.src.img + '/**/*.{png,jpg,jpeg,gif,svg,ico}')
        .pipe(newer(options.paths.dist.img))
        .pipe(imagemin({ silent: true }))
        .pipe(dest(options.paths.dist.img))
        .pipe(browserSync.stream());
};

// COMPILE AND CONCAT CSS
function compileSCSS() {
    return src(options.paths.src.css + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(options.paths.dist.css))
        .pipe(browserSync.stream());
}

// COPY BOOTSTRAP ICON FONTS
function copyFonts() {
  return src(['node_modules/bootstrap-icons/font/fonts/bootstrap-icons.*'])
    .pipe(dest(options.paths.dist.css + '/fonts'))
    .pipe(browserSync.stream());
}

// COPY BOOTSTRAP JAVASCRIPTS TO DIST/
function vendorJS() {
    return src([
        'node_modules/@popperjs/core/dist/umd/popper.min.js',
        'node_modules/@popperjs/core/dist/umd/popper.min.js.map',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'
    ])
        .pipe(dest(options.paths.dist.js + '/vendors'))
        .pipe(browserSync.stream());
}

// COMPILE AND CONCAT JAVASCRIPT
function compileJS() {
    return src(options.paths.src.js + '/**/*.js')
        .pipe(concat({ path: "app.js" }))
        .pipe(dest(options.paths.dist.js))
        .pipe(browserSync.stream());
};


/**
 * Production Tasks
 */

function minifyCSS() {
    return src(options.paths.dist.css + '/*.css')
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(options.paths.dist.css))
        .pipe(browserSync.stream());
}

function minifyJS() {
    return src(options.paths.dist.js + '/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(dest(options.paths.dist.js))
        .pipe(browserSync.stream());
}

function createSourceMaps() {
    return src([
        options.paths.dist.js + '/*.js',
        options.paths.dist.css + '/*.css',
    ])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(function (file) {
            return file.base;
        }))
        .pipe(browserSync.stream());
};

function renameAssets() {
    return src(options.paths.dist.base + '/**/*.html')
        .pipe(htmlreplace({
            'css': 'assets/css/bootstrap.min.css',
            'js': 'assets/js/app.min.js'
        }))
        .pipe(dest('dist'))
}

/**
 * Other Tasks
 */

// DELETE DIST FOLDER
function cleanDist(done) {
    del.sync(options.paths.dist.base);
    return done();
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
    panini.refresh();
    done();
}

// BROWSER SYNC
function browserSyncInit(done) {
    browserSync.init({
        server: options.paths.dist.base,
        port: options.config.port || 5000, // default 5055
        open: false, // default true
    });
    return done();
}

// WATCH FILES
function watchFiles() {
    watch([
        options.paths.src.base + '/**/*.{hbs,html}',
        options.paths.src.base + '/data/**/*.{yml,json}',
    ], compileHTML);
    watch(options.paths.src.css + '/**/*.scss', compileSCSS);
    watch(options.paths.src.js + '/*.js', compileJS);
    watch(options.paths.src.img + '/**/*', copyImages);
    console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

// BUILD COMPLETE
function buildFinish(done) {
    done();
    console.log(
        "\n\t" + logSymbols.success,
        `Production build is complete. Files are located at ${options.paths.dist.base}\n`
    );
}

exports.default = series(
    cleanDist,
    parallel(copyImages, compileHTML, compileSCSS, copyFonts, vendorJS, compileJS),
    resetPages,
    browserSyncInit,
    watchFiles
);

exports.build = series(
    cleanDist,
    parallel(copyImages, compileHTML, compileSCSS, copyFonts, vendorJS, compileJS),
    parallel(minifyCSS, minifyJS),
    createSourceMaps,
    renameAssets,
    resetPages,
    buildFinish
);
