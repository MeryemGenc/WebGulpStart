const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');

// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});


gulp.task('css', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.html' , gulp.series('html'));
    gulp.watch('src/img/**/*' , gulp.series('img'));
    gulp.watch('src/js/**/*.js' , gulp.series('js'));
    gulp.watch('src/sass/**/*.scss' , gulp.series('css'));
});


gulp.task('default',
    gulp.parallel(
        'html',
        'css',
        'js',
        'img',
        'browser-sync',
        'watch'
));
    



