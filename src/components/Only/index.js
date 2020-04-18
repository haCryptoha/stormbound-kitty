import React from 'react'
import useViewportWidth from '../../helpers/useViewportWidth'
import { CollectionContext } from '../../components/CollectionProvider'

const Only = props => {
  const viewportWidth = useViewportWidth()
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  switch (props.when) {
    case 'MOBILE':
      return viewportWidth < 700 ? props.children : null
    case 'DESKTOP':
      return viewportWidth >= 700 ? props.children : null
    case 'DEFAULT_COLLECTION':
      return hasDefaultCollection ? props.children : null
    case 'CUSTOM_COLLECTION':
      return !hasDefaultCollection ? props.children : null
    default:
      return null
  }
}

export default {
  Mobile: props => <Only {...props} when='MOBILE' />,
  Desktop: props => <Only {...props} when='DESKTOP' />,
  DefaultCollection: props => <Only {...props} when='DEFAULT_COLLECTION' />,
  CustomCollection: props => <Only {...props} when='CUSTOM_COLLECTION' />,
}
