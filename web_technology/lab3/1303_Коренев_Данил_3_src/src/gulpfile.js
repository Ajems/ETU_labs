const gulp = require('gulp');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const sass = gulpSass(dartSass);

function scripts() {
    return gulp
        .src('public/javascripts/view/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/gulp/js'))
}

function styles() {
    return gulp
        .src('public/stylesheetssass/*.sass')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/gulp/css'))
}

function html() {
    return gulp
        .src('views/login/login.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('public/gulp/html'))
}

function watch() {
    gulp.watch('public/javascripts/view/*.js', scripts);
    gulp.watch('public/stylesheetssass/*.sass', styles);
    // gulp.watch('views/login/login.pug', html);
}

const build = gulp.parallel(scripts, styles, html);
const dev = gulp.series(build, watch);

module.exports = {scripts, styles, html, build, dev};
exports.default = dev;