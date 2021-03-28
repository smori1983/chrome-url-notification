require('dotenv').config();

const browserify = require('browserify');
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
const pump = require('pump');
const source = require('vinyl-source-stream');
const sprintf = require('sprintf-js').sprintf;

const forProduction = (function() {
  const mode = process.env.EXTENSION_MODE || 'development';

  return mode === 'production';
})();

const dist = (function() {
  const baseDir = process.env.EXTENSION_DIST || 'dist';

  if (forProduction) {
    const manifest = JSON.parse(fs.readFileSync('src/manifest.json').toString());

    return sprintf('%s/chrome-url-notification-v%s', baseDir, manifest.version);
  } else {
    return sprintf('%s/chrome-url-notification-dev', baseDir);
  }
})();

gulp.task('clean', function() {
  const patterns = [
    sprintf('%s/.*', dist),
    sprintf('%s/**', dist),
    sprintf('!%s', dist),
  ];

  return del(patterns, { force: true });
});

gulp.task('make:background', function (cb) {
  pump([
    browserify([
      './src/js/app/main.background.js',
    ]).bundle(),
    source('background.js'),
    gulp.dest(sprintf('%s/js', dist)),
  ], cb);
});

gulp.task('make:content', function (cb) {
  pump([
    browserify([
      './src/js/app/main.content.js',
    ]).bundle(),
    source('content.js'),
    gulp.dest(sprintf('%s/js', dist)),
  ], cb);
});

gulp.task('make:popup:html', function (cb) {
  pump([
    gulp.src([
      'src/html/popup.html',
    ]),
    gulp.dest(sprintf('%s/html', dist)),
  ], cb);
});

gulp.task('make:popup:js', function (cb) {
  pump([
    browserify([
      './src/js/app/main.popup.js',
    ]).bundle(),
    source('popup.js'),
    gulp.dest(sprintf('%s/js', dist)),
  ], cb);
});

gulp.task('make:popup:css', function (cb) {
  pump([
    gulp.src([
      'src/css/popup.css',
    ]),
    concatCss('popup.css'),
    gulp.dest(sprintf('%s/css', dist)),
  ], cb);
});

gulp.task('make:popup', gulp.series('make:popup:html', 'make:popup:js', 'make:popup:css'));

gulp.task('make:options:js', function (cb) {
  pump([
    browserify([
      './src/js/app/main.options.js',
    ]).bundle(),
    source('options.js'),
    gulp.dest(sprintf('%s/js', dist)),
  ], cb);
});

gulp.task('make:options:html', function (cb) {
  pump([
    gulp.src([
      'src/html/options.html',
    ]),
    gulp.dest(sprintf('%s/html', dist)),
  ], cb);
});

gulp.task('make:options:css', function (cb) {
  pump([
    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css',
      'src/css/bootstrap-custom.css',
    ]),
    concatCss('options.css'),
    gulp.dest(sprintf('%s/css', dist)),
  ], cb);
});

gulp.task('make:options:font', function (cb) {
  pump([
    gulp.src([
      'node_modules/bootstrap/dist/fonts/*',
    ]),
    gulp.dest(sprintf('%s/fonts', dist)),
  ], cb);
});

gulp.task('make:options', gulp.series('make:options:html', 'make:options:js', 'make:options:css', 'make:options:font'));

gulp.task('make', gulp.series('make:background', 'make:content', 'make:popup', 'make:options'));

gulp.task('dist:manifest', function(cb) {
  pump([
    gulp.src([
      'src/manifest.json',
    ], {base: 'src'}),
    gulp.dest(dist),
  ], cb);
});

gulp.task('dist:locale', function(cb) {
  pump([
    gulp.src([
      'src/_locales/**',
    ], {base: 'src'}),
    gulp.dest(dist),
  ], cb);

});

gulp.task('dist:icon', function(cb) {
  pump([
    gulp.src([
      sprintf('./src/%s/**', forProduction ? 'image' : 'image_dev'),
    ]),
    gulp.dest(sprintf('%s/image', dist)),
  ], cb);
});

gulp.task('dist', gulp.series('dist:manifest', 'dist:locale', 'dist:icon'));

gulp.task('build', gulp.series('clean', 'make', 'dist'));

gulp.task('lint', function(cb) {
  pump([
    gulp.src([
      'gulpfile.js',
      'src/js/app/*.js',
      'src/js/urlNotification/*.js',
      'test/**/*',
      'test_lib/**/*',
    ]),
    eslint({ useEslintrc: true }),
    eslint.format(),
    eslint.failAfterError(),
  ]);
  cb();
});
