var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var del = require('del');
var rename = require('gulp-rename');
var webpack = require('webpack');
var concat = require('gulp-concat');
var processors = [
    autoprefixer({
        browsers: ['last 10 version']
    })
];

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
});

gulp.task('css', function () {
    return gulp.src('src/assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build/assets'))
        .pipe(browserSync.stream())
});

gulp.task('vendor:css', function () {
    return gulp.src('src/vendor/css/*.css')
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('build/assets'));
});

gulp.task('js', function (callback) {
    webpack(require('./webpack.config'), function (err, stats) {
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

var reload = function (done) {
    browserSync.reload();
    done();
}

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series('html', reload));
    gulp.watch('src/assets/sass/*.scss', gulp.series('css'));
    gulp.watch('src/assets/js/**/*.js', gulp.series('js', reload));
});

gulp.task('copy', function () {
    return gulp.src([
            'src/**/*.{jpg,png,jpeg,gif,svg,ttf,otf}'
        ])
        .pipe(gulp.dest('build'))
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('build', gulp.parallel('css', 'html', 'js', 'copy', 'vendor:css'));
gulp.task('start', gulp.parallel('watch', 'serve'));

gulp.task('default', gulp.series('clean', 'build', 'start'));