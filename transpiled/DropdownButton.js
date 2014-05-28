"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var DropdownStateMixin = require("./DropdownStateMixin")["default"];
var Button = require("./Button")["default"];
var ButtonGroup = require("./ButtonGroup")["default"];
var DropdownMenu = require("./DropdownMenu")["default"];


var DropdownButton = React.createClass({displayName: 'DropdownButton',
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:    React.PropTypes.bool,
    title:    React.PropTypes.renderable,
    href:     React.PropTypes.string,
    onClick:  React.PropTypes.func,
    onSelect: React.PropTypes.func,
    navItem:  React.PropTypes.bool
  },

  render: function () {
    var className = this.props.className ?
      this.props.className + ' dropdown-toggle' : 'dropdown-toggle';

    var renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    return this[renderMethod]([
      Button(
        {ref:"dropdownButton",
        href:this.props.href,
        bsStyle:this.props.bsStyle,
        className:className,
        onClick:this.handleDropdownClick,
        id:this.props.id,
        key:0,
        navDropdown:this.props.navItem}, 
        this.props.title,' ',
        React.DOM.span( {className:"caret"} )
      ),
      DropdownMenu(
        {ref:"menu",
        'aria-labelledby':this.props.id,
        onSelect:this.handleOptionSelect,
        pullRight:this.props.pullRight,
        key:1}, 
        this.props.children
      )
    ]);
  },

  renderButtonGroup: function (children) {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      ButtonGroup(
        {bsSize:this.props.bsSize,
        className:classSet(groupClasses)}, 
        children
      )
    );
  },

  renderNavItem: function (children) {
    var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      React.DOM.li( {className:classSet(classes)}, 
        children
      )
    );
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

exports["default"] = DropdownButton;