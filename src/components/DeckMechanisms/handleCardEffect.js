import { PROBABILITIES } from '../../constants/dryRunner'
import arrayRandom from '../../helpers/arrayRandom'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import shuffle from '../../helpers/shuffle'
import play from './play'
import cycle from './cycle'
import draw from './draw'

// Frozen enemies left after a card's ability has been resolved, in regular RNG mode
const FROZEN_ENEMIES_AFTER = {
  // Frosthexers
  W2: [1, 2, 3, 3, 4],
  // Moment’s Peace
  W6: [2, 3, 3, 4, 4],
  // Midwinter Chaos
  W11: [3, 3, 3, 2, 1],
  // Wisp Cloud
  W4: [0, 0, 0, 1, 2],
}

/**
 * Mutate the given state following the given card’s ability.
 * @param {Object} state - State being mutated
 * @param {Object} card - Resolved card being played
 * @param {String} mode - Game mode (MANUAL or AUTOMATIC)
 * @return {Object} Mutated state
 */
const handleCardEffect = (state, card, mode) => {
  // On turn 1, any 3 mana card can be played since it would be the only one
  // to be played and would not fill the board by itself. Any 2 mana card will
  // have to be played together with a 1 mana card. This will cause a board
  // filling issue only when this card is Rain of Frogs.
  // The remaining playable cards are Green Prototypes, Summon Militia, Toxic
  // Sacrifice and Rain of Frogs. In these cases, the `emptyCellsIndicator`
  // variable represents how many cells are free. In the other cases it is not
  // needed and will never be set to 0.
  switch (card.id) {
    // Green Prototypes (necessarily advance the frontline since only the
    // four 1 mana cards are taken into account)
    case 'N1': {
      if (state.turn === 1) {
        state.specifics.emptyCellsIndicator += 4
      }
      break
    }

    // Summon Militia (won’t cause any board filling issues)
    case 'N2': {
      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
        state.specifics.emptyCellsIndicator = Math.max(
          state.specifics.emptyCellsIndicator - 1,
          0
        )
      }
      break
    }

    // Toxic Sacrifice (frees up at least one cell)
    case 'F4': {
      if (state.turn === 1) {
        state.specifics.emptyCellsIndicator += 1
      }
      break
    }

    // Rain of Frogs
    case 'F8': {
      const frogs = [4, 5, 5, 6, 6]

      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
        state.specifics.emptyCellsIndicator = Math.max(
          state.specifics.emptyCellsIndicator - frogs[card.level - 1],
          0
        )
      }
      break
    }

    // Head Start
    case 'S24': {
      if (state.turn === 1) {
        state.specifics.noUnitsOnFirstTurn = false
      }
      break
    }

    // Icicle Burst
    case 'W1': {
      // Icicle Burst should destroy the frozen enemy unit if there is only
      // one on the board.
      if (state.specifics.frozenEnemiesLevel === 1) {
        state.specifics.frozenEnemiesLevel = 0
      }
      break
    }

    // Frozen Core
    case 'W9': {
      state.specifics.activeFrozenCores += 1
      break
    }

    // Find how many frozen enemies there are on the board. This is not a
    // precise number but gives an approximation (one, a few, many, all) of
    // this amount. Based on this approximation and the card that has just
    // been played, store how many frozen enemies stayed on the board.
    case 'W2':
    case 'W4':
    case 'W6':
    case 'W11': {
      // For example, playing Midwinter Chaos will freeze a lot of units,
      // but if there are already many frozen units on the board, it will
      // generally destroy them.
      const frozenEnemiesNowRegular =
        FROZEN_ENEMIES_AFTER[card.id][state.specifics.frozenEnemiesLevel]

      // If the RNG is friendly, the enemy units were spawned in such a way
      // that an additional unit gets frozen every time a freezing card is
      // played.
      if (state.RNG === 'FRIENDLY') {
        state.specifics.frozenEnemiesLevel = Math.min(
          frozenEnemiesNowRegular + 1,
          4
        )
      }

      // If the RNG is unfriendly to the user, the opposite happens: Freezing cards are not as
      // efficient and less enemy units get frozen
      else if (state.RNG === 'UNFRIENDLY') {
        state.specifics.frozenEnemiesLevel = Math.max(
          frozenEnemiesNowRegular - 1,
          0
        )
      }
      // In the regular case, just store the new approximation in the
      // `frozenEnemiesLevel` specific.
      else {
        state.specifics.frozenEnemiesLevel = frozenEnemiesNowRegular
      }
      break
    }

    // Dawnsparks
    case 'W16': {
      state.specifics.activeDawnsparks += 1
      break
    }

    // Freebooters
    case 'N14': {
      const { hand } = state

      if (mode !== 'MANUAL' && hand.length < 4) {
        draw(state)
        if (card.level >= 4 && hand.length < 3) draw(state)
      }

      break
    }

    // Rimelings
    case 'W12': {
      state.mana += 3
      break
    }

    // Gift of the Wise
    case 'W19': {
      state.mana += +card.ability.match(/(\d+)/)[1]
      break
    }

    // Snake Eyes
    case 'N33': {
      if (mode !== 'MANUAL' && state.hand.length === 3) {
        state.hand.forEach(cardId =>
          cycle(state, cardId, { countAsCycled: false })
        )

        if (card.level >= 4) draw(state)
      }
      break
    }

    // Lady Rime
    case 'W10': {
      state.mana = 0
      break
    }

    // Archdruid Earyn
    case 'N48': {
      const spells = state.hand.filter(getPlayableSpells(state))
      const shuffledSpells = shuffle(spells)

      if (mode !== 'MANUAL' && spells.length > 0) {
        play(state, shuffledSpells[0], { mode, free: true })

        if (card.level >= 4 && spells.length > 1) {
          play(state, shuffledSpells[1], { mode, free: true })
        }
      }
      break
    }

    // Collector Mirz
    case 'N8': {
      state.deck.push(getCollectorMirzToken(card.level))
      break
    }

    // First Mutineer
    case 'N12': {
      const nonPirates = state.hand.filter(getNonPirates(state))

      if (mode !== 'MANUAL' && nonPirates.length > 0) {
        play(state, arrayRandom(nonPirates), { mode, discard: true })
      }
      break
    }

    // Goldgrubbers
    case 'N22': {
      const nonPirates = state.hand.filter(getNonPirates(state))

      if (mode !== 'MANUAL' && nonPirates.length > 0) {
        cycle(state, arrayRandom(nonPirates), { countAsCycled: false })
      }
      break
    }

    // Counselor Ahmi
    case 'S3': {
      if (
        state.RNG === 'FRIENDLY' ||
        (state.RNG === 'REGULAR' && Math.random() <= PROBABILITIES.AHMI_RETURNS)
      ) {
        state.hand.push('S3')
      }
      break
    }

    // Queen of Herds
    case 'S21': {
      const satyrs = state.deck.filter(getSatyrs(state))
      let satyr1, satyr2

      // If Queen of Herds is played without any satyr in the remaining cards
      // from the deck, there is nothing more to do.
      if (mode === 'MANUAL' || satyrs.length === 0) {
        break
      }

      // Pick a satyr from the remaining cards from a deck at random and play
      // it for free.
      // Note: it seems that QoH does not draw satyrs based on their weight,
      // hence the use of `arrayRandom` instead of `rwc`.
      // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580933180325920
      // Note: it seems that QoH spawns do not cause a weighing of the deck.
      // See: https://discordapp.com/channels/293674725069029377/564840207875178502/676580198057246730
      satyr1 = arrayRandom(satyrs).id
      play(state, satyr1, { mode, free: true })

      // If Queen of Herds is level 4 or 5 and there were more than single
      // satyr in the remaining cards from the deck, a second one can be
      // picked at random and played for free.
      if (satyrs.length > 1 && card.level >= 4) {
        satyr2 = arrayRandom(satyrs.filter(satyr => satyr.id !== satyr1)).id

        if (satyr2) {
          play(state, satyr2, { mode, free: true })
        }
      }

      break
    }

    // Spellbinder Zhevana gains mana depending on the approximation of the
    // number of frozen enemy units on the board. The RNG appearing in the
    // game — how many units are played in the same column — is replaced by aa
    // RNG variation when cards like Frosthexers or Midwinter Chaos are
    // actually played.
    case 'W8': {
      const { frozenEnemiesLevel } = state.specifics
      // Zhevana destroys some of the frozen units — the amount of remaining
      // frozen units was chosen arbitrarily and is set to 50%.
      // Note: The `frozenEnemiesLevel` does still not indicate how many enemy
      // frozen units there are on the board — it only gives an approximation,
      // from 0 (no) to 4 (almost all).
      state.mana += frozenEnemiesLevel * 4
      state.specifics.frozenEnemiesLevel = Math.floor(frozenEnemiesLevel / 2)
      break
    }

    default:
  }

  return state
}

function getNonPirates(state) {
  return cardId => {
    return state.deck.find(card => card.id === cardId).race !== 'pirate'
  }
}

function getSatyrs(state) {
  return card => !state.hand.includes(card.id) && card.race === 'satyr'
}

function getPlayableSpells(state) {
  return cardId => {
    if (cardId === 'W1') {
      return state.specifics.frozenEnemiesLevel !== 0
    }

    const cardInDeck = state.deck.find(card => card.id === cardId)

    return cardInDeck.type === 'spell'
  }
}

function getCollectorMirzToken(level) {
  const id = 'T' + arrayRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14])
  const token = resolveCardForLevel({ id })
  token.level = [5, 6, 6, 8, 10][level - 1]
  token.weight = 0
  token.id = id + ':' + Math.random().toString(36).substring(7)
  return token
}

export default handleCardEffect
