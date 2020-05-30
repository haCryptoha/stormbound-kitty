import cards from '../../../data/cards'
import { FACTIONS, RACES, RARITIES, TYPES } from '../../../constants/game'
import arrayRandom from '../../../helpers/arrayRandom'
import getIgnoredSearch from '../../../helpers/getIgnoredSearch'

const linkify = card => 'https://stormbound-kitty.com/card/' + card.id

export default {
  command: 'randomcard',
  name: 'Random card',
  example: 'ic spell rare',
  description: 'Get a random card matching given search criteria',
  icon: '🃏',
  handler: function (content) {
    const search = content.toLowerCase().trim()

    if (search.length === 0) {
      return linkify(arrayRandom(cards))
    }

    const ignoredTerms = []
    const searchTerms = search.split(/\s+/g).reduce((search, term) => {
      if (term === 'hero') search.hero = true
      else if (term === 'elder') search.elder = true
      else if (Object.keys(FACTIONS).includes(term)) search.faction = term
      else if (Object.keys(RACES).includes(term)) search.race = term
      else if (Object.keys(RARITIES).includes(term)) search.rarity = term
      else if (Object.keys(TYPES).includes(term)) search.type = term
      else {
        switch (term) {
          case 'struct':
            search.type = 'structure'
            break
          case 'ic':
          case 'red':
            search.faction = 'ironclad'
            break
          case 'sf':
          case 'green':
            search.faction = 'shadowfen'
            break
          case 'w':
          case 'wp':
          case 'blue':
            search.faction = 'winter'
            break
          case 'sw':
          case 'yellow':
            search.faction = 'swarm'
            break
          case 'n':
            search.faction = 'neutral'
            break
          default:
            ignoredTerms.push(term)
            break
        }
      }

      return search
    }, {})

    if (Object.keys(searchTerms).length === 0) return

    const results = cards
      .filter(card => !card.token)
      .filter(card => {
        if (searchTerms.hero && !card.hero) return false
        if (searchTerms.elder && !card.elder) return false
        if (searchTerms.faction && card.faction !== searchTerms.faction)
          return false
        if (searchTerms.type && card.type !== searchTerms.type) return false
        if (searchTerms.rarity && card.rarity !== searchTerms.rarity)
          return false
        if (searchTerms.race && card.race !== searchTerms.race) return false
        return true
      })

    if (results.length === 0) return

    return [
      linkify(arrayRandom(results)),
      getIgnoredSearch(search, ignoredTerms),
    ]
      .filter(Boolean)
      .join('\n')
  },
}
