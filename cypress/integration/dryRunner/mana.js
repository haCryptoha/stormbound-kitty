import s from './selectors'

const DECK_ID = '5n15n25n35n235n45n55n65n625n145w125w104w19'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Mana', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should start a game with 3 mana', () => {
    cy.get(s.MANA).should('contain', 3)
  })

  it('should be possible to gain/spend mana', () => {
    cy.drEndTurn(5)

      .drPlay('W19')

      .get(s.MANA)
      .should('contain', 13)

      .drPlay('W12')

      .get(s.MANA)
      .should('contain', 11)

      .drPlay('W10')

      .get(s.MANA)
      .should('contain', 0)
  })
})
