"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var PropTypes = require("./PropTypes")["default"];


var Row = React.createClass({displayName: 'Row',
  propTypes: {
    componentClass: PropTypes.componentClass
  },

  getDefaultProps: function () {
    return {
      componentClass: React.DOM.div
    };
  },

  render: function () {
    var componentClass = this.props.componentClass;

    return this.transferPropsTo(
      componentClass( {className:"row"}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Row;