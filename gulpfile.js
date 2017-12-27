const gulp = require('gulp')
const sass = require('gulp-sass')
// const browserSync = require('browser-sync').create()
const browserSync = require('browser-sync')
const header = require('gulp-header')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const pkg = require('./package.json')
const stylefmt = require('gulp-stylefmt')
const clean = require('gulp-clean')

var bases = {
  app: 'app/',
  dist: 'dist/',
 };
 
 var paths = {
  js: [
    'js/**/*.js', 
    '!scripts/libs/**/*.js'
  ],
  packages: [
    'packages/**/*.js', 
    'packages/**/*.css'
  ],
  styles: [
    'css/**/*.css', 
    'css/images/**/*.jpg', 
    'css/images/**/*.png', 
    'css/images/**/*.svg', 
    'css/images/**/*.gif',
    'css/vendor/**',
    'css/web-fonts/**'
    ],
  html: ['*.html'],
  images: ['images/**/*.png', 'images/**/*.jpg', 'images/**/*.svg', 'images/**/*gif'],
  extras: ['crossdomain.xml', 'humans.txt', 'robots.txt', 'favicon.ico'],
 };

// watch files for changes and reload
gulp.task('serve', function() {
  var reload = browserSync.reload;

  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

// Set the banner content
const banner = ['/*!\n',
  ' * Start USAFB - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ` * Copyright 2017-${(new Date()).getFullYear()}`, ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
  ' */\n',
  ''
].join('')

// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src(bases.dist)
  .pipe(clean());
 });

 // Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
  gulp.src(paths.js, {cwd: bases.app})
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest(bases.dist + 'js/'));
 });

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
  // Copy html
  gulp.src(paths.html, {cwd: bases.app})
  .pipe(gulp.dest(bases.dist));
 
  // Copy styles
  gulp.src(paths.css, {cwd: bases.app})
  .pipe(gulp.dest(bases.dist + 'css'));
 
  // Copy lib scripts, maintaining the original directory structure
  gulp.src(paths.packages, {cwd: bases.app})
  .pipe(gulp.dest(bases.dist));
 
  // Copy extra html5bp files
  gulp.src(paths.extras, {cwd: bases.app})
  .pipe(gulp.dest(bases.dist));

  gulp.src([
    'node_modules/font-awesome/css/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest(bases.dist + '/css/vendor/font-awesome'))
 });

// autoprefix vendor browsers where necessary
gulp.task('autoprefixme', () => {
  return gulp.src('app/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write('.'))
      .pipe(rename({
        prefix: ''
      }))
      .pipe(gulp.dest('app/css/test'))
})

// Run everything
gulp.task('default', ['clean', 'copy'])
// Configure the browserSync task
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: ''
    }
  })
})

// Build CSS & JS files with browserSync
gulp.task('watch-all', ['browserSync', 'sass-2-css', 'autoprefixme', 'minify-css', 'minify-js'], () => {
  gulp.watch('scss/*.scss', ['sass-2-css'])
  gulp.watch('css/*.css', ['autoprefixme'], ['minify-css'])
  gulp.watch('js/*.js', ['minify-js'])
  // Reloads the browser whenever HTML, CSS or JS files change
  gulp.watch('*.html', browserSync.reload)
  gulp.watch('*.css', browserSync.reload)
  gulp.watch('js/**/*.js', browserSync.reload)
})

