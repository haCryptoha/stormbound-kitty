describe('Routes — Cards Stats', () => {
  it('it should render', () => {
    cy.visit('/cards-stats').get('main h1').should('exist')
  })
})
