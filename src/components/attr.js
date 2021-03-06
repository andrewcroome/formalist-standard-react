import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import styles from './attr.mcss'

const Attr = ({children}) => {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}

Attr.propTypes = {
  children: ImmutablePropTypes.list,
}

export default Attr
export let AttrFactory = React.createFactory(Attr)
