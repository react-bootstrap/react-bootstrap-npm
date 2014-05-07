"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];

var Badge = React.createClass({displayName: 'Badge',

  render: function () {
    return this.transferPropsTo(
      React.DOM.span( {className:this.props.children ? 'badge': null}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Badge;