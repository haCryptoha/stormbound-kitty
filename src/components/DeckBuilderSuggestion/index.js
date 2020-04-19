import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../constants/decks'
import { CollectionContext } from '../CollectionProvider'
import Deck from '../Deck'
import QuestionMark from '../QuestionMark'
import Only from '../Only'
import RarityBar from '../RarityBar'
import ResourceIcon from '../ResourceIcon'
import Tooltip from '../Tooltip'
import { deserialiseDeck } from '../../helpers/deserialise'
import { serialiseDeck } from '../../helpers/serialise'
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

const DeckBuilderSuggestion = props => {
  const { hasDefaultCollection, collection } = React.useContext(
    CollectionContext
  )

  // Recompute the level of the cards in the deck to match the ones from the
  // collection
  const deserialisedDeck = deserialiseDeck(props.id)
  const resolvedCollection = !hasDefaultCollection
    ? resolveCollection(collection)
    : null
  const deck = hasDefaultCollection
    ? deserialisedDeck
    : deserialisedDeck.map(card => ({
        ...card,
        level: resolvedCollection[card.id].level,
        missing: resolvedCollection[card.id].missing,
      }))
  const id = serialiseDeck(deck)
  const distance = getDeckDistanceToMax(resolvedCollection)({ id })

  return (
    <div className='DeckBuilderSuggestion'>
      <Deck
        deck={deck}
        orientation='horizontal'
        onClick={props.onClick}
        onClickLabel='Display card'
      />
      <div className='DeckBuilderSuggestion__rarity-bar'>
        <RarityBar deck={deck.map(({ id }) => getRawCardData(id))} />
      </div>
      <span className='DeckBuilderSuggestion__name'>
        <Link to={`/deck/${id}`}>{props.name}</Link>
        <Only.CustomCollection>
          <Only.Desktop>
            <Tooltip
              style={tooltipStyles}
              label={
                distance === Infinity ? (
                  'You are missing some cards from this deck'
                ) : (
                  <>
                    Distance to maxed out deck:{' '}
                    <ResourceIcon resource='STONE' /> {distance} fusion stones
                  </>
                )
              }
            >
              {trigger => <QuestionMark {...trigger} />}
            </Tooltip>
          </Only.Desktop>
        </Only.CustomCollection>
      </span>
      <span className='DeckBuilderSuggestion__author'>
        <Link to={`/deck/suggestions?category=${props.category}`}>
          {CATEGORIES[props.category]}
        </Link>{' '}
        deck by{' '}
        <Link to={`/deck/suggestions?author=${props.author}`}>
          {props.author}
        </Link>
      </span>
    </div>
  )
}

export default DeckBuilderSuggestion
