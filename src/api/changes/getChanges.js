import { getEntries } from '~/helpers/sanity'
import clean from './clean'

const getChanges = async ({ isPreview } = {}) => {
  const changes = await getEntries({
    conditions: ['_type == "changelog"'],
    fields: `..., card -> { id }`,
    options: { order: 'date desc', isPreview },
  })

  return changes.map(clean)
}

export default getChanges
