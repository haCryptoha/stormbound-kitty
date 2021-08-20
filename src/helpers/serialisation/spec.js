import { base64Encode } from '~/helpers/base64'
import serialisation from './'

describe('The `serialisation.deck.serialise` helper', () => {
  it('should serialise some cards', () => {
    expect(serialisation.deck.serialise([{ level: 1, id: 'N1' }])).toEqual(
      '1n1'
    )
  })

  it('should handle tokens with a forced padding', () => {
    expect(
      serialisation.deck.serialise([
        { level: 1, id: 'T1', token: true },
        { level: 10, id: 'T2', token: true },
      ])
    ).toEqual('01t110t2')
  })

  it('should strip out empty cards', () => {
    expect(
      serialisation.deck.serialise([{ level: 1, id: 'N1' }, null, {}])
    ).toEqual('1n1')
  })

  it('should use global level above 3 cards', () => {
    expect(
      serialisation.deck.serialise([
        { level: 1, id: 'N1' },
        { level: 1, id: 'N2' },
        { level: 1, id: 'N3' },
      ])
    ).toEqual('1xn1n2n3')
  })
})

describe('The `serialisation.deck.deserialise` helper', () => {
  it('should handle decks serialised with the old system', () => {
    expect(
      serialisation.deck.deserialise(
        base64Encode('5N1,5N2,5F2,5F3,5N3,5F5,5N12,5N16,5F14,5F15,5N30,5N57')
      )
    ).toEqual([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
      { level: 5, id: 'N3' },
      { level: 5, id: 'F5' },
      { level: 5, id: 'N12' },
      { level: 5, id: 'N16' },
      { level: 5, id: 'F14' },
      { level: 5, id: 'F15' },
      { level: 5, id: 'N30' },
      { level: 5, id: 'N57' },
    ])
  })

  it('should deserialise a deck', () => {
    expect(
      serialisation.deck.deserialise(
        '5n15n25f25f35n35f55n125n165f145f155n305n57'
      )
    ).toEqual([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
      { level: 5, id: 'N3' },
      { level: 5, id: 'F5' },
      { level: 5, id: 'N12' },
      { level: 5, id: 'N16' },
      { level: 5, id: 'F14' },
      { level: 5, id: 'F15' },
      { level: 5, id: 'N30' },
      { level: 5, id: 'N57' },
    ])
  })

  it('should deserialise a series of cards smaller than 12', () => {
    expect(serialisation.deck.deserialise('5n15n25f25f3')).toEqual([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
      { level: 5, id: 'F2' },
      { level: 5, id: 'F3' },
    ])
  })

  it('should handle tokens', () => {
    expect(serialisation.deck.deserialise('01t105t210t399t4')).toEqual([
      { level: 1, id: 'T1' },
      { level: 5, id: 'T2' },
      { level: 10, id: 'T3' },
      { level: 99, id: 'T4' },
    ])
  })

  it('should handle a global level', () => {
    expect(serialisation.deck.deserialise('5xn1n2')).toEqual([
      { level: 5, id: 'N1' },
      { level: 5, id: 'N2' },
    ])
  })
})
