const deck = {
  position: 'relative',
}

const info = {
  display: 'flex',
}

const meta = {
  paddingRight: '1em',
}

const name = {
  fontSize: '120%',
  display: 'block',
}

/**
 * 1. Pull rarity bar within the bottom margin of the deck itself.
 */
const rarityBar = {
  marginBottom: 'var(--s-smaller)',
  marginTop: '-0.5em' /* 1 */,
}

const actions = {
  fontSize: '80%',
  display: 'flex',
  marginTop: 'var(--s-base)',
  marginLeft: 'auto',
  opacity: 0.5,
  transition: '250ms',

  ':hover': {
    opacity: 1,
  },

  '> *': { margin: '0 0.5em 0 0.75em' },
}

export default {
  deck,
  info,
  meta,
  name,
  rarityBar,
  actions,
}