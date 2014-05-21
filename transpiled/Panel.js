"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var ReactTransitionEvents = require("./react-es6/lib/ReactTransitionEvents")["default"];
var BootstrapMixin = require("./BootstrapMixin")["default"];
var CollapsableMixin = require("./CollapsableMixin")["default"];
var utils = require("./utils")["default"];

var Panel = React.createClass({displayName: 'Panel',
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    header: React.PropTypes.renderable,
    footer: React.PropTypes.renderable,
    isCollapsable: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect: function (e) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(this.props.key);
      this._isChanging = false;
    }

    e.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  shouldComponentUpdate: function () {
    return !this._isChanging;
  },

  getCollapsableDimensionValue: function () {
    return this.refs.body.getDOMNode().offsetHeight;
  },

  getCollapsableDOMNode: function () {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel.getDOMNode();
  },

  render: function () {
    var classes = this.getBsClassSet();
    classes['panel'] = true;

    return (
      React.DOM.div( {className:classSet(classes), id:this.props.isCollapsable ? null : this.props.id}, 
        this.renderHeading(),
        this.props.isCollapsable ? this.renderCollapsableBody() : this.renderBody(),
        this.renderFooter()
      )
    );
  },

  renderCollapsableBody: function () {
    return (
      React.DOM.div( {className:classSet(this.getCollapsableClassSet('panel-collapse')), id:this.props.id, ref:"panel"}, 
        this.renderBody()
      )
    );
  },

  renderBody: function () {
    return (
      React.DOM.div( {className:"panel-body", ref:"body"}, 
        this.props.children
      )
    );
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidComponent(header) || Array.isArray(header)) {
      header = this.props.isCollapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.isCollapsable) {
      header = utils.cloneWithProps(header, {
        className: 'panel-title',
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = utils.cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      React.DOM.div( {className:"panel-heading"}, 
        header
      )
    );
  },

  renderAnchor: function (header) {
    return (
      React.DOM.a(
        {href:'#' + (this.props.id || ''),
        className:this.isOpen() ? null : 'collapsed',
        onClick:this.handleSelect}, 
        header
      )
    );
  },

  renderCollapsableTitle: function (header) {
    return (
      React.DOM.h4( {className:"panel-title"}, 
        this.renderAnchor(header)
      )
    );
  },

  renderFooter: function () {
    if (!this.props.footer) {
      return null;
    }

    return (
      React.DOM.div( {className:"panel-footer"}, 
        this.props.footer
      )
    );
  }
});

exports["default"] = Panel;