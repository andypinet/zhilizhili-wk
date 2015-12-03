module.exports = function(options) {
  var gulp = require('gulp-param')(require('gulp'), process.argv);
  var exec = require('child_process').exec;
  var babel = require('gulp-babel');
  var browserify = require("gulp-browserify");
  var babelify = require("babelify");
  var debounce = require('debounce');

  var paths = Object.assign({
      srcRoot: 'src/',
      destRoot: 'dist/'
  }, options.paths);

  gulp.task('build-es', function(src, dest) {
      return gulp.src(src)
          .pipe(es5)
          .pipe(gulp.dest(dest));
  });

  var es5 = browserify({
      transform: function(filename, opts){
          return babelify(filename, {
              presets: ['es2015'],
              plugins: ['transform-regenerator']
          });
      }
  });

  var zst = function(name, destpath) {
      "use strict";
      if (typeof destpath == "boolean") {
          destpath = '';
      }

      return debounce(function(){
          var src = paths.srcRoot + `${destpath}/${name}.js`;
          var dest = paths.destRoot + `${destpath}`;

          exec("gulp build-es -d --src " + src + " --dest " + dest, function(err, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
          });
      }, 0);
  };

  gulp.task("build-es5", function(name, dest) {
     zst(name, dest)();
  });

  gulp.task("watch-es5", function(name, dest){
      dest = dest || '';
      gulp.watch(paths.srcRoot + `${dest}/${name}.js`, zst(name, dest));
  });
};
