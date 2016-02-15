var gulp = require('gulp')
var browserify  = require('browserify');
var babelify    = require('babelify');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
var minify = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var del = require('del');
var notify = require('gulp-notify')

/* Clean development */
gulp.task('clean', function(){
  del(['./dist/*.*', './dist/*'], {force: true}, null);
})

/* Clean production */
gulp.task('clean-production', function(){
  del(['../redux-production/*.*', '../redux-production/*'], {force: true}, null);
})

var handleErrors = function () {

  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end')
}

/* Scripts */
gulp.task('scripts', function () {
  return browserify('./src/redux-simple-starter-udemy/index.js', { debug: true })
  .transform(babelify, {
    presets: ['es2015', 'react'],
	plugins : ['transform-object-rest-spread']
  })
  .bundle()
  .on('error', handleErrors)
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({ stream: true}))
});

/* Stylus */
gulp.task('styles', function(){
	return gulp.src('./src/redux-simple-starter-udemy/style/app.styl')
	.pipe(stylus({
		'include css' : true
	}))
	.on('error', handleErrors)
	.pipe(sourcemaps.init())
	.pipe(minify())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({stream : true}));
});

/* HTML */
gulp.task('html', function () {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./src/redux-simple-starter-udemy/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'));})

gulp.task('copy', function(){
	return gulp.src('./dist/*.*')
	.pipe(gulp.dest('../redux-production'))
	.pipe(notify({message: 'data copied for distribuion'}))
})

gulp.task('build', ['clean', 'scripts', 'html', 'styles'])

gulp.task('production', ['clean-production', 'copy'])

gulp.task('watch', ['build'], function () {

  browserSync.init({
    server: './dist'
  });

  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./src/**/**/*.js', './src/**/**/*.jsx'], ['scripts']);
  gulp.watch(['./src/*.styl'], ['styles']);
})

gulp.task('default', ['watch'])
