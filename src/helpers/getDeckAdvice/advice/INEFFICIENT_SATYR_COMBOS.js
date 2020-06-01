import toSentence from '../../toSentence/'
import getRawCardData from '../../getRawCardData/'

const getSatyrs = cards => cards.filter(card => card.race === 'satyr')

export default cards => {
  const satyrConsumers = ['S5', 'S7', 'S9']
  const satyrs = getSatyrs(cards)
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)
  const hasSatyrSynergist = hasAny(satyrConsumers)

  if (!hasSatyrSynergist || satyrs.length > 5) return null

  const listOfNames = toSentence(
    satyrConsumers
      .filter(hasCard)
      .map(getRawCardData)
      .map(card => card.name),
    'and'
  )

  return {
    id: 'INEFFICIENT_SATYR_COMBOS',
    name: 'Inefficient Satyr Combos',
    description: `This deck includes ${listOfNames}, but doesn’t include enough satyrs to provide good synergy. Consider including more satyrs.`,
    highlight: ['S5', 'S7', 'S9', ...satyrs],
  }
}
