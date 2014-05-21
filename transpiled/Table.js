"use strict";
/** @jsx React.DOM */

var React = require("./react-es6")["default"];
var classSet = require("./react-es6/lib/cx")["default"];
var PropTypes = require("./PropTypes")["default"];

var Table = React.createClass({displayName: 'Table',
  propTypes: {
    striped: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    condensed: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  },

  render: function () {
    var classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    var table = this.transferPropsTo(
      React.DOM.table( {className:classSet(classes)}, 
        this.props.children
      )
    );

    return this.props.responsive ? (
      React.DOM.div( {className:"table-responsive"}, 
        table
      )
    ) : table;
  }
});

exports["default"] = Table;