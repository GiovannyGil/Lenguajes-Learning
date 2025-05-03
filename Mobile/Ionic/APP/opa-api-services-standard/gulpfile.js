const { src, dest, series } = require('gulp');
var uglify = require('gulp-uglify');

function defaultTask() {
  return src('app/**/*.js')
    .pipe(uglify())
		.pipe(dest('dist/app'));
}

function copyFiles () {
	return src(['imagen/**/*']).pipe(dest('dist/imagen'));
};

function copyAssets () {
	return src(['app/**/*']).pipe(dest('dist/app'));
};

function copySMTP () {
	return src(['smpt-mail/**/*.js'])
    .pipe(uglify())
    .pipe(dest('dist/smpt-mail'));
};

function copyIndexFiles () {
	return src(['package.json', 'package-lock.json', 'example.env', 'server.js', 'config.example.json'])
    .pipe(dest('dist'));
};

exports.default = defaultTask
exports.copyFiles = copyFiles
exports.copyAssets = copyAssets


exports.build = series(copyFiles, copyAssets, copySMTP, copyIndexFiles, defaultTask)