import command from './'
const decks = command.handler

describe('Bot — !decks', () => {
  it('should return the suggestions URL for an empty search', () => {
    expect(decks('').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions'
    )
  })

  it('should handle factions', () => {
    expect(decks('ironclad').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('shadowfen').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('winter').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('swarm').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle categories', () => {
    expect(decks('diamond_1').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('regular').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=REGULAR'
    )
    expect(decks('brawl').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=BRAWL'
    )
    expect(decks('equals').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
  })

  it('should handle aliases', () => {
    expect(decks('d1').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('diamond').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=DIAMOND_1'
    )
    expect(decks('tournament').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('tourney').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('equal').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?category=EQUALS'
    )
    expect(decks('ic').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('red').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=ironclad'
    )
    expect(decks('sf').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('green').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=shadowfen'
    )
    expect(decks('w').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('wp').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('blue').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=winter'
    )
    expect(decks('sw').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
    expect(decks('yellow').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?faction=swarm'
    )
  })

  it('should handle including cards', () => {
    expect(decks('I2').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('mia').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=I2'
    )
    expect(decks('rof').url).to.equal(
      'https://stormbound-kitty.com/deck/suggestions?including=F8'
    )
  })

  it('should handle multi-searches', () => {
    const [, search] = decks('ic mia diamond').url.split('?')
    const params = new URLSearchParams(search)
    expect(params.get('faction')).to.equal('ironclad')
    expect(params.get('category')).to.equal('DIAMOND_1')
    expect(params.get('including')).to.equal('I2')
  })
})
