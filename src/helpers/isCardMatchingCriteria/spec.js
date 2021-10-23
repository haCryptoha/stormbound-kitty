import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardMatchingCriteria from './'

describe('The `isCardMatchingCriteria` helper', () => {
  it('should handle rarity', () => {
    const isCommon = isCardMatchingCriteria({ rarity: 'common' })

    expect(isCommon(getResolvedCardData({ id: 'N1' }))).toEqual(false)
    expect(isCommon(getResolvedCardData({ id: 'N2' }))).toEqual(true)
  })

  it('should handle type', () => {
    const isSpell = isCardMatchingCriteria({ type: 'spell' })

    expect(isSpell(getResolvedCardData({ id: 'N1' }))).toEqual(false)
    expect(isSpell(getResolvedCardData({ id: 'N2' }))).toEqual(true)
  })

  it('should handle race', () => {
    const isConstruct = isCardMatchingCriteria({ race: 'construct' })

    expect(isConstruct(getResolvedCardData({ id: 'N1' }))).toEqual(true)
    expect(isConstruct(getResolvedCardData({ id: 'N2' }))).toEqual(false)
  })

  it('should handle elder', () => {
    const isElder = isCardMatchingCriteria({ elder: true })

    expect(isElder(getResolvedCardData({ id: 'N1' }))).toEqual(false)
    expect(isElder(getResolvedCardData({ id: 'N70' }))).toEqual(true)
  })

  it('should handle ability', () => {
    const isElder = isCardMatchingCriteria({ ability: /a Knight with/ })

    expect(isElder(getResolvedCardData({ id: 'N1' }))).toEqual(false)
    expect(isElder(getResolvedCardData({ id: 'N2' }))).toEqual(true)
    expect(isElder(getResolvedCardData({ id: 'N3' }))).toEqual(false)
  })

  it('should handle name', () => {
    const isTemple = isCardMatchingCriteria({ name: /^Temple/ })

    expect(isTemple(getResolvedCardData({ id: 'N1' }))).toEqual(false)
    expect(isTemple(getResolvedCardData({ id: 'S29' }))).toEqual(true)
  })

  it('should handle mix', () => {
    const isRareConstruct = isCardMatchingCriteria({
      rarity: 'rare',
      race: 'construct',
    })

    expect(isRareConstruct(getResolvedCardData({ id: 'N1' }))).toEqual(true)
    expect(isRareConstruct(getResolvedCardData({ id: 'I6' }))).toEqual(false)
  })
})
