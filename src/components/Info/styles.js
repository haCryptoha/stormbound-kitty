const info = ({ withCta }) => ({
  border: '1px solid var(--dark-beige)',
  borderRadius: '3px',
  padding: '1em',
  position: 'relative',
  margin: '2em 0',
  paddingBottom: withCta ? '2.25em' : undefined,
  marginBottom: withCta ? '3em' : undefined,

  '> :last-child': {
    marginBottom: 0,
  },
})

const title = {
  position: 'absolute',
  bottom: '100%',
  transform: 'translateY(50%)',
  padding: '0 0.5em',
  left: '1em',
  backgroundColor: 'var(--black)',
  color: 'var(--beige)',
  fontSize: '90%',
  textTransform: 'uppercase',
}

const icon = {
  marginRight: '0.25em',
  position: 'relative',
  top: '1.5px',
}

const cta = {
  position: 'absolute',
  left: '50%',
  top: '100%',
  transform: 'translate(-50%, -50%) translateY(3px)',
  width: '50%',
  textAlign: 'center',
}

export default { info, title, icon, cta }
