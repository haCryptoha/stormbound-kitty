import cards from '../../data/cards'
import getExpectedCoinsPerBook from './'

const LEVEL_5_COLLECTION = cards.map(card => ({
  id: card.id,
  level: 5,
  rarity: card.rarity,
}))

const LEVEL_1_COLLECTION = cards.map(card => ({
  id: card.id,
  level: 1,
  rarity: card.rarity,
}))

describe('The `getExpectedCoinsPerBook` helper', () => {
  const COINS = {
    MYTHIC: 545.045454545454,
    HEROIC: 269.59943181818153,
    CLASSIC: 131.37949532085548,
    NOBLE: 65.6897476604278,
    HUMBLE: 21.896582553475934,
  }

  Object.keys(COINS).forEach(bookType => {
    it(`should return ${COINS[bookType]} coins for a ${bookType} book with a level 5 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_5_COLLECTION, bookType)).to.equal(
        COINS[bookType]
      )
    })
  })

  Object.keys(COINS).forEach(bookType => {
    it(`should return 0 coins for a ${bookType} book with a level 1 collection`, () => {
      expect(getExpectedCoinsPerBook(LEVEL_1_COLLECTION, bookType)).to.equal(0)
    })
  })
})
