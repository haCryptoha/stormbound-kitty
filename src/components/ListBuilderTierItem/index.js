import React from 'react'
import { Link } from 'react-router-dom'
import { serialiseCardFromCollection } from '../../helpers/serialise'
import './index.css'

const ListBuilderTierItem = props => {
  if (!props.isEditable) {
    return (
      <Link
        to={'/card/' + serialiseCardFromCollection(props.card.id) + '/display'}
        className='ListBuilderTierItem'
        style={{ '--color': `var(--${props.card.faction})` }}
        title={props.card.name}
      >
        <img
          src={props.card.image}
          alt={props.card.name}
          className='ListBuilderTierItem__image'
        />
      </Link>
    )
  }

  // The placeholder should be displayed if we are currently dragging the
  // current element and we already have moved away from it
  const shouldDisplayPlaceholder =
    props.isDragging &&
    props.dndTarget === props.index &&
    props.dndTarget !== props.dndSource
  // The placeholder should be displayed before if the direction is left and
  // we’re not hovering the source
  const shouldDisplayPlaceholderBefore =
    shouldDisplayPlaceholder &&
    props.dndDirection === -1 &&
    props.dndTarget + props.dndDirection !== props.dndSource
  // The placeholder should be displayed after if the direction is right and
  // we’re not hovering the source
  const shouldDisplayPlaceholderAfter =
    shouldDisplayPlaceholder &&
    props.dndDirection === +1 &&
    props.dndTarget + props.dndDirection !== props.dndSource

  return (
    <>
      {shouldDisplayPlaceholderBefore && (
        <span className='ListBuilderTierItem ListBuilderTierItem--placeholder'>
          <img
            src={props.cards[props.dndSource].image}
            alt={props.card.name}
            className='ListBuilderTierItem__image'
          />
        </span>
      )}

      <button
        onMouseDown={() => props.onMouseDown(props.index)}
        onMouseOver={() => props.onMouseOver(props.index)}
        onMouseUp={() => props.onMouseUp(props.index)}
        type='button'
        onClick={() => props.removeCard(props.card.id)}
        className={[
          'ListBuilderTierItem',
          props.isDragging &&
            props.dndSource === props.index &&
            props.dndTarget !== null &&
            props.dndTarget !== props.index &&
            'ListBuilderTierItem--dragging',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ '--color': `var(--${props.card.faction})` }}
        title={'Remove ' + props.card.name + ' from list'}
      >
        <img
          src={props.card.image}
          alt={props.card.name}
          className='ListBuilderTierItem__image'
        />
      </button>

      {shouldDisplayPlaceholderAfter && (
        <span className='ListBuilderTierItem ListBuilderTierItem--placeholder'>
          <img
            src={props.cards[props.dndSource].image}
            alt={props.card.name}
            className='ListBuilderTierItem__image'
          />
        </span>
      )}
    </>
  )
}

export default ListBuilderTierItem
