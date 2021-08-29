/**
 * 1. `1.45em` is a magic number that gives enough space on both sides to render
 *    the backgrounds. Safari needs 1px less… :eye-roll:
 */
const cta = ({ isDisabled }) => ({
  display: 'inline-flex',
  padding: '0 calc(1.45em - 1px)' /* 1 */,
  border: 0,

  textDecoration: 'none',
  color: 'var(--black)',
  transition: '250ms',

  backgroundColor: 'transparent',
  backgroundSize: 'contain',
  backgroundPosition: 'left, right',
  backgroundRepeat: 'no-repeat',
  backgroundImage: [
    'url("/assets/images/iconography/cta_left.png")',
    'url("/assets/images/iconography/cta_right.png")',
  ].join(','),

  filter: isDisabled ? 'grayscale(1)' : undefined,
  cursor: isDisabled ? 'not-allowed' : 'pointer',

  ':hover': { filter: isDisabled ? 'grayscale(1)' : 'hue-rotate(60deg)' },

  small: { width: '100%' },
})

const content = {
  padding: 'var(--s-smaller) var(--s-base)',
  flexGrow: 1,
  height: '100%',

  fontSize: '80%',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  textAlign: 'center',

  backgroundImage: 'url("/assets/images/iconography/cta_center.png")',
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'contain',
}

const styles = { cta, content }

export default styles
