export const FACTIONS = {
  neutral: 'N',
  winter: 'W',
  ironclad: 'I',
  shadowfen: 'F',
  swarm: 'S',
}

export const TYPES = { unit: 'U', structure: 'S', spell: 'C' }

export const RARITIES = { common: 'C', rare: 'R', epic: 'E', legendary: 'L' }

export const RACES = {
  construct: 'C',
  dragon: 'D',
  dwarf: 'W',
  frostling: 'F',
  feline: 'E',
  knight: 'K',
  pirate: 'P',
  raven: 'R',
  rodent: 'O',
  satyr: 'S',
  toad: 'T',
  undead: 'U',
}

export const CURRENCIES = {
  coins: 'C',
  rubies: 'R',
  stones: 'S',
}

export const UPGRADE_COST = [50, 100, 300, 1000]
export const RARITY_COPIES = {
  common: {
    copies: [2, 5, 12, 30],
    stonesPerMissingCopy: 3,
    stonesForMissing: 5,
    stonesPerExtraCopy: 1,
    coinsPerExtraCopy: 15,
  },
  rare: {
    copies: [2, 4, 10, 24],
    stonesPerMissingCopy: 7,
    stonesForMissing: 12,
    stonesPerExtraCopy: 2,
    coinsPerExtraCopy: 30,
  },
  epic: {
    copies: [1, 3, 7, 18],
    stonesPerMissingCopy: 15,
    stonesForMissing: 25,
    stonesPerExtraCopy: 5,
    coinsPerExtraCopy: 70,
  },
  legendary: {
    copies: [1, 2, 5, 12],
    stonesPerMissingCopy: 30,
    stonesForMissing: 50,
    stonesPerExtraCopy: 10,
    coinsPerExtraCopy: 150,
  },
}

export const BOOKS = {
  MYTHIC: { percentiles: [0, 0, 70, 30], draws: 6 },
  HEROIC: { percentiles: [0, 70, 25, 5], draws: 6 },
  CLASSIC: { percentiles: [70, 25, 4, 1], draws: 6 },
  NOBLE: { percentiles: [70, 25, 4, 1], draws: 3 },
  ELDER: { percentiles: [0, 67, 30, 3], draws: 1 },
  HUMBLE: { percentiles: [70, 25, 4, 1], draws: 1 },
}
