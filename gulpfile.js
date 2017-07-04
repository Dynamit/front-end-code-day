var gulp = require('gulp');
var plumber = require('gulp-plumber');

// connect
var connect = require('gulp-connect-multi')(); 

gulp.task('connect', connect.server({
    host: '127.0.0.1',
    root: ['site'],
    port: 9090,
    livereload: true,
    open: {browser: 'chrome'}
}));

// styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
    gulp.src('./dev/scss/style.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('./site/'))
        .pipe(connect.reload());
});

// templates
var htmlmin = require('gulp-htmlmin');

gulp.task('templates', function() {
    gulp.src('./dev/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./site/'))
        .pipe(connect.reload());
});

// scripts
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    gulp.src('./dev/js/*.js')
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./site/'))
        .pipe(connect.reload());
});


// images 
var imagemin = require('gulp-imagemin');
 
gulp.task('images', function() {
    gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
        .pipe(connect.reload());
});

// watcher
gulp.task('watcher', function() {
    gulp.watch('*.html', {cwd:'./dev/'}, ['templates']);
    gulp.watch('scss/*.scss', {cwd:'./dev/'}, ['styles']);
    gulp.watch('js/*.js', {cwd:'./dev/'}, ['scripts']);
    gulp.watch('images/**/*.{png,jpg,jpeg,gif,svg}', {cwd:'./dev/'}, ['images']);
});

gulp.task('default', ['styles', 'templates', 'scripts', 'images']);
gulp.task('dev', ['default', 'connect', 'watcher']);