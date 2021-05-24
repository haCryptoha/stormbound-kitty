import getCostForMilestone from './'

describe('The `getCostForMilestone` helper', () => {
  it('should return 0 coins for the first milestone', () => {
    expect(getCostForMilestone({ milestone: 0, winRatio: 0.75 })).to.equal(0)
  })

  it('should handle 100% win rate', () => {
    expect(getCostForMilestone({ milestone: 1, winRatio: 1 })).to.equal(40)
    expect(getCostForMilestone({ milestone: 9, winRatio: 1 })).to.equal(13890)
  })
})
