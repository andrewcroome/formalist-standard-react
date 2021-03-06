'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _checkbox = require('./checkbox.mcss');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Checkbox
 *
 * States:
 * - focus
 * - error
 *
 * Sizes:
 * - small
 * - normal*
 * - large
 *
 */
var Checkbox = _react2.default.createClass({
  displayName: 'Checkbox',

  propTypes: {
    id: _react2.default.PropTypes.string,
    className: _react2.default.PropTypes.string,
    defaultChecked: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    error: _react2.default.PropTypes.bool,
    label: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    size: _react2.default.PropTypes.oneOf(['xsmall', 'small', 'normal', 'large', 'xlarge']),
    value: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      error: false,
      size: 'normal'
    };
  },
  getInitialState: function getInitialState() {
    return {
      id: (0, _uid2.default)(10),
      focus: false
    };
  },
  onBlur: function onBlur(e) {
    this.setState({ focus: false });
  },
  onFocus: function onFocus(e) {
    this.setState({ focus: true });
  },
  onChange: function onChange(e) {
    this.props.onChange(e, e.target.checked);
  },
  render: function render() {
    var _classNames;

    var _props = this.props;
    var defaultChecked = _props.defaultChecked;
    var label = _props.label;
    var name = _props.name;
    var value = _props.value;

    var labelClassNames = (0, _classnames2.default)(_checkbox2.default.label, (_classNames = {}, _defineProperty(_classNames, '' + _checkbox2.default.error, this.props.error), _defineProperty(_classNames, '' + _checkbox2.default.focus, this.state.focus), _classNames));

    return _react2.default.createElement(
      'div',
      { className: _checkbox2.default.button },
      _react2.default.createElement('input', {
        className: _checkbox2.default.input,
        id: this.state.id,
        type: 'checkbox',
        name: name,
        value: value,
        defaultChecked: defaultChecked,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onChange: this.onChange
      }),
      _react2.default.createElement(
        'label',
        {
          className: labelClassNames,
          htmlFor: this.state.id
        },
        label
      )
    );
  }
});

exports.default = Checkbox;