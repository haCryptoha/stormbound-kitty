import cards from '../../../data/cards'
import arrayRandom from '../../../helpers/arrayRandom'
import getEmbed from '../../../helpers/getEmbed'

const [STARTS, ENDS] = (() => {
  const starts = []
  const ends = []

  cards.forEach(card => {
    const [start, ...rest] = card.name.split(/\s+/g)
    if (card.token) return
    if (rest.length === 0) {
      ends.push(start)
    } else {
      starts.push(start.replace(/,/g, ''))
      ends.push(rest.join(' '))
    }
  })

  return [starts, ends]
})()

export default {
  command: 'mashup',
  help: function () {
    return getEmbed()
      .setTitle('🤪  Mashup: help')
      .setURL('https://stormbound-kitty.com')
      .setDescription(
        'Randomly generate a random card name from existing ones.'
      )
  },
  handler: async function (message, client, messageObject) {
    return getEmbed()
      .setTitle('🤪  Mashup')
      .setURL('https://stormbound-kitty.com')
      .setDescription(arrayRandom(STARTS) + ' ' + arrayRandom(ENDS))
  },
}
