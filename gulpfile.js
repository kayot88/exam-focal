'use strict';

var gulp     = require('gulp'),
sass 		 = require('gulp-sass'),
prefixer = require('gulp-autoprefixer'),
watch 		 = require('gulp-watch'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
include = require('gulp-include'),
notify       = require('gulp-notify'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
//uglify 		 = require('gulp-uglify'),
gcmq = require('gulp-group-css-media-queries'),
babel       = require('gulp-babel'),
smartgrid    = require('smart-grid'),  
sourcemaps   = require('gulp-sourcemaps');

var paths= {
	src: {
		html: ["*.html"],
		css: "sass/style.scss",
		img: "img/**/*.*",
		fonts: "fonts/**/*.*",
		js_main: "js/script.js",
		js: "js/",		
		images: "img/**/*.*"
	},
	dest: {
		css: "css/",
		html: "dist/",
		images: "dist/img/",
		js: "dist/js/"
	},
	watch: {
		css: "sass/**/*.scss",
		html: "*.html",
		images: "img/**/*.*",
		js: "js/script.js"
	},
	bootstrap: './node_modules/bootstrap/dist/js/',
	jquery: './node_modules/jquery/dist/'
}

gulp.task('css', function(){
	gulp.src(paths.src.css)
	.pipe(sass({
		//outputStyle: 'compressed',
		sourceMap: true,
		errorToConsole: true }))
	.pipe(prefixer())
	.pipe(sourcemaps.init())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.dest.css))
	.pipe(reload({stream: true}))
});

gulp.task('html', function(){
	gulp.src(paths.src.html)
	.pipe(include({
		extensions: "html",
		hardFail: true,
	})).on('error', notify.onError(
	{
		message: "<%= error.message %>",
		title  : "HTML build error!"
	}
	)
	)
	.pipe(gulp.dest(paths.dest.html))
	.pipe(reload({stream: true}))
});

gulp.task('images', function () {
	gulp.src(paths.src.images)
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced: true
	}))
	.pipe(gulp.dest(paths.dest.images))
	.pipe(reload({stream: true}));
});

gulp.task('js', function () {
	gulp.src(paths.src.js_main)
	.pipe(include({
		extensions: "js",
		hardFail: true,
		includePaths: [paths.bootstrap, paths.jquery, paths.src.js]
	}).on('error', notify.onError(
	{
		message: "<%= error.message %>",
		title  : "JS Error!"
	}
	)
	)
	)
	// .pipe(uglify().on('error', notify.onError(
	// {
	// 	message: "<%= error.message %>",
	// 	title  : "JS Error!"
	// }
	// )
	// )
	// )
	.pipe(gulp.dest(paths.dest.js))
		//.pipe(notify({ message: 'JS task complete', sound: false, onLast: true }))
		.pipe(reload({stream: true}));
	});

gulp.task('watch', function() {
	gulp.watch([paths.watch.css], function(event, cb){
		gulp.start('css');
	});

	gulp.watch([paths.watch.html], function(event, cb){
		gulp.start('html');
	});

	// gulp.watch("js/script.js", function(event, cb){
	// 	gulp.start('babel');
	// });
	gulp.watch("js/script.js", ['babel']);

	gulp.watch([paths.watch.images], function(event, cb){
		gulp.start('images');
	});

	gulp.watch([paths.watch.js], function(event, cb){
		gulp.start('js');
	});
});

gulp.task('refresh', function(){
	browserSync({
		server: {
			baseDir: './'
		},
		injectChanges: true
	});
});

gulp.task('build', [
	'html', 
	'css',
	'images',
	'js'
	]);

gulp.task('default', ['build', 'refresh', 'watch']);





//	gulp.watch("./js/script.js", ['babel']);
//babel
gulp.task('babel', () =>
	gulp.src('js/script.js')
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(gulp.dest('dist'))
	);

//smart grid
// var smartGridSettings = {
// 	outputStyle: 'scss',
// 	filename: '_smart-grid', 
// 	columns: 24, 
// 	offset: "12px", 
// 	container: {
// 		maxWidth: '1092px',
// 		fields: '12px' 
// 	},
// 	breakPoints: {
// 		lg: {
// 			'width': '1000px', 
// 			'fields': '12px' 
// 		},
// 		md: {
// 			'width': '960px',
// 			'fields': '15px'
// 		},
// 		sm: {
// 			'width': '780px',
// 			'fields': '15px'
// 		},
// 		xs: {
// 			'width': '660px',
// 			'fields': '15px'
// 		}
// 	}
// };

// gulp.task('smartgrid', function() {
// 	smartgrid('sass/base', smartGridSettings);
// });

//gulp.task('watch', ['smartgrid']);

//gcmq
// gulp.task('gcmq', function () {
//     gulp.src('app/css/main.min.css')
//         .pipe(gcmq())
//         .pipe(gulp.dest('dist/css'));
// })