var gulp = require('gulp');
var upload = require('gulp-upload');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
 
var options = {
  server: 'http://192.168.1.125:8484/web',
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

gulp.task( 'deploy', function () {
 
    var conn = ftp.create( {
        host:     '192.168.1.125',
        user:     $ftpUsername,
        password: $ftpPassword,
        parallel: 3,
        log:      gutil.log
    } );
 
    var globs = [
        'testUpload/**',
    ];
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/testUpload' ) ) // only upload newer files
        .pipe( conn.dest( '/testUpload' ) );
 
} );