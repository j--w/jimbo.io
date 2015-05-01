var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var cssmin = require('gulp-cssmin');


var paths = {
	templates: './app/**/*.jade',
  other: './app/**/*.ico',
	styles: './app/scss/**/*.scss',
	destStyles: './dist/css/',
	destHTML: './dist/'
};
gulp.task('styles', function() {
	gulp.src(paths.styles)
    .pipe(sass({
      // includePaths: require('node-bourbon').with('other/path', 'another/path') 
      // - or - 
      includePaths: require('node-bourbon').includePaths.concat(require('node-neat').includePaths)
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.destStyles));
});
gulp.task('copy-files', function () {
  gulp.src(paths.other)
    .pipe(gulp.dest(paths.destHTML));
});

gulp.task('templates', function() {
 
  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(gulp.dest(paths.destHTML));
});

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templates, ['templates']);
});

gulp.task('default', ['styles', 'templates', 'copy-files'], function() {
  // place code for your default task here
});