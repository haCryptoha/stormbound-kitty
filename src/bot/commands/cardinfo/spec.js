import cardinfo from './'

describe('Bot — !cardinfo', () => {
  it('should return nothing for a missing term', () => {
    expect(cardinfo('')).to.equal(undefined)
    expect(cardinfo('  ')).to.equal(undefined)
  })

  it('should return nothing for a single letter term', () => {
    expect(cardinfo('f')).to.equal(undefined)
  })

  it('should handle a Stormbound-Kitty ID', () => {
    expect(cardinfo('N1')).to.equal('https://stormbound-kitty.com/card/N1')
  })

  it('should handle a known card abbreviation', () => {
    expect(cardinfo('rof')).to.equal('https://stormbound-kitty.com/card/F8')
  })

  it('should handle a fuzzy search', () => {
    expect(cardinfo('king')).to.contain('https://stormbound-kitty.com/card/N69')
    expect(cardinfo('king')).to.contain('https://stormbound-kitty.com/card/N73')
  })

  it('should return nothing for a no-match', () => {
    expect(cardinfo('flksdjf')).to.equal(undefined)
  })
})
