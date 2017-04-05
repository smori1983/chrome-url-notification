var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pump = require("pump");
var qunit = require("node-qunit-phantomjs");

gulp.task("build", ["concat"]);

gulp.task("concat", function(cb) {
    pump([
        gulp.src("./src/js/urlNotifier/*.js"),
        concat("urlNotifier.js"),
        gulp.dest("./src/js")
    ], cb);
});

gulp.task("test", function() {
    qunit("./tests/test.html");
});
