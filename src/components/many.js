import React from 'react'

const Many = ({name, children}) => {
  return (
    <div className='many'>
      <h3 className='many__name'>{name.replace(/_/, ' ')}</h3>
      <div className='many__controls'><button>Add new {name.replace(/_/, ' ')}</button></div>
      {children}
    </div>
  )
}

export default Many
export let ManyFactory = React.createFactory(Many)