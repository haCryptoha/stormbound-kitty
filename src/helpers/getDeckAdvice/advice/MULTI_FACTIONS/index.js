const getFactions = cards =>
  [...new Set(cards.map(card => card.faction))].filter(
    faction => faction !== 'neutral'
  )

export default cards => {
  const factions = getFactions(cards)

  if (factions.length <= 1) return null

  return {
    id: 'MULTI_FACTIONS',
    name: 'Multi-factions',
    description: `This deck counts ${factions.length} factions, which is not technically permitted in Stormbound. This deck cannot be played in game.`,
  }
}
