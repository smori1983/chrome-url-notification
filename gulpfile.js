require("dotenv").config();

var browserify = require("browserify");
var gulp = require("gulp");
var concat = require("gulp-concat");
var del = require("del");
var eslint = require("gulp-eslint");
var fs = require("fs");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pump = require("pump");
var qunit = require("node-qunit-phantomjs");
var runSequence = require("run-sequence");
var source = require("vinyl-source-stream");
var sprintf = require("sprintf-js").sprintf;

var forProduction = (function() {
    var mode = process.env.EXTENSION_MODE || "development";

    return mode === "production";
})();

var dist = (function() {
    var baseDir = process.env.EXTENSION_DIST || "dist";

    if (forProduction) {
        var manifest = JSON.parse(fs.readFileSync("src/manifest.json"));

        return sprintf("%s/chrome-url-notification-v%s", baseDir, manifest.version);
    } else {
        return sprintf("%s/chrome-url-notification-dev", baseDir);
    }
})();

gulp.task("vendor:js", function(cb) {
    pump([
        browserify({
            require: [
                "extend",
                "jsonschema",
                "lodash",
            ]
        }).bundle(),
        source("vendor.js"),
        gulp.dest("src/js")
    ], cb);
});

gulp.task("clean", function(cb) {
    return del([
        sprintf("%s/**", dist),
        sprintf("!%s", dist)
    ], { force: true });
});

gulp.task("concat", function(cb) {
    pump([
        gulp.src([
            "./src/js/urlNotification/*.js",
        ]),
        concat("urlNotification.js"),
        gulp.dest("./src/js")
    ], cb);
});

gulp.task("make", gulp.series("concat"));

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

gulp.task("build", gulp.series("clean", "make", "dist"));

gulp.task("lint", function(cb) {
    pump([
        gulp.src([
            "src/js/**/*.js",
            "!src/js/urlNotification.js",
            "!src/js/jquery-1.9.1.min.js",
            "!src/js/vendor.js",
            "tests/**/*.js",
            "!tests/qunit/*.js"
        ]),
        eslint({ useEslintrc: true }),
        eslint.format(),
        eslint.failAfterError()
    ]);
    cb();
});

gulp.task("test", gulp.series("lint", function(cb) {
    qunit("./tests/test.html");
    cb();
}));
