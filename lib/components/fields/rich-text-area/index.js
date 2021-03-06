'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _errors = require('../common/errors');

var _errors2 = _interopRequireDefault(_errors);

var _header = require('../common/header');

var _header2 = _interopRequireDefault(_header);

var _richTextArea = require('./rich-text-area.mcss');

var _richTextArea2 = _interopRequireDefault(_richTextArea);

var _richTextEditor = require('../../ui/rich-text-editor');

var _richTextEditor2 = _interopRequireDefault(_richTextEditor);

var _draftJsAstExporter = require('draft-js-ast-exporter');

var _draftJsAstExporter2 = _interopRequireDefault(_draftJsAstExporter);

var _draftJsAstImporter = require('draft-js-ast-importer');

var _draftJsAstImporter2 = _interopRequireDefault(_draftJsAstImporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Import components


// Import styles


// HTML


/**
 * Text Area field
 */
var RichTextArea = _react2.default.createClass({
  displayName: 'RichTextArea',

  propTypes: {
    actions: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    attributes: _react2.default.PropTypes.shape({
      label: _react2.default.PropTypes.string,
      hint: _react2.default.PropTypes.string,
      placeholder: _react2.default.PropTypes.string,
      inline: _react2.default.PropTypes.bool,
      box_size: _react2.default.PropTypes.oneOf(['single', 'small', 'normal', 'large', 'xlarge']),
      inline_formatters: _react2.default.PropTypes.array,
      block_formatters: _react2.default.PropTypes.array,
      embeddable_forms: _react2.default.PropTypes.object
    }),
    hint: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    errors: _reactImmutableProptypes2.default.list,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array, _reactImmutableProptypes2.default.list])
  },

  getInitialState: function getInitialState() {
    var value = this.props.value;
    // Convert from an Immutable structure?

    value = value && value.toJS ? value.toJS() : value;
    // Convert from a string?
    value = typeof value === 'string' ? JSON.parse(value) : value;
    return {
      editorState: value ? _draftJs.EditorState.createWithContent((0, _draftJsAstImporter2.default)(value)) : _draftJs.EditorState.createEmpty()
    };
  },


  /**
   * onChange handler
   *
   * @param  {EditorState} editorState State from the editor
   */
  onChange: function onChange(editorState) {
    var value = this.props.value;

    var exporterOptions = {
      entityModifiers: {
        'formalist': function formalist(data) {
          var copy = Object.assign({}, data);
          delete copy['label'];
          delete copy['form'];
          return copy;
        }
      }
    };
    var currentContent = editorState.getCurrentContent();
    var hasText = currentContent.hasText();
    var newValue = hasText ? (0, _draftJsAstExporter2.default)(editorState, exporterOptions) : null;
    var hasChangedToNull = newValue === null && value !== null;

    // Persist the value to the AST, but only if it is:
    // * Not null
    // * Has changed to null
    if (newValue != null || hasChangedToNull) {
      this.props.actions.edit(function (val) {
        return newValue;
      });
    }
    // Keep track of the state here
    this.setState({
      editorState: editorState
    });
  },
  render: function render() {
    var _props = this.props;
    var attributes = _props.attributes;
    var config = _props.config;
    var errors = _props.errors;
    var hint = _props.hint;
    var label = _props.label;
    var name = _props.name;
    var editorState = this.state.editorState;

    var hasErrors = errors.count() > 0;

    // Set up field classes
    var fieldClassNames = (0, _classnames2.default)(_richTextArea2.default.base, _defineProperty({}, '' + _richTextArea2.default.baseInline, attributes.inline));

    return _react2.default.createElement(
      'div',
      { className: fieldClassNames },
      _react2.default.createElement(
        'div',
        { className: _richTextArea2.default.header },
        _react2.default.createElement(_header2.default, { id: name, label: label, hint: hint, error: hasErrors })
      ),
      _react2.default.createElement(
        'div',
        { className: _richTextArea2.default.display },
        _react2.default.createElement(_richTextEditor2.default, {
          editorState: editorState,
          config: config,
          onChange: this.onChange,
          inlineFormatters: attributes.inline_formatters,
          blockFormatters: attributes.block_formatters,
          embeddableForms: attributes.embeddable_forms,
          boxSize: attributes.box_size,
          textSize: attributes.text_size,
          placeholder: attributes.placeholder
        }),
        hasErrors ? _react2.default.createElement(_errors2.default, { errors: errors }) : null
      )
    );
  }
});

exports.default = RichTextArea;