import getDeckPresets from './'
import serialization from '~/helpers/serialization'
import getResolvedCardData from '~/helpers/getResolvedCardData'

describe('The `getDeckPresets` helper', () => {
  it('should return default presets for a non-suggested deck', () => {
    const deck = serialization.deck
      .deserialize('5n15n25f44f13f25f35n35n44n54n65n125n28')
      .map(getResolvedCardData)
    expect(getDeckPresets(deck)).toEqual({
      modifier: 'NONE',
      equals: false,
    })
  })

  it('should return brawl ID for a Brawl deck', () => {
    const deck = serialization.deck
      .deserialize('5n15s15n35n675s65s85s115s135n355s285s215s22')
      .map(getResolvedCardData)
    expect(getDeckPresets(deck)).toEqual({
      modifier: 'UNDEAD_STRENGTH',
      equals: false,
    })
  })

  it('should return equals for a tournament deck', () => {
    const deck = serialization.deck
      .deserialize('1n11i11i21n61n81n111i71i201i171i191n461n47')
      .map(getResolvedCardData)
    expect(getDeckPresets(deck)).toEqual({
      modifier: 'NONE',
      equals: true,
    })
  })
})
