"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var cloneWithProps = require("./react-es6/lib/cloneWithProps")["default"];
var OverlayMixin = require("./OverlayMixin")["default"];
var utils = require("./utils")["default"];

var ModalTrigger = React.createClass({displayName: 'ModalTrigger',
  mixins: [OverlayMixin],

  propTypes: {
    modal: React.PropTypes.renderable.isRequired
  },

  getInitialState: function () {
    return {
      isOverlayShown: false
    };
  },

  show: function () {
    this.setState({
      isOverlayShown: true
    });
  },

  hide: function () {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function () {
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },

  renderOverlay: function () {
    if (!this.state.isOverlayShown) {
      return React.DOM.span(null );
    }

    return cloneWithProps(
      this.props.modal,
      {
        onRequestHide: this.hide
      }
    );
  },

  render: function () {
    var child = React.Children.only(this.props.children);
    return cloneWithProps(
      child,
      {
        onClick: utils.createChainedFunction(child.props.onClick, this.toggle)
      }
    );
  }
});

exports["default"] = ModalTrigger;