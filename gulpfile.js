const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const webpack = require("webpack-stream");

const dist = "./dist/";
// const dist = " c:/MAMP/htdocs/elon_musk/";

// стартовая сборка 

gulp.task('server', function() {

   browserSync({
      server: {
         baseDir: "dist"
      }
   });

   gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
   return gulp.src("src/scss/**/*.+(scss|sass)")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(cleanCSS({compatibility: 'ie11'}))
      .pipe(gulp.dest(dist + "/css"))
      .pipe(browserSync.stream());
});

gulp.task('watch', function() {
   gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
   gulp.watch("src/*.html").on('change', gulp.parallel('html'));
   gulp.watch("src/js/**/*.js)").on('change', gulp.parallel('build-js'));
   // gulp.watch("src/slick/**/*.*").on('all', gulp.parallel('copy-slick'));
   // gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
   gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
   gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
   return gulp.src("src/*.html")
       .pipe(htmlmin({ collapseWhitespace: true }))
       .pipe(gulp.dest(dist + "/"));
});

gulp.task("build-js", () => {
   return gulp.src("./src/js/main.js")
               .pipe(webpack({
                  mode: 'development',
                  output: {
                     filename: 'script.js'
                  },
                  watch: true,
                  devtool: "source-map",
                  module: {
                     rules: [
                        {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                           loader: 'babel-loader',
                           options: {
                              presets: [['@babel/preset-env', {
                                 debug: true,
                                 corejs: 3,
                                 useBuiltIns: "usage"
                              }]]
                           }
                        }
                        }
                     ]
                  }
               }))
               .pipe(gulp.dest(dist + "/js"))
               .on("end", browserSync.reload);
});

gulp.task("build-prod-js", () => {
   return gulp.src("./src/js/main.js")
               .pipe(webpack({
                   mode: 'production',
                   output: {
                       filename: 'script.js'
                   },
                   module: {
                       rules: [
                         {
                           test: /\.m?js$/,
                           exclude: /(node_modules|bower_components)/,
                           use: {
                             loader: 'babel-loader',
                             options: {
                               presets: [['@babel/preset-env', {
                                   corejs: 3,
                                   useBuiltIns: "usage"
                               }]]
                             }
                           }
                         }
                       ]
                     }
               }))
               .pipe(gulp.dest(dist + "/js"));
});

// gulp.task('copy-slick', function () {
//    return gulp.src("src/slick/**/*.*")
//       .pipe(gulp.dest(dist + "/slick"))
//       .pipe(browserSync.stream());
// });

// gulp.task('scripts', function () {
//    return gulp.src("src/js/**/*.js")
//        .pipe(gulp.dest(dist + "/js"))
//        .pipe(browserSync.stream());
// });

// gulp.task('fonts', function () {
//    return gulp.src("src/fonts/**/*")
//        .pipe(gulp.dest(dist + "/fonts"))
//        .pipe(browserSync.stream());
// });

gulp.task('icons', function () {
   return gulp.src("src/icons/**/*")
      .pipe(gulp.dest(dist + "/icons"))
      .pipe(browserSync.stream());
});

gulp.task('images', function () {
   return gulp.src("src/img/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest(dist + "/img"))
      .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'icons', 'html', 'images', 'build-js'));
// gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'icons', 'html', 'images', 'build-js', 'copy-slick'));



// сборка под PHP

// gulp.task('server', function() {

//    browserSync({
//       server: {
//          baseDir: "dist"
//       }
//    });

//    gulp.watch("src/*.html").on('change', browserSync.reload);
// });

// gulp.task('styles', function() {
//    return gulp.src("src/sass/**/*.+(scss|sass)")
//       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//       .pipe(rename({suffix: '.min', prefix: ''}))
//       .pipe(autoprefixer())
//       .pipe(cleanCSS({compatibility: 'ie8'}))
//       .pipe(gulp.dest(dist + "/css"))
//       .pipe(browserSync.stream());
// });

// gulp.task('watch', function() {
//    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
//    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
//    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
//    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
//    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
//    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
//    gulp.watch("src/mailer/**/*").on('all', gulp.parallel('php'));
// });
// // new task PHP 
// gulp.task('php', function () {
//    return gulp.src("src/mailer/**/*")
//       .pipe(gulp.dest(dist + "/mailer"))
//       .pipe(browserSync.stream());
// });
// // 
// gulp.task('html', function () {
//    return gulp.src("src/*.html")
//       .pipe(htmlmin({ collapseWhitespace: true }))
//       .pipe(gulp.dest(dist + "/"));
// });

// gulp.task('scripts', function () {
//    return gulp.src("src/js/**/*.js")
//       .pipe(gulp.dest(dist + "/js"))
//       .pipe(browserSync.stream());
// });

// gulp.task('fonts', function () {
//    return gulp.src("src/fonts/**/*")
//       .pipe(gulp.dest("/fonts"))
//       .pipe(browserSync.stream());
// });

// gulp.task('icons', function () {
//    return gulp.src("src/icons/**/*")
//       .pipe(gulp.dest(dist + "/icons"))
//       .pipe(browserSync.stream());
// });

// gulp.task('images', function () {
//    return gulp.src("src/img/**/*")
//       .pipe(imagemin())
//       .pipe(gulp.dest(dist + "/img"))
//       .pipe(browserSync.stream());
// });

// gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images', 'php'));


