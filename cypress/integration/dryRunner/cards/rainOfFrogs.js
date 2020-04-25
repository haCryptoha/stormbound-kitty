import s from '../selectors'

const DECK_ID =
  'NU4xLDVGOCw1TjIsNUY0LDVOMyw1TjIzLDVONCw1TjUsNU42LDVONjIsNU42Myw1STU'

describe('Dry-runner — Rain of Frogs', () => {
  it('should not be possible to play a unit or a structure after Rain of Frogs fills the board', () => {
    const HAND = ['N2', 'I5', 'N3', 'F8']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drPlay('F8')

      .drSelect('I5')
      .get(s.PLAY_BTN)
      .should('be.disabled')

      .drSelect('N3')
      .get(s.PLAY_BTN)
      .should('be.disabled')

      .drPlay('N2')
  })

  it('should only be possible to play Green Prototypes after Rain of Frogs if Toxic Sacrifice was played in-between', () => {
    const HAND = ['N1', 'N2', 'F4', 'F8']

    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drPlay('F8')

      .drSelect('N1')
      .get(s.PLAY_BTN)
      .should('be.disabled')

      .drPlay('F4')

      .drPlay('N1')
  })
})
