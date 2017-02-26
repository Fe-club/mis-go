var gulp = require('gulp');
var connect = require('gulp-connect');
var gulpSass = require('gulp-sass');
var gulpMinifyCss = require('gulp-minify-css');
var gulpSpritesmith = require('gulp.spritesmith');
var gulpImagemin = require('gulp-imagemin');

var ui = './static/ui';
var basePath = {
    scss: ui + '/scss',
    css: ui + '/css',
    imgs: ui + '/imgs',
    icons: ui + '/imgs/icons'
};

gulp.task('server',function(){
    connect.server({
        port: 8088,
        livereload: true,
        // host:'te.club'
    });
});

gulp.task('sass', function(){
    gulp.src(basePath.scss + '/main.scss')
        .pipe(gulpSass())
        .pipe(gulpMinifyCss({
            advanced: false,  // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',  // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false,  // 类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'  // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest(basePath.css))
        .pipe(connect.reload());
});

gulp.task('sprite', function(){
    return gulp.src(basePath.icons + '/*.png')
        .pipe(gulpSpritesmith({
            imgName: 'sprite.png',
            cssName: 'icon.css'
        }))
        .pipe(gulp.dest(basePath.imgs));
});

gulp.task('image_min', ['sprite'], function(){
    gulp.src(basePath.imgs + '/*.{png,jpg.gif}')
        .pipe(gulpImagemin())
        .pipe(gulp.dest(basePath.imgs));
});

gulp.task('watch', function(){
    gulp.watch(basePath.scss + '/**/*.scss', ['sass']);
});

gulp.task('default',['sass', 'server','watch']);
