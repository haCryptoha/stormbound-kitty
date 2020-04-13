import React from 'react'
import Column from '../Column'
import Row from '../Row'
import Title from '../Title'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import './index.css'

const sum = (a, b) => a + b
const getAverageManaCost = cards =>
  (cards.map(c => c.mana).reduce(sum, 0) / cards.length).toFixed(2)
const getAverageSpeed = cards =>
  (cards.map(c => c.movement | 0).reduce(sum, 0) / cards.length).toFixed(2)
const getAverageLevel = cards =>
  (cards.map(c => c.level).reduce(sum, 0) / cards.length).toFixed(2)
const getPlayableCardsFirst = cards =>
  cards.filter(
    c => c.mana <= 3 && !['W1', 'I3', 'F4', 'N9', 'N15', 'N63'].includes(c.id)
  )
const getRaces = cards => [...new Set(cards.map(c => c.race))]

const DeckBuilderStats = props => {
  const cards = props.deck.map(resolveCardForLevel)
  const averageMana = getAverageManaCost(cards)
  const averageSpeed = getAverageSpeed(cards)
  const averageLevel = getAverageLevel(cards)
  const units = cards.filter(c => c.type === 'unit')
  const structures = cards.filter(c => c.type === 'structure')
  const spells = cards.filter(c => c.type === 'spell')
  const races = getRaces(cards)
  const playableCards1 = getPlayableCardsFirst(cards)
  const playableCards2 = cards.filter(c => c.mana <= 4)
  const movingCards1 = playableCards1.filter(c => c.movement > 0)
  const movingCards2 = playableCards2.filter(c => c.movement > 0)

  return (
    <div className='DeckBuilderStats'>
      <Title>Deck stats</Title>

      <Row>
        <Column>
          <p>
            This deck (level ~{averageLevel}) is made of {cards.length} cards:{' '}
            <span
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(units)}
              onMouseOut={() => props.highlight([])}
            >
              {units.length}
            </span>{' '}
            {units.length > 1 ? 'units' : 'unit'},{' '}
            <span
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(structures)}
              onMouseOut={() => props.highlight([])}
            >
              {structures.length}
            </span>{' '}
            {structures.length > 1 ? 'structures' : 'structure'}, and{' '}
            <span
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(spells)}
              onMouseOut={() => props.highlight([])}
            >
              {spells.length}
            </span>{' '}
            {spells.length > 1 ? 'spells' : 'spell'}. It contains {races.length}{' '}
            {races.length > 1 ? 'different races' : 'single race'}.
          </p>

          <p>
            Its average speed is <strong>{averageSpeed}</strong> cell on play.
            Its average mana cost is <strong>{averageMana}</strong>.{' '}
            <strong
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(playableCards1)}
              onMouseOut={() => props.highlight([])}
            >
              {playableCards1.length}
            </strong>{' '}
            cards can be played as the first player (
            <strong
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(movingCards1)}
              onMouseOut={() => props.highlight([])}
            >
              {movingCards1.length}
            </strong>{' '}
            of them moving the front line),{' '}
            <strong
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(playableCards2)}
              onMouseOut={() => props.highlight([])}
            >
              {playableCards2.length}
            </strong>{' '}
            as the second player (
            <strong
              className='DeckBuilderStats__trigger'
              onMouseOver={() => props.highlight(movingCards2)}
              onMouseOut={() => props.highlight([])}
            >
              {movingCards2.length}
            </strong>{' '}
            of them moving the front line).
          </p>
        </Column>
      </Row>
    </div>
  )
}

export default DeckBuilderStats
