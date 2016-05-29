var gulp = require("gulp");
var qunit = require("node-qunit-phantomjs");
var watch = require("watch");

gulp.task("test", function() {
    qunit("./tests/test.html");
});
