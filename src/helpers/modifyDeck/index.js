import getResolvedCardData from '../getResolvedCardData'

const setToLevel1 = card => ({ ...card, level: card.token ? card.level : 1 })

const setStructureManaCost = card => {
  if (card.type !== 'structure') return card
  return { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
}

const setToadManaCost = card => {
  if (card.race !== 'toad') return card
  return { ...card, mana: 2, costReduced: card.mana > 2 ? true : false }
}

const reduceKnightManaCost = card => {
  if (card.race !== 'knight') return card
  return {
    ...card,
    mana: Math.max(0, card.mana - 2),
    costReduced: card.mana > 0,
  }
}

const reduceDwarfManaCost = card => {
  if (card.race !== 'dwarf') return card
  return {
    ...card,
    mana: Math.max(0, card.mana - 2),
    costReduced: card.mana > 0,
  }
}

const reduceSpellManaCost = card => {
  if (card.type !== 'spell') return card
  return {
    ...card,
    mana: Math.max(0, card.mana - 2),
    costReduced: card.mana > 0,
  }
}

const reducePirateManaCost = card => {
  if (card.race !== 'pirate') return card
  return {
    ...card,
    mana: Math.max(0, card.mana - 2),
    costReduced: card.mana > 0,
  }
}

export default (deck, modifier, equalsMode) => {
  const fullDeck = equalsMode
    ? deck.map(setToLevel1).map(getResolvedCardData)
    : deck.map(getResolvedCardData)

  switch (modifier) {
    case 'STRUCTURE_MANA':
      return fullDeck.map(setStructureManaCost)

    case 'TOAD_MANA':
      return fullDeck.map(setToadManaCost)

    case 'KNIGHT_MANA':
      return fullDeck.map(reduceKnightManaCost)

    case 'DWARF_MANA':
      return fullDeck.map(reduceDwarfManaCost)

    case 'SPELL_MANA':
      return fullDeck.map(reduceSpellManaCost)

    case 'PIRATE_MANA':
      return fullDeck.map(reducePirateManaCost)

    case 'NONE':
    default:
      return fullDeck
  }
}
