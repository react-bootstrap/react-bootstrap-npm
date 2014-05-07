"use strict";
var React = require("./react-es6")["default"];

exports["default"] = {
  componentClass: function (props, propName, componentName) {
    return React.isValidClass(props[propName]);
  }
};