/**
 * 1. Give a lot of vertical space around the loader, which works because it is
 *    only used at a page level but would fail miserably when used elsewhere.
 */
const loader = {
  margin: '6em auto' /* 1 */,
}

const svg = {
  display: 'block',
  margin: '0 auto 2.5em',
  transform: 'scale(1.5)',
}

export default { loader, svg }
