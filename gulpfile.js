'use strict';

var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var order = require("gulp-order");
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');
var gulpFilter = require('gulp-filter');
var spritesmith = require('gulp.spritesmith');
var	merge = require('merge-stream');
var liveserver = require('gulp-live-server');

gulp.task('default', ['main-bower-files-js','fonts','sass','sass-concat','js','html','sprite','img','watch','server']);

gulp.task('main-bower-files-js',['js'], function(){
	 var filterJS = gulpFilter(['**/*.js']);
	return gulp.src('./bower.json')
		.pipe(mainBowerFiles())
		.pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
		.pipe(gulp.dest('app/src/js'))
});

gulp.task('sass', function () {
	return gulp.src('app/src/sass/**/*.scss')		
   		.pipe(sass().on('error', sass.logError))
   		.pipe(gulp.dest('app/src/css'));
});

gulp.task('sass-concat',['sass'], function(){
	return gulp.src('app/src/css/style.css')
		.pipe(concat('style.min.css'))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js',function(){
	return gulp.src('app/src/js/**/*.js')	
		.pipe(babel({
            presets: ['es2015']
        }))   
        .pipe(order([
		    "app/src/js/vendor.js",
		    "app/src/js/functions/*.js",
		    "app/src/js/ini.js"
		  ], { base: './' }))     
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
	  .pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['./bower_components/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('app/src/img/sprite/*.*')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.css'
		}));

	var imgStream = spriteData.img
		.pipe(gulp.dest('dist/assets/img'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('app/src/css'));	
	return merge(imgStream, cssStream);
});

gulp.task('img', function() {
    return gulp.src(['app/src/img/*.*'])
            .pipe(gulp.dest('dist/assets/img/'));
});

gulp.task('watch', function(){
	gulp.watch('app/src/sass/**/*.scss',['sass','sass-concat']);	
	gulp.watch('app/src/js/**/*.js',['js']);	
	gulp.watch('app/elements/**/*.html',['html']);
	gulp.watch('app/*.html',['html']);
	gulp.watch('app/src/img/sprite/*.*',['sprite']);
	gulp.watch('app/src/img/*.*',['img']);
});

gulp.task('server', function(){
	var server = liveserver.static('./dist',8000);
	server.start();
	gulp.watch('dist/assets/css/**/*.css', function(f){
		liveserver.notify.apply(server,[f])
	});
	gulp.watch('dist/assets/js/**/*.js', function(f){
		liveserver.notify.apply(server,[f])
	});	
	gulp.watch('dist/*.html', function(f){
		liveserver.notify.apply(server,[f])
	});
});