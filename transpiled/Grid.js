"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var PropTypes = require("./PropTypes")["default"];


var Grid = React.createClass({displayName: 'Grid',
  propTypes: {
    fluid: React.PropTypes.bool,
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
      componentClass( {className:this.props.fluid ? 'container-fluid' : 'container'}, 
        this.props.children
      )
    );
  }
});

exports["default"] = Grid;