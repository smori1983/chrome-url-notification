require("dotenv").config();

var browserify = require("browserify");
var gulp = require("gulp");
var concat = require("gulp-concat");
var del = require("del");
var eslint = require("gulp-eslint");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pump = require("pump");
var qunit = require("node-qunit-phantomjs");
var source = require("vinyl-source-stream");
var sprintf = require("sprintf-js").sprintf;

var dist = process.env.EXTENSION_DIST || "dist";

gulp.task("vendor:js", function(cb) {
    pump([
        browserify({
            require: [
                "jsonschema"
            ]
        }).bundle(),
        source("vendor.js"),
        gulp.dest("src/js")
    ], cb);
});

gulp.task("clean", function(db) {
    del.sync([
        sprintf("%s/**", dist),
        sprintf("!%s", dist)
    ], { force: true });
});

gulp.task("make", ["concat"]);

gulp.task("concat", function(cb) {
    pump([
        gulp.src("./src/js/urlNotifier/*.js"),
        concat("urlNotifier.js"),
        gulp.dest("./src/js")
    ], cb);
});

gulp.task("dist", function(cb) {
    pump([
        gulp.src([
            "src/css/**",
            "src/html/**",
            "src/js/**",
            "src/plugin/**/**",
            "src/manifest.json"
        ], { base: "src" }),
        gulp.dest(dist)
    ], cb);
});

gulp.task("test", ["lint"], function() {
    qunit("./tests/test.html");
});

gulp.task("lint", function() {
    pump([
        gulp.src([
            "src/js/**/*.js",
            "!src/js/urlNotifier.js",
            "!src/js/jquery-1.9.1.min.js",
            "!src/js/vendor.js"
        ]),
        eslint({ useEslintrc: true }),
        eslint.format(),
        eslint.failAfterError()
    ]);
});
