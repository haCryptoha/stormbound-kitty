import s from './selectors'

describe('The reset board button', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should reset all info', () => {
    cy.get(s.RED_HEALTH_INPUT)
      .clear()
      .type('20')
      .get(s.BLUE_FACTION_SELECT)
      .select('ironclad')
      .get(s.GRID_MARKERS_CHECKBOX)
      .click()
      .fill('A1', { card: 'Zhev' })
      .fill('E1', { card: 'Sound', level: 3, strength: 10, player: 'RED' })
      .draw({ slot: 1, card: 'Toxic' })
      .draw({ slot: 2, card: 'Crimson' })
      .draw({ slot: 3, card: 'Copper' })

      .get(s.RESET_BOARD_BTN)
      .click()
      .get(s.RESET_BOARD_CONFIRM_BTN)
      .click()
      .get(s.RED_HEALTH)
      .then($health => expect($health).to.have.text('10'))
      .get(s.BLUE_FACTION)
      .then($faction => expect($faction).to.have.text('Neutral'))
      .get(s.GRID_MARKERS)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
      .get(s.CELL_E1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_E1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
      .get(s.CARD_SLOT_1)
      .should('be.empty')
      .get(s.CARD_SLOT_2)
      .should('be.empty')
      .get(s.CARD_SLOT_3)
      .should('be.empty')
  })
})
