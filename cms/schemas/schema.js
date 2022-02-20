import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import story from './story'
import channel from './channel'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([channel, story]),
})
