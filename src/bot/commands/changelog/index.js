import dateFormat from 'dateformat'
import { TRIVIA_CHANNEL } from '../../../constants/bot'
import changelog from '../../../data/changelog.json'
import searchCards from '../../../helpers/searchCards'

const groupByDate = (acc, change) => {
  if (typeof acc[change.date] === 'undefined') {
    acc[change.date] = []
  }
  acc[change.date].push(change)
  return acc
}

export default {
  command: 'changelog',
  name: 'Card changes',
  description: 'Get information about changes applied to a card over time',
  example: 'qoh',
  icon: '🛠',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  handler: function (message) {
    const [card] = searchCards(message)

    // If no card was found with the given search, look no further.
    if (!card) return

    const cardChanges = changelog.filter(change => change.id === card.id)
    const changesByDate = cardChanges.reduce(groupByDate, {})
    const hasChanges = Object.keys(changesByDate).length > 0

    if (!hasChanges) {
      return `It seems there are no recorded changes for **${card.name}**.`
    }

    return (
      `Changes for **${card.name}**:` +
      Object.keys(changesByDate)
        .sort((a, b) => +b - +a)
        .reduce((acc, date) => {
          const formattedDate = dateFormat(new Date(+date), 'd mmm yyyy')
          const changes = changesByDate[date]
          return (
            acc +
            `\n*${formattedDate}*\n` +
            changes.map(change => `- ${change.description}`).join('\n')
          )
        }, '')
    )
  },
}
