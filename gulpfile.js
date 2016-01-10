/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
	postcss = require('gulp-postcss'),
	autoprefixer2 = require('autoprefixer'),
	cssgrace = require('cssgrace'),
	cssnext = require('postcss-cssnext'),
	del = require('del'),
	color_rgba_fallback = require('postcss-color-rgba-fallback'),	
	opacity = require('postcss-opacity'),
	pseudoelements = require('postcss-pseudoelements'),
	vmin = require('postcss-vmin'),
	pixrem = require('pixrem'),
	will_change = require('postcss-will-change'),
    atImport = require('postcss-import'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano');

// postCSS
gulp.task('css', function () {
    var processors = [
        cssnext(),
        cssgrace,
        will_change,
        autoprefixer2({browsers:'safari >= 9, ie >= 7'}),
        color_rgba_fallback,
        opacity,
        pseudoelements,
        vmin,
        pixrem
    ];
	
	return gulp.src('src/css/**/*.css').pipe(postcss(processors)).pipe(gulp.dest('dist/css'));
})

gulp.task('minify', ['css'], function () {
    var processors = [
        atImport,
        mqpacker,
        cssnano
    ];

    return gulp.src('src/css/**/*.css').pipe(postcss(processors)).pipe(gulp.dest('dist/css'))
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/css/**/*.css')
    // .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 7', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    // .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, use: [pngquant()] }))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/images'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
// Watch
// gulp.task('watch', function() {
//   // Watch .scss files
//   gulp.watch('src/styles/**/*.scss', ['styles']);
//   // Watch .js files
//   gulp.watch('src/scripts/**/*.js', ['scripts']);
//   // Watch image files
//   gulp.watch('src/images/**/*', ['images']);
//   // Create LiveReload server
//   livereload.listen();
//   // Watch any files in dist/, reload on change
//   gulp.watch(['dist/**']).on('change', livereload.changed);
// });
