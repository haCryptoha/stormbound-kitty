import s from './selectors'

describe('Deck Builder — Search', () => {
  before(() => {
    cy.visit('/deck')
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

  it('should be able to filter by type', () => {
    cy.get(s.TYPE_SELECT)
      .select('spell')
      .get(s.CARD)
      .find('.Card__content')
      .then($node => {
        expect($node.attr('style')).to.include('spell')
      })
  })

  it('should be able to filter by mana', () => {
    cy.get(s.MANA_SELECT)
      .select('6-7')
      .get(s.CARD)
      .find('.Card__mana-content')
      .each($node => {
        const mana = Number($node.text())
        expect(mana).to.be.above(5)
        expect(mana).to.be.below(8)
      })
  })

  it('should be able to filter by movement', () => {
    cy.get(s.MOVEMENT_SELECT)
      .select('2')
      .get(s.CARD)
      .find('.Card__movement-content')
      .each($node => {
        expect($node.text()).to.equal('2')
      })
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

  it('should be able to filter by race', () => {
    cy.get(s.RACE_SELECT)
      .select('rodent')
      .get(s.CARD)
      .find(s.CARD_RACE)
      .each($node => {
        expect($node.text()).to.contain('rodent')
      })
  })

  it('should be able to filter by ability', () => {
    cy.get(s.ABILITY_SELECT)
      .select('FREEZE')
      .get(s.CARD)
      .find(s.CARD_ABILITY)
      .each($node => {
        expect($node.text()).to.match(/freeze/i)
      })
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT).type('Kitten').get(s.CARD).should('have.length', 1)
  })

  it('should be able to filter by hero', () => {
    cy.get(s.HERO_CHECKBOX)
      .check()
      .get(s.CARD)
      .find(s.CARD_RACE)
      .each($node => {
        expect($node.text()).to.contain('hero')
      })
  })

  it('should be able to filter by elder', () => {
    cy.get(s.ELDER_CHECKBOX)
      .check()
      .get(s.CARD)
      .find(s.CARD_RACE)
      .each($node => {
        expect($node.text()).to.contain('elder')
      })
  })
})
