require('dotenv').config();

const browserify = require('browserify');
const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
//const rename = require('gulp-rename');
//const uglify = require('gulp-uglify');
const pump = require('pump');
const qunit = require('node-qunit-phantomjs');
const source = require('vinyl-source-stream');
const sprintf = require('sprintf-js').sprintf;

const forProduction = (function() {
  const mode = process.env.EXTENSION_MODE || 'development';

  return mode === 'production';
})();

const dist = (function() {
  const baseDir = process.env.EXTENSION_DIST || 'dist';

  if (forProduction) {
    const manifest = JSON.parse(fs.readFileSync('src/manifest.json'));

    return sprintf('%s/chrome-url-notification-v%s', baseDir, manifest.version);
  } else {
    return sprintf('%s/chrome-url-notification-dev', baseDir);
  }
})();

gulp.task('make:vendor:js', function(cb) {
  pump([
    browserify({
      require: [
        'deepmerge',
        'extend',
        'jsonschema',
        'lodash',
      ],
    }).bundle(),
    source('vendor.js'),
    gulp.dest('src/js'),
  ], cb);
});

gulp.task('make:urlNotification', function(cb) {
  pump([
    browserify()
      .require('./src/js/urlNotification/main.js', { expose: 'url-notification' })
      .bundle(),
    source('urlNotification.js'),
    gulp.dest('src/js'),
  ], cb);
});

gulp.task('clean', function() {
  return del([
    sprintf('%s/**', dist),
    sprintf('!%s', dist),
  ], { force: true });
});

gulp.task('dist', function(cb) {
  pump([
    gulp.src([
      'src/_locales/**',
      'src/css/**',
      'src/html/**',
      'src/js/**',
      '!src/js/urlNotification/**',
      'src/lib/**/**',
      'src/manifest.json',
    ], { base: 'src' }),
    gulp.dest(dist),
  ], cb);

  pump([
    gulp.src([
      sprintf('./src/%s/**', forProduction ? 'image' : 'image_dev'),
    ]),
    gulp.dest(sprintf('%s/image', dist)),
  ], cb);
});

gulp.task('build', gulp.series('clean', 'make:urlNotification', 'dist'));

gulp.task('lint', function(cb) {
  pump([
    gulp.src([
      'gulpfile.js',
      'src/js/**/*.js',
      '!src/js/urlNotification.js',
      '!src/js/vendor.js',
      'tests/**/*.js',
    ]),
    eslint({ useEslintrc: true }),
    eslint.format(),
    eslint.failAfterError(),
  ]);
  cb();
});

gulp.task('test', gulp.series('lint', 'make:urlNotification', function(cb) {
  qunit('./tests/test.html');
  cb();
}));
