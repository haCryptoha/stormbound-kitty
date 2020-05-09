import s from './selectors'

describe('Brawl — Page', () => {
  before(() => cy.visit('/brawl/construct-movement'))
  afterEach(() => cy.saveLocalStorage())

  it('should display only relevant content when no matches are recorded', () => {
    cy.get(s.CHART)
      .should('not.exist')

      .get(s.RESET_BTN)
      .should('not.exist')

      .get(s.MILESTONE)
      .eq(0)
      .should('be.visible')

      .get(s.DECK)
      .should('have.length', 1)
  })

  it('should be possible to navigate milestones', () => {
    cy.get(s.MILESTONE_DIAMOND)
      .last()
      .click()

      .get(s.MILESTONE)
      .last()
      .should('be.visible')

      .get(s.MILESTONE)
      .first()
      .should('not.be.visible')
  })

  it('should be possible to record a match', () => {
    cy.brAddMatch('WON')

      .get(s.MATCHES)
      .should('have.length', 1)
  })

  it('should display relevant data when there is at least a match', () => {
    cy.get(s.CHART)
      .should('exist')

      .get(s.RESET_BTN)
      .should('exist')
  })

  it('should mark previous milestones as collected', () => {
    cy.brAddMatch('WON')

      .get(s.MILESTONE)
      .eq(0)
      .should('have.class', 'BrawlMilestone--collected')
  })

  it('should be backed up in local storage and offer CSV export', () => {
    cy.restoreLocalStorage()
    cy.reload()
      .get(s.MATCHES)
      .should('have.length', 2)
      .get(s.EXPORT_BTN)
      .exportFile()
      .should('contain', '20WW')
  })

  it('should be possible to import brawl data', () => {
    cy.get(s.IMPORT_BTN)
      .importFile('brawl.import.csv')
      .get(s.MATCHES)
      .should('have.length', 5)
  })
})
