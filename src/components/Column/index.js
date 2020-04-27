import React from 'react'
import './index.css'

export default React.memo(function Column(props) {
  return (
    <div
      className={[
        'Column',
        props.desktopOnly && 'Column--desktop',
        props.wideGutter && 'Column--wide',
        !!props.width && `Column--${props.width}`,
      ]
        .filter(Boolean)
        .join(' ')}
      style={props.style}
    >
      {props.children}
    </div>
  )
})
