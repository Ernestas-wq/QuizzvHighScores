const { src, dest } = require("gulp");
const minify = require("gulp-minify");

function minifyjs() {
  return src("js/*.js", { allowEmpty: true })
    .pipe(minify({ noSource: true }))
    .pipe(dest("public/min-js"));
}
exports.default = minifyjs;
