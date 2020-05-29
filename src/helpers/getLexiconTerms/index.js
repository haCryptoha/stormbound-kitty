import React from 'react'
import WikiLink from '../../components/WikiLink'
import cards from '../../data/cards'
import getAbbreviations from '../../helpers/getAbbreviations'

const INDEX = cards.reduce((acc, card) => {
  acc[card.name] = <WikiLink id={card.id} />
  return acc
}, {})

const ABBREVIATIONS = getAbbreviations('NATURAL')
const LINKIFIED_ABBREVIATIONS = Object.keys(ABBREVIATIONS).reduce(
  (acc, key) => {
    acc[key] = ABBREVIATIONS[key].map(
      definition => INDEX[definition] || definition
    )
    return acc
  },
  {}
)

export default () => LINKIFIED_ABBREVIATIONS
