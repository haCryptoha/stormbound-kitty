import countCardsForRarity from '../helpers/countCardsForRarity'

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
  ancient: 'A',
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
    coinsPerExtraCopy: 15,
  },
  rare: {
    copies: [2, 4, 10, 24],
    stonesPerMissingCopy: 7,
    stonesForMissing: 12,
    coinsPerExtraCopy: 30,
  },
  epic: {
    copies: [1, 3, 7, 18],
    stonesPerMissingCopy: 15,
    stonesForMissing: 25,
    coinsPerExtraCopy: 70,
  },
  legendary: {
    copies: [1, 2, 5, 12],
    stonesPerMissingCopy: 30,
    stonesForMissing: 50,
    coinsPerExtraCopy: 150,
  },
}

export const BOOKS = {
  MYTHIC: { percentiles: [0, 0, 0.7, 0.3], draws: 6 },
  HEROIC: { percentiles: [0, 0.7, 0.25, 0.05], draws: 6 },
  CLASSIC: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 6 },
  NOBLE: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 3 },
  HUMBLE: { percentiles: [0.7, 0.25, 0.04, 0.01], draws: 1 },
}

export const PRE_MADE_EXPECTATIONS = {
  FUSION_STONES: { label: 'Fusion stones', expectations: [1, 1, 1, 1] },
  SPECIFIC_COMMON: {
    label: 'a specific common card',
    expectations: [1, 0, 0, 0],
  },
  SPECIFIC_RARE: { label: 'a specific rare card', expectations: [0, 1, 0, 0] },
  SPECIFIC_EPIC: { label: 'a specific epic card', expectations: [0, 0, 1, 0] },
  SPECIFIC_LEGENDARY: {
    label: 'a specific legendary card',
    expectations: [0, 0, 0, 1],
  },
  ANY_COMMON: {
    label: 'any common card',
    expectations: [countCardsForRarity('common'), 0, 0, 0],
  },
  ANY_RARE: {
    label: 'any rare card',
    expectations: [0, countCardsForRarity('rare'), 0, 0],
  },
  ANY_EPIC: {
    label: 'any epic card',
    expectations: [0, 0, countCardsForRarity('epic'), 0],
  },
  ANY_LEGENDARY: {
    label: 'any legendary card',
    expectations: [0, 0, 0, countCardsForRarity('legendary')],
  },
}

export const CHIP_CARDS = [
  'I15',
  'N44',
  'F28',
  'S13',
  'S18',
  'I19',
  'N45',
  'W21',
]
