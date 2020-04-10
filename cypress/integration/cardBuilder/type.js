import s from './selectors'

describe('Card Builder — Type', () => {
  const type = 'spell'
  const assertCardType = index =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find('.Card__content')
      .then($node => {
        expect($node.attr('style')).to.include(type)
      })

  before(() => {
    cy.visit('/card')
  })

  it('should be unit by default', () => {
    cy.get(s.TYPE_SELECT).should('have.value', 'unit')
  })

  it('should be possible to update the card faction', () => {
    cy.get(s.TYPE_SELECT).select(type).should('have.value', type)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardType(i)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.TYPE_SELECT).should('have.value', type)
    for (let i = 0; i < 5; i++) assertCardType(i)
  })
})
