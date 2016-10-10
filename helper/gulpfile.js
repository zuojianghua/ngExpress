var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    //minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');
var map = require('map-stream');
var fs = require('fs');

//静态文件拷贝 html/images
gulp.task('copystatic',['copyhtml','copyimages','copycss'],function(){
    return;
});

gulp.task('copyhtml',function(){
    return gulp.src('../src/html/**/*.*').pipe(gulp.dest('../build/html'));
});
gulp.task('copyimages',function(){
    return gulp.src('../src/images/**/*.*').pipe(gulp.dest('../build/images'));
});
gulp.task('copycss',function(){
    return gulp.src('../src/css/**/*.*').pipe(gulp.dest('../build/css'));
});

//代码检查
gulp.task('jshint', function () {
    return gulp.src(['../src/controller/**/*.js','../src/directive/**/*.js','../src/script/*.js'])
        .pipe(jshint())
        .pipe(myReporter);
});

//代码合并压缩
gulp.task('minifyjs', function () {
    return gulp.src(['../src/controller/**/*.js','../src/directive/*.js','../src/script/*.js'])      //需要操作的文件
        .pipe(concat('main.js'))           //合并所有js到main.js
        .pipe(gulp.dest('../dist'))        //输出到文件夹
        .pipe(rename({ suffix: '.min' }))  //rename压缩后的文件名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('../build'));      //输出
});

//默认方法
gulp.task('default', ['jshint','copystatic'], function () {
    gulp.start('minifyjs');
});

// //压缩css
// gulp.task('minifycss', function () {
//     return gulp.src('css/*.css')    //需要操作的文件
//         .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
//         .pipe(cleanCSS({ compatibility: 'ie7' }))   //执行压缩
//         .pipe(gulp.dest('Css'));   //输出文件夹
// });

// //压缩,合并 js
// gulp.task('minifyjs', function () {
//     return gulp.src('js/*.js')      //需要操作的文件
//         .pipe(concat('main.js'))    //合并所有js到main.js
//         .pipe(gulp.dest('js'))       //输出到文件夹
//         .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
//         .pipe(uglify())    //压缩
//         .pipe(gulp.dest('Js'));  //输出
// });

// 　　//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
// gulp.task('default', ['jshint'], function () {
//     gulp.start('minifycss', 'minifyjs');
// 　　});


//自定义文件报告
var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    fs.appendFileSync('check_result.txt', '\n[' + new Date().toLocaleString() + '] Error in ' + file.path + ' ' + '\n');
    file.jshint.results.forEach(function (err) {
      if (err) {
        var logtxt = ' # line ' + err.error.line + ', col ' + err.error.character + ', code ' + err.error.code + ', ' + err.error.reason + '\n';
        fs.appendFileSync('check_result.txt', logtxt);
      }
    });
  }
  cb(null, file);
});
//仅仅检查，输出结果到文件
gulp.task('check', function () {
    return gulp.src(['../src/controller/**/*.js','../src/directive/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(myReporter);
});