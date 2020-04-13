import s from './selectors'

describe('Collection — Search', () => {
  before(() => {
    cy.visit('/deck/collection')
  })

  beforeEach(() => {
    cy.get(s.RESET_BTN).click()
  })

  it('should be able to filter by faction', () => {
    cy.get(s.FACTION_SELECT)
      .select('ironclad')
      .get(s.CARD)
      .should('have.class', 'Card--ironclad')
  })

  it('should be able to filter by status', () => {
    cy.get(s.STATUS_SELECT)
      .select('MISSING')
      .get(s.CARD)
      .should('have.length', 0)
  })

  it('should be able to filter by level', () => {
    cy.get(s.LEVEL_SELECT).select('2').get(s.CARD).should('have.length', 0)
  })

  it('should be able to filter by rarity', () => {
    cy.get(s.RARITY_SELECT)
      .select('epic')
      .get(s.CARD)
      .find(s.CARD_RARITY)
      .each($node => {
        expect($node.attr('alt')).to.equal('epic')
      })
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT).type('Kitten').get(s.CARD).should('have.length', 1)
  })
})
