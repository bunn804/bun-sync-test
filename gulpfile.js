var gulp = require('gulp');
var upload = require('gulp-upload');
 
var options = {
  server: 'http://192.168.1.125:8484/testUpload',
  data: {
    dirname: 'testUpload'
  },
  callback: function (err, data, res) {
    if (err) {
      console.log('error:' + err.toString());
    } else {
      console.log(data.toString());
    }
  }
}
 
gulp.task('upload', function() {
  return gulp.src('server.js')
  .pipe(upload(options));
});