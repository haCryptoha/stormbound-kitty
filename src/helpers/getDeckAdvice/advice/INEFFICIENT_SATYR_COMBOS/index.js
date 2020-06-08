import toSentence from '../../../toSentence'
import getRawCardData from '../../../getRawCardData'

const getSatyrs = cards =>
  cards.filter(card => card.race === 'satyr' || card.id === 'S24')
export const SATYR_CONSUMERS = ['S5', 'S7', 'S9']

export default cards => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)
  const satyrs = getSatyrs(cards)
  const hasSatyrConsumer = hasAny(SATYR_CONSUMERS)

  // If the deck has cards requiring satyrs, but not enough satyrs to properly
  // use combos (including Head Start, which spawns a satyr), it is considered
  // inefficient.
  if (!hasSatyrConsumer || satyrs.length > 4) return null

  const consumerNames = toSentence(
    SATYR_CONSUMERS.filter(hasCard)
      .map(getRawCardData)
      .map(card => card.name),
    'and'
  )
  const includeHeadStart = !hasCard('S24') ? ' or Head Start' : ''

  return {
    id: 'INEFFICIENT_SATYR_COMBOS',
    name: 'Inefficient Satyr Combos',
    description: `This deck includes ${consumerNames}, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs${includeHeadStart}.`,
    highlight: ['S5', 'S7', 'S9', 'S24', ...satyrs],
  }
}
