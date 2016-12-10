var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    //minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');
    flatten= require('gulp-flatten');
    clean = require('gulp-clean');
var map = require('map-stream');
var fs = require('fs');
var del = require('del');

//清空编译的dist目录和build目录
gulp.task('clean',function(){
    return gulp.src([
        './dist/*',
        './build/*',
        '!./build/index.html'
    ]).pipe(clean());
});
//静态文件拷贝 html/images/css/font
gulp.task('copystatic',['copyhtml','copyimages','copycss','minifycss_lib','copyfont']);
gulp.task('copyhtml', function(){
    return gulp.src('./src/html/**/*.*').pipe(gulp.dest('./build/html'));
});
gulp.task('copyimages', function(){
    return gulp.src('./src/images/**/*.*').pipe(gulp.dest('./build/images'));
});
gulp.task('copycss',function(){
    return gulp.src('./src/css/**/*.*').pipe(gulp.dest('./build/css'));
});
gulp.task('minifycss_lib', function () {
    return gulp.src([
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/font-awesome/css/font-awesome.min.css',
            './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
            './bower_components/ng-dialog/css/ngDialog.min.css',
            './bower_components/ng-dialog/css/ngDialog-theme-default.min.css',
            './bower_components/ng-dialog/css/ngDialog-theme-plain.min.css',
            './bower_components/fullcalendar/dist/fullcalendar.css',
            './bower_components/angular-color-picker/dist/angularjs-color-picker.min.css',
            './bower_components/angular-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css',
            './bower_components/textAngular/dist/textAngular.css'
        ])
        .pipe(concat('lib.css'))                    //需要操作的文件
        .pipe(gulp.dest('./dist'))
        .pipe(rename({ suffix: '.min' }))           //rename压缩后的文件名
        .pipe(cleanCSS({ compatibility: 'ie7' }))   //执行压缩
        .pipe(gulp.dest('./build/css'));           //输出文件夹
});

//拷贝字体
gulp.task('copyfont',function(){
    return gulp.src([
        './bower_components/*/fonts/*.*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'));
});

//代码检查
gulp.task('jshint', function () {
    return gulp.src(['./src/controller/**/*.js','./src/directive/**/*.js','./src/script/*.js'])
        .pipe(jshint())
        .pipe(myReporter);
});

//代码合并压缩
gulp.task('minifyjs', ['minify_lib', 'minify_workflow'], function () {
    return gulp.src([
            './src/controller/**/*.js',
            './src/script/*.js',
            './src/directive/*.js'
        ])                                 //需要操作的文件
        .pipe(concat('app.js'))           //合并所有js到main.js
        .pipe(gulp.dest('./dist'))        //输出到文件夹
        .pipe(rename({ suffix: '.min' }))  //rename压缩后的文件名
        .pipe(uglify())                    //压缩
        .pipe(gulp.dest('./build'));      //输出
});

//合并1 流程设计器相关的库和指令
gulp.task('minify_workflow',function(){
    return gulp.src([
        './bower_components/jquery-ui/jquery-ui.min.js',
        './bower_components/shifty/dist/shifty.min.js',
        './bower_components/draw2d/dist/patched_raphael.js',
        './bower_components/draw2d/dist/jquery.autoresize.js',
        './bower_components/draw2d/dist/jquery-touch_punch.js',
        './bower_components/draw2d/dist/jquery.contextmenu.js',
        './bower_components/draw2d/dist/rgbcolor.js',
        './bower_components/draw2d/dist/patched_canvg.js',
        './bower_components/draw2d/dist/patched_Class.js',
        './bower_components/draw2d/dist/json2.js',
        './bower_components/draw2d/dist/pathfinding-browser.min.js',
        './bower_components/draw2d/dist/draw2d.js',
        './src/directive/workflow/draw2d.js',
        './src/directive/workflow/canvas.js',
        './src/directive/workflow/palette.js'
    ])                                 //需要操作的文件
    .pipe(concat('workflow.js'))       //合并所有js到main.js
    .pipe(gulp.dest('./dist'))        //输出到文件夹
    .pipe(rename({ suffix: '.min' }))  //rename压缩后的文件名
    .pipe(uglify())                    //压缩
    .pipe(gulp.dest('./build'));      //输出
});

//合并2 第三方引用js合并
gulp.task('minify_lib',function(){
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/jquery-md5/jquery.md5.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',

        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-touch/angular-touch.min.js',
        './bower_components/ng-dialog/js/ngDialog.min.js',
        './bower_components/angular-popups/dist/angular-popups.js',
        './bower_components/moment/min/moment.min.js',
        './bower_components/angular-ui-calendar/src/calendar.js',
        './bower_components/fullcalendar/dist/fullcalendar.min.js',
        './bower_components/fullcalendar/dist/gcal.js',
        './bower_components/tinycolor/dist/tinycolor-min.js',
        './bower_components/angular-color-picker/dist/angularjs-color-picker.min.js',
        './bower_components/textAngular/dist/textAngular-rangy.min.js',
        './bower_components/textAngular/dist/textAngular-sanitize.min.js',
        './bower_components/textAngular/dist/textAngular.min.js',
        './bower_components/ng-file-upload/ng-file-upload.min.js',
        './bower_components/echarts/build/dist/echarts-all.js',
        './bower_components/angular-echarts/dist/angular-echarts.min.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist'))        //输出到文件夹
    .pipe(rename({ suffix: '.min' }))  //rename压缩后的文件名
    //.pipe(uglify())                  //大部分是已压缩的代码合并，无需再次混淆 
    .pipe(gulp.dest('./build'));      //输出
});

//默认方法
gulp.task('default', ['clean'], function () {
    gulp.start(['jshint','minifyjs','copystatic']);
});


//自定义文件报告
var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    fs.appendFileSync('./logs/check_result.txt', '\n[' + new Date().toLocaleString() + '] Error in ' + file.path + ' ' + '\n');
    file.jshint.results.forEach(function (err) {
      if (err) {
        var logtxt = ' # line ' + err.error.line + ', col ' + err.error.character + ', code ' + err.error.code + ', ' + err.error.reason + '\n';
        fs.appendFileSync('./logs/check_result.txt', logtxt);
      }
    });
  }
  cb(null, file);
});

//仅仅检查，输出结果到文件
gulp.task('check', function () {
    return gulp.src(['./src/controller/**/*.js','./src/directive/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(myReporter);
});