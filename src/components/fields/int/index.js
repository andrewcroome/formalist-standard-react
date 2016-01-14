import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import numberIsInteger from 'number-is-integer'

// Import the display types
import FieldErrors from '../common/errors'
import FieldHeader from '../common/header'
import Default from './display-default'
import Radio from './display-radio'
import Select from './display-select'

/**
 * Set up an object that holds all the `display_variants` by matching key
 * @type {Object}
 */
export const displayVariants = {
  'default': Default,
  'radio': Radio,
  'select': Select
}

/**
 * Base class for the int field
 *
 * Sets up any common methods and UI across _all_ int fields and then
 * determines the `display_variant` class to include.
 *
 */
const IntBase = React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    config: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.number,
    hint: React.PropTypes.string,
    label: React.PropTypes.string,
    errors: ImmutablePropTypes.list
  },

  /**
   * Common onChange handler for int fields
   *
   * @param  {Event} e Change event from a form input/select
   */
  onChange (e) {
    let value = parseInt(e.target.value, 10)
    if (numberIsInteger(value)) {
      this.props.actions.edit(
        (val) => { return value }
      )
    }
  },

  render () {
    let { config, errors, hint, label } = this.props
    // Determine the React class to render based on the display_variant configuration
    let IntDisplay = displayVariants[config.display_variant || 'default']

    return (
      <div className='fm-field__base'>
        <FieldHeader label={label} hint={hint}/>
        <div className='fm-field__display'>
          <IntDisplay onChange={this.onChange} {...this.props}/>
        </div>
        {(errors) ? <FieldErrors errors={errors}/> : null}
      </div>
    )
  }
})

export default IntBase
