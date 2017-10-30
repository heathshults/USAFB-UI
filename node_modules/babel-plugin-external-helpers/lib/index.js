"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(_ref) {
  var t = _ref.types;
  return {
    pre: function pre(file) {
      file.set("helpersNamespace", t.identifier("babelHelpers"));
    }
  };
}