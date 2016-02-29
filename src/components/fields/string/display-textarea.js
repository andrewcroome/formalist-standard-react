import React from 'react'

// Components
import TextBox from '../../ui/text-box'

const StringDisplayDefault = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    config: React.PropTypes.object,
    error: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render () {
    let { config, error, name, className } = this.props

    return (
      <TextBox
        id={name}
        className={className}
        error={error}
        defaultValue={this.props.value}
        placeholder={config.placeholder}
        boxSize={config.box_size}
        onChange={this.props.onChange} />
    )
  }
})

export default StringDisplayDefault
