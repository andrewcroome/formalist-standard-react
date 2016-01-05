import React from 'react'
import Container from './container'
// import array from './array'
// import assets from './assets'
// import boolean from './boolean'
// import content from './content'
// import dateTime from './dateTime'
// import float from './float'
// import integer from './integer'
import text from './text'

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField (field) {
  return (fieldProps) => {
    return (
      <Container field={field} {...fieldProps} />
    )
  }
}

/**
 * Wrapped fields for each type
 * @type {Object}
 */
const fields = {
  text: wrapField(text)
}

export default fields