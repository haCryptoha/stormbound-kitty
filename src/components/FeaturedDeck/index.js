import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/decks'
import { CollectionContext } from '../CollectionProvider'
import Deck from '../Deck'
import DiamondButton from '../DiamondButton'
import QuestionMark from '../QuestionMark'
import Only from '../Only'
import RarityBar from '../RarityBar'
import { Stones } from '../Resource'
import Tooltip from '../Tooltip'
import serialisation from '../../helpers/serialisation'
import getDeckDistanceToMax from '../../helpers/getDeckDistanceToMax'
import getRawCardData from '../../helpers/getRawCardData'
import resolveCollection from '../../helpers/resolveCollection'
import './index.css'

const tooltipStyles = {
  backgroundColor: 'var(--dark-blue)',
  color: 'var(--white)',
  borderRadius: '2px',
  border: '1px solid var(--dark-beige)',
  boxShadow: '0 0 0 2px var(--dark-blue)',
  maxWidth: '15em',
  whiteSpace: 'normal',
}

const useAdjustedDeck = ({ category, id }) => {
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )

  if (hasDefaultCollection || category === 'EQUALS') {
    return { deck: serialisation.deck.deserialise(id), id, distance: null }
  }

  const deserialisedDeck = serialisation.deck.deserialise(id)
  const resolvedCollection = resolveCollection(collection)
  const deck = deserialisedDeck.map(card => ({
    ...card,
    level: resolvedCollection[card.id].level,
    missing: resolvedCollection[card.id].missing,
  }))
  const distance = getDeckDistanceToMax(resolvedCollection)({ id })

  return { deck, id: serialisation.deck.serialise(deck), distance }
}

export default React.memo(function FeaturedDeck(props) {
  const { id, deck, distance } = useAdjustedDeck(props)
  const actions = props.actions || []

  return (
    <div className='FeaturedDeck' data-testid={props['data-testid']}>
      <Deck
        showUpgrades={props.showUpgrades}
        deck={deck}
        orientation='horizontal'
        onClick={props.onClick}
        onClickLabel='Display card'
      />
      <div className='FeaturedDeck__rarity-bar'>
        <RarityBar deck={deck.map(card => getRawCardData(card.id))} />
      </div>
      <span className='FeaturedDeck__name'>
        <Link to={`/deck/${id}`}>{props.name}</Link>
        {distance ? (
          <Only.CustomCollection>
            <Only.Desktop>
              <Tooltip
                style={tooltipStyles}
                label={
                  distance === Infinity ? (
                    'You are missing some cards from this deck'
                  ) : (
                    <>
                      Distance to maxed out deck: <Stones amount={distance} />
                    </>
                  )
                }
              >
                {trigger => <QuestionMark {...trigger} />}
              </Tooltip>
            </Only.Desktop>
          </Only.CustomCollection>
        ) : null}
      </span>
      <span className='FeaturedDeck__author'>
        <Link
          to={{
            pathname: '/deck/suggestions',
            search: `?category=${props.category}`,
          }}
        >
          {CATEGORIES[props.category]}
        </Link>{' '}
        deck
        {props.author && (
          <>
            {' '}
            by{' '}
            <Link
              to={{
                pathname: '/deck/suggestions',
                search: `?author=${props.author}`,
              }}
            >
              {props.author}
            </Link>
          </>
        )}
      </span>
      {actions.length > 0 && (
        <div className='FeaturedDeck__actions'>
          {actions.map((action, index) =>
            action['$$typeof'] ? (
              <React.Fragment key={index}>{action}</React.Fragment>
            ) : (
              <DiamondButton key={index} {...action} />
            )
          )}
        </div>
      )}
    </div>
  )
})
