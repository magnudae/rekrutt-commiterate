// include gulp
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// Default task(s)
gulp.task('default', ['nodemon'], function() {
});

gulp.task('nodemon', function(){
    nodemon({script: 'app.js'});
});