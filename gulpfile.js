const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')

gulp.task('start', ['watch-sass', 'nodemon'])

gulp.task('watch-sass', ['sass'], () => {
	return gulp
		.watch('./styles/**/*.scss', ['sass'])
})

gulp.task('sass', () => {
	return gulp
		.src('./styles/style.scss', ['sass'])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./build'))
})

gulp.task('nodemon', () => {
	nodemon({
		script: 'index.js', 
		ext: 'js', 
		env: { 'NODE_ENV': 'development' }
	})
})
