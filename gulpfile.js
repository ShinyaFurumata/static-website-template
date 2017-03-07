var gulp = require("gulp");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var bower = require('main-bower-files');
var gulpFilter = require('gulp-filter');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require('gulp-rename');
var sass = require("gulp-sass");
var slim = require("gulp-slim");
var autoprefixer = require("gulp-autoprefixer");
var cache = require('gulp-cached');
var merge = require('merge-stream');
var imagemin = require("gulp-imagemin");
var changed  = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

/*--------------------- slim [slim] --------------------*/
gulp.task('slim', function() {
  var under = gulp.src(["./app/views/**/*.slim" , '!./app/views/partial/*.slim'])
    .pipe(cache( 'slim' ))
    .pipe(plumber())
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=["./app/views/partial"]'
    }))
    .pipe(gulp.dest('./public/'))

    var top =  gulp.src('./app/views/index.slim')
    .pipe(slim({
      pretty: true,
      require: 'slim/include',
      options: 'include_dirs=["./app/views/partial"]'
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browser.reload({stream:true}));

    return merge(under, top);
});

/*--------------------- sass [sass] --------------------*/
gulp.task("sass", function() {
  gulp.src("./app/stylesheets/application.sass")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({pretty: true}))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest("./public/css/"))
    .pipe(browser.reload({stream:true}));
    });

/*--------------------- image [imagemin] --------------------*/
gulp.task("imagemin", function() {
    gulp.src("./app/images/**/*.+(jpg|jpeg|png|gif|svg)")
        .pipe(changed( './public/img/' ))
        .pipe(imagemin())
        .pipe(gulp.dest("./public/img/"));
});

/*--------------------- JavaScript [jsmin] --------------------*/
gulp.task("jsmin", function() {
    gulp.src("./app/javascripts/*.js")
        .pipe(changed( 'jsmin' ))
        .pipe(plumber())
        .pipe(uglify())
        .pipe( rename({
          extname: '.min.js'
        }) )
        .pipe(gulp.dest("./public/js/"))
        .pipe(browser.reload({stream:true}))
});

/*--------------------- deploy [deploy] --------------------*/
var conn_config = {
  host: 'hoge',
  user: 'hoge',
  password: 'password',
  parallel: 5,
  log: gutil.log
}
var remoteDest = '/home/hogehoge/www/hogehoge';
var globs = [
        'public/**'
];

gulp.task('deploy', function(){
  var conn = ftp.create(conn_config);
  gulp.src(globs, {buffer: false, dot: true})
    .pipe(conn.newerOrDifferentSize(remoteDest))
    .pipe(conn.dest(remoteDest));
});

/*--------------------- browser sync [server] --------------------*/
gulp.task("server", function() {
    browser({
        server: {
            baseDir: ["./public/"],
        },

         ghostMode: {
          location: true
        }
    });
});

/*--------------------- bower [bower] --------------------*/
gulp.task('bower', function() {
  var jsDir = './app/javascripts/',
      jsFilter = gulpFilter('**/*.js', {restore: true});
  return gulp.src( bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }) )
    .pipe( jsFilter )
    .pipe( concat('_bundle.js') )
    .pipe( gulp.dest(jsDir) )
    .pipe( uglify({
      preserveComments: 'some'
    }) )
    .pipe( rename({
      extname: '.min.js'
    }) )
    .pipe( gulp.dest('./public/js/') )
    .pipe( jsFilter.restore );
});

/*--------------------- watch --------------------*/
gulp.task('watch', function () {
    gulp.watch(['./app/views/**/*.slim','./app/views/partial/*.slim'],['slim']);
    gulp.watch("./app/**/*.sass", ['sass']);
    gulp.watch("./app/javascripts/*.js", ['jsmin']);
});

/*--------------------- default [gulp] --------------------*/
gulp.task('default', ['server' , 'watch' , 'bower' ,'imagemin' ,'slim'] );
