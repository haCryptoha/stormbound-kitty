import command from './'
const deckid = command.handler

const BASE_URL = 'https://stormbound-kitty.com/deck/'

describe('Bot — !deckid', () => {
  it('should return nothing for a missing term', () => {
    expect(deckid('')).to.equal(undefined)
  })

  it('should default to level 1 for no mentioned levels', () => {
    expect(deckid('gp,sm,dopp,gr,head,rg,uh,wild,forsoul,pog,sg,dev')).to.equal(
      BASE_URL + '1n11n21s11n31s241s21n631n671s61n151s81s11'
    )
  })

  it('should handle leading deck level', () => {
    expect(
      deckid('5 gp,sm,dopp,gr,head,rg,uh,wild,forsoul,pog,sg,dev')
    ).to.equal(BASE_URL + '5n15n25s15n35s245s25n635n675s65n155s85s11')
  })

  it('should handle trailing deck level', () => {
    expect(
      deckid('gp,sm,dopp,gr,head,rg,uh,wild,forsoul,pog,sg,dev 5')
    ).to.equal(BASE_URL + '5n15n25s15n35s245s25n635n675s65n155s85s11')
  })

  it('should handle card levels', () => {
    expect(
      deckid('gp 1,2sm,3 dopp,gr4,5  head,rg,uh,wild,forsoul,pog,sg,dev')
    ).to.equal(BASE_URL + '1n12n23s14n35s241s21n631n671s61n151s81s11')
  })

  it('should handle card level and deck level', () => {
    expect(
      deckid('gp 1,2sm,3 dopp,gr4,5  head,rg,uh,wild,forsoul,pog,sg,dev 3')
    ).to.equal(BASE_URL + '1n12n23s14n35s243s23n633n673s63n153s83s11')
  })

  it('should cap the deck length at 12', () => {
    expect(
      deckid('gp,sm,dopp,gr,head,rg,uh,wild,forsoul,pog,sg,dev,5lawles')
    ).to.not.contain('5n2')
  })

  it('should prevent duplicates', () => {
    expect(deckid('salty,5 salty')).to.equal(BASE_URL + '1n52')
  })

  it('should return nothing for a no-match', () => {
    expect(deckid('flksdjf')).to.equal(undefined)
  })

  it('should ignore unknown terms', () => {
    const output = deckid('gp,qsdkljsk,gr')

    expect(output).to.contain('1n11n3')
    expect(output).to.contain('~~qsdkljsk~~')
  })
})
