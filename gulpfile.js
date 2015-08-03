var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps');

// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Converts Jade to HTML
gulp.task('jade', function() {
  return gulp.src('src/**/*.jade')
    .pipe(jade({
        pretty: true,  // uncompressed
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Jade to HTML task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/styles/*', 'dist/assets/scripts/*', 'dist/*.html', 'dist/assets/images/*', '!dist/assets/styles/.gitignore', '!dist/assets/scripts/.gitignore', '!dist/assets/images/.gitignore'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start(['styles', 'scripts', 'jade', 'images']);
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch Jade files
  gulp.watch('src/**/*.jade', ['jade']);
  
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

});

// Serve and reload
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "dist/"
    });

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch Jade files
    gulp.watch('src/**/*.jade', ['jade']);
    
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    gulp.watch('dist/**/*').on('change', browserSync.reload);
});