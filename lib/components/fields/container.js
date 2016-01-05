'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _formalistCompose = require('formalist-compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addField = _formalistCompose.actions.addField;
var deleteField = _formalistCompose.actions.deleteField;
var editField = _formalistCompose.actions.editField;

/**
 * Container class for fields.Consolidates common attributes and actions into a
 * single place.
 *
 */

var FieldContainer = _react2.default.createClass({
  displayName: 'FieldContainer',

  propTypes: {
    path: _reactImmutableProptypes2.default.list.isRequired,
    store: _react2.default.PropTypes.object.isRequired,
    name: _react2.default.PropTypes.string.isRequired,
    config: _react2.default.PropTypes.object,
    field: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.any.isRequired
  },

  render: function render() {
    var _props = this.props;
    var field = _props.field;
    var path = _props.path;
    var store = _props.store;

    var Field = field;

    // Abstract the actions so that each field doesn't have to worry about
    // the action implementation
    var fieldActions = {
      add: function add(options) {
        return store.dispatch(addField(options));
      },
      delete: function _delete() {
        return store.dispatch(deleteField(path));
      },
      edit: function edit(val) {
        return store.dispatch(editField(path, val));
      }
    };

    return(
      // *Explicitly* pass all the props we care about down to the field
      // rather than dumping everything through
      _react2.default.createElement(Field, {
        actions: fieldActions,
        name: this.props.name,
        value: this.props.value,
        config: this.props.config })
    );
  }
});

exports.default = FieldContainer;