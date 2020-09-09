describe('Routes — Fan-Kit', () => {
  it('it should render the cards page', () => {
    cy.visit('/fan-kit/cards').get('main h1').should('exist')
  })

  it('it should render the books page', () => {
    cy.visit('/fan-kit/books').get('main h1').should('exist')
  })

  it.skip('it should render the wallpapers page', () => {
    cy.visit('/fan-kit/wallpapers').get('main h1').should('exist')
  })
})
