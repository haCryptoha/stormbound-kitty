const FUSION_STONES_BASE = {
  name: 'Fusion Stones',
  race: 'Resource',
  level: 1,
  type: 'unit',
  faction: 'neutral',
  mana: null,
  strength: null,
  movement: null,
}
const FUSION_STONES_COMMON = {
  ...FUSION_STONES_BASE,
  id: 'R1',
  ability: '5 Fusion Stones',
  rarity: 'common',
  image: 'http://localhost:3000/assets/images/iconography/stones_common.png',
}
const FUSION_STONES_RARE = {
  ...FUSION_STONES_BASE,
  id: 'R2',
  ability: '10 Fusion Stones',
  rarity: 'rare',
  image: 'http://localhost:3000/assets/images/iconography/stones_rare.png',
}
const FUSION_STONES_EPIC = {
  ...FUSION_STONES_BASE,
  id: 'R3',
  ability: '25 Fusion Stones',
  rarity: 'epic',
  image: 'http://localhost:3000/assets/images/iconography/stones_epic.png',
}
const FUSION_STONES_LEGENDARY = {
  ...FUSION_STONES_BASE,
  id: 'R4',
  ability: '50 Fusion Stones',
  rarity: 'legendary',
  image: 'http://localhost:3000/assets/images/iconography/stones_legendary.png',
}

export const FUSION_STONES = [
  FUSION_STONES_COMMON,
  FUSION_STONES_RARE,
  FUSION_STONES_EPIC,
  FUSION_STONES_LEGENDARY,
]

export default id => {
  return FUSION_STONES.find(fs => fs.id === id)
}
