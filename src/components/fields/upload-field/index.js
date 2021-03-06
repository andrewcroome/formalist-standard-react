import React from 'react'
import MultiUploadField from '../multi-upload-field'

/**
 * UploadField
 * Create a 'single-file' version of the multi-upload-field
 * Defaults 'multiple' to false
 */

const UploadField = React.createClass({
  render () {
    return <MultiUploadField {...this.props} multiple={false} />
  },
})

export default UploadField
