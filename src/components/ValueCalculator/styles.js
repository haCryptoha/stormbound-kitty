const controls = {
  display: 'flex',
}

const cardHolder = {
  width: '225px',
  margin: '3em auto',
}

const table = {
  textAlign: 'center',
  tableLayout: 'fixed',
  width: '100%',
  borderCollapse: 'collapse',

  '> thead > tr > th': {
    color: 'var(--beige)',
  },

  '> * > tr > *': {
    padding: '0.75em 0.5em',
    textAlign: 'center',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
}

const formula = {
  maxWidth: '80%',
  display: 'block',
  height: 'auto',
  margin: '1em auto 3em',
}

const hint = {
  medium: {
    textAlign: 'center',
  },
}

export default {
  controls,
  cardHolder,
  table,
  formula,
  hint,
}
