"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var utils = require("./utils")["default"];
var ValidComponentChildren = require("./ValidComponentChildren")["default"];

var Pager = React.createClass({displayName: 'Pager',

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render: function () {
    return this.transferPropsTo(
      React.DOM.ul(
        {className:"pager"}, 
        ValidComponentChildren.map(this.props.children, this.renderPageItem)
      )
    );
  },

  renderPageItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.props.ref,
        key: child.props.key
      }
    );
  }
});

exports["default"] = Pager;