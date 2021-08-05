import cards from '../../data/cards'
import indexArray from '../indexArray'
import getFusionStonesCard from '../getFusionStonesCard'

const INDEXES = {
  id: indexArray(cards, 'id'),
  name: indexArray(cards, 'name'),
}

export default (needle, key = 'id') => {
  // `getRawCardData` is sometimes used as a direct callback in
  // `Array.prototype.map`, for which the 2nd argument is a number (the loop
  // index). In that case, reset the `key` to the default value (`id`).
  if (typeof key === 'number') key = 'id'

  if (typeof INDEXES[key] === 'undefined') {
    return {}
  }

  if (needle && needle.startsWith('R')) {
    return getFusionStonesCard(needle)
  }

  return INDEXES[key][needle] || {}
}
