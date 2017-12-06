var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
var cdnUrl = [
	[ '<link rel=\"stylesheet\" rev=\"stylesheet\" href=\"assets/fonts.css\" type=\"text/css\" media=\"all\" />', '' ],
	[ 'assets/in-view.min.js', 'https://anyway-web.b0.upaiyun.com/js/in-view.min.js' ],
	[ 'assets/', 'https://anyway-web.b0.upaiyun.com/anyway.tab/' ]
];

var fontUrl = [
	[ 'fonts/', 'https://anyway-web.b0.upaiyun.com/anyway.tab/' ]
];

 
gulp.task('default', function() {
	gulp.src(['index.html','*.php'])
		.pipe(plugins.fontSpider({ignore: ['assets/fonts.css']}));

	gulp.src(['*.html','*.php'])
		.pipe(plugins.batchReplace(cdnUrl))
		.pipe(gulp.dest('builds'));
		
	gulp.src('assets/fonts/*.*')
	        .pipe(gulp.dest('builds'));
	        
	gulp.src('*.svg')
	        .pipe(plugins.svgo())
	        .pipe(gulp.dest('builds'));
	
	gulp.src(['assets/*.css','!assets/*.min.css'])
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.batchReplace(fontUrl))
		.pipe(plugins.cleanCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('builds'));     
});

gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
});