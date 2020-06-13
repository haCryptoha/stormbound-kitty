import isSuggestedDeck from '../isSuggestedDeck'
import getResolvedCardData from '../getResolvedCardData'
import sortByMana from '../sortByMana'

const getDeckBuilderMetaTags = deck => {
  const suggestedDeck = isSuggestedDeck(deck)
  const metaTags = { title: 'Deck' }

  if (suggestedDeck) {
    metaTags.title = `${suggestedDeck.name} by ${suggestedDeck.author}`
  }

  if (deck.length === 0) {
    metaTags.description = 'Compose your own deck on Stormbound-Kitty'
  } else {
    metaTags.description = deck
      .slice(0)
      .sort(sortByMana)
      .map(getResolvedCardData)
      .map(card => `${card.mana} ${card.name} (${card.level})`)
      .join('\n')
  }

  return metaTags
}

export default getDeckBuilderMetaTags
