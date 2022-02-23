import querystring from 'querystring'

const PREVIEW_PATH = '/api/preview'
const PREVIEW_TOKEN = process.env.SANITY_STUDIO_PREVIEW_TOKEN

export default function getPreviewURL(document) {
  if (!PREVIEW_TOKEN) {
    return console.warn(
      'Missing environment variable `SANITY_STUDIO_PREVIEW_TOKEN`.'
    )
  }

  const goTo = args =>
    'https://stormbound-kitty.com' +
    PREVIEW_PATH +
    '?' +
    querystring.stringify({
      token: PREVIEW_TOKEN,
      type: document._type,
      ...args,
    })

  switch (document._type) {
    case 'deck':
      return goTo({ id: document.id })
    case 'puzzle':
      return goTo({ id: document.board })
    case 'story':
      return goTo({ slug: document.slug })
    default:
      return goTo({})
  }
}