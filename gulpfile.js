var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var doiuse = require('doiuse');

var browsers = ['last 2 versions', '> 5%'];
gulp.task('sass', function () {
    return gulp.src('./styles/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: browsers })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('doiuse', ['sass'], function () {
    return gulp.src('./index.css')
        .pipe(postcss([doiuse({ browsers: browsers })]))
});

gulp.task('sass:watch', function () {
    gulp.watch('./styles/**/*.scss', ['sass']);
});

var browserSync = require('browser-sync').create();
gulp.task('serve', ['sass:watch'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(['index.html']).on('change', browserSync.reload);
});