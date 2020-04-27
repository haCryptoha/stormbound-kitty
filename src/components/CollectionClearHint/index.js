import React from 'react'
import { CollectionContext } from '../CollectionProvider'
import Icon from '../Icon'
import Only from '../Only'

export default React.memo(function CollectionClearHint(props) {
  const { resetCollection } = React.useContext(CollectionContext)

  return (
    <Only.CustomCollection>
      <p className='CollectionClearHint'>
        <Icon icon='books' /> A locally saved collection was found and loaded.
        If you would like to remove it and start fresh, you can{' '}
        <button
          type='button'
          onClick={resetCollection}
          className='ButtonAsLink'
        >
          clear the local data
        </button>{' '}
        (you will be asked to confirm).
      </p>
    </Only.CustomCollection>
  )
})
