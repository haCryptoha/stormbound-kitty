import s from './selectors'

describe('Deck Builder — Featured', () => {
  before(() => cy.visit('/deck/featured'))

  it('should be possible to bookmark a deck', () => {
    cy.get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'true')
      .visit('/deck/collection')
      .get(s.PERSONAL_DECKS)
      .should('have.length', 1)
      .saveLocalStorage()
  })

  it('should be possible to unbookmark a deck', () => {
    cy.restoreLocalStorage()
      .visit('/deck/featured')
      .get(s.DECK_SUGGESTION)
      .first()
      .find(s.BOOKMARK_BTN)
      .click()
      .should('have.attr', 'aria-pressed', 'false')
      .visit('/deck/collection')
      .get(s.PERSONAL_DECKS)
      .should('have.length', 0)
  })
})
