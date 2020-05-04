import React from 'react'
import Radio from '../Radio'
import WikiLink from '../WikiLink'
import { FRIENDLY_CHANCES } from '../../constants/dryRunner'
import './index.css'

const RNG_SENSITIVE_CARDS = {
  S3: {
    FRIENDLY: () => (
      <>
        <WikiLink id='S3' /> comes back in hand
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='S3' /> doesn’t come back to hand
      </>
    ),
  },
  W9: {
    FRIENDLY: () => (
      <>
        <WikiLink id='W9' /> stays
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='W9' /> gets destroyed
      </>
    ),
  },
  W16: {
    FRIENDLY: () => (
      <>
        <WikiLink id='W16' /> hits and stays on the board
      </>
    ),
    UNFRIENDLY: () => (
      <>
        <WikiLink id='W16' /> dies
      </>
    ),
  },
}

export default React.memo(function DryRunnerRNGField(props) {
  const deckIds = props.deck.map(card => card.id)
  const possibleRNGSensitiveCards = Object.keys(RNG_SENSITIVE_CARDS)
  const RNGSensitiveCards = possibleRNGSensitiveCards.filter(cardId =>
    deckIds.includes(cardId)
  )

  // Check if there is a freeze card in the deck to show RNG settings
  const freezeCards = ['W2', 'W6', 'W11']
  const freezeCard = deckIds.find(id => freezeCards.includes(id))
  // Check if Harvesters of Souls are in the deck
  const harvestersInDeck = deckIds.includes('N38')

  if (RNGSensitiveCards.length === 0 && !(freezeCard || harvestersInDeck)) {
    return null
  }

  return (
    <fieldset>
      <legend>RNG (luck)</legend>
      <Radio
        id='RNG-FRIENDLY'
        name='RNG'
        value='FRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'FRIENDLY'}
        data-testid='RNG-input'
        required
      >
        Friendly
        <span className='DryRunnerRNGField__radio-info'>
          {harvestersInDeck ? (
            <span>
              <WikiLink id='N38' /> often create strong copies
            </span>
          ) : null}
          {freezeCard ? (
            <span>Freeze cards manage to freeze many enemies</span>
          ) : null}
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id='RNG-UNFRIENDLY'
        name='RNG'
        value='UNFRIENDLY'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'UNFRIENDLY'}
        data-testid='RNG-input'
        required
      >
        Unfriendly
        <span className='DryRunnerRNGField__radio-info'>
          {harvestersInDeck ? (
            <span>
              When <WikiLink id='N38' /> manage to create a copy, it’s generally{' '}
              weak
            </span>
          ) : null}
          {freezeCard ? (
            <span>Freeze cards do not manage to freeze many enemies</span>
          ) : null}
          {RNGSensitiveCards.map(cardId => (
            <span key={cardId}>{RNG_SENSITIVE_CARDS[cardId].UNFRIENDLY()}</span>
          ))}
        </span>
      </Radio>
      <Radio
        id='RNG-REGULAR'
        name='RNG'
        value='REGULAR'
        onChange={event => props.setRNG(event.target.value)}
        checked={props.RNG === 'REGULAR'}
        data-testid='RNG-input'
        required
      >
        Regular{' '}
        <span className='DryRunnerRNGField__radio-info'>
          <>
            {harvestersInDeck ? (
              <span>
                <WikiLink id='N38' /> sometimes create an average copy
              </span>
            ) : null}
            {freezeCard ? (
              <span>Freeze cards manage to freeze a few enemies</span>
            ) : null}
            {RNGSensitiveCards.map(cardId => (
              <span key={cardId}>
                {parseInt(FRIENDLY_CHANCES[cardId] * 100)}% chance per turn that{' '}
                {RNG_SENSITIVE_CARDS[cardId].FRIENDLY()}
              </span>
            ))}
          </>
        </span>
      </Radio>
    </fieldset>
  )
})
