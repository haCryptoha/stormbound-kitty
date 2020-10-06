import React from 'react'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Icon from '../Icon'
import MemberListEntry from '../MemberListEntry'
import PageMeta from '../PageMeta'
import Row from '../Row'
import { StoriesContext } from '../StoriesProvider'
import artworks from '../../data/art'
import decks from '../../data/decks'
import events from '../../data/events'
import guides from '../../data/guides'
import puzzles from '../../data/puzzles'
import tournaments from '../../data/tournaments'
import chunk from '../../helpers/chunk'
import { SWCC_SEASON_1, SWCC_SEASON_2, DONATORS } from '../../constants/misc'

const uniq = (myArr, prop) =>
  myArr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  )

const addType = type => entity => ({ member: entity?.author ?? entity, type })

const sortAlphabetically = (a, b) =>
  b.member.toLowerCase() > a.member.toLowerCase()
    ? -1
    : b.member.toLowerCase() < a.member.toLowerCase()
    ? +1
    : 0

const useMemberList = ({ name, type }) => {
  const stories = React.useContext(StoriesContext)

  return [
    ...stories.map(addType('STORY')),
    ...guides
      .map(guide => guide.authors)
      .flat()
      .map(addType('GUIDE')),
    ...DONATORS.map(addType('DONATION')),
    ...decks.map(addType('DECK')),
    ...artworks.map(addType('ARTWORK')),
    ...tournaments
      .map(tournament => tournament.hosts)
      .flat()
      .map(addType('HOST')),
    ...tournaments
      .map(tournament => tournament.podium)
      .flat(2)
      .map(addType('PODIUM')),
    ...[...SWCC_SEASON_1, ...SWCC_SEASON_2]
      .filter(week => week.winner)
      .map(week => week.winner.author)
      .map(addType('CARD')),
    ...puzzles.map(addType('PUZZLE')),
    ...events
      .map(event => event.author || event.authors)
      .flat()
      .map(addType('EVENT')),
  ]
    .filter(({ member }) => name === '' || member.toLowerCase().includes(name))
    .filter(({ type: cType }) => type === '*' || type === cType)
    .sort(sortAlphabetically)
}

export default React.memo(function Members(props) {
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('*')
  const members = useMemberList({ name, type })
  const rows = chunk(uniq(members, 'member'), 3)

  return (
    <>
      <HeaderBanner title='Members' />
      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <p>
            Find on this page all contributing members to Stormbound-Kitty,
            whether implicitly or explicitly. Any player with any site
            contribution of any kind will figure on this list (guides, decks,
            puzzles, donations, card contests, tournaments…).
          </p>
          <p>
            Players marked with a star (<Icon icon='star' />) are{' '}
            <abbr title='Kitty Appreciation Team'>KAT</abbr> members for having
            generously donated to the site hence making it possible to actively
            keep working on it.
          </p>
          <Row>
            <Column>
              <label htmlFor='name'>Name</label>
              <input
                type='search'
                name='name'
                id='name'
                placeholder='e.g. Kitty'
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Column>
            <Column>
              <label htmlFor='type'>Type</label>
              <select
                name='type'
                id='type'
                value={type}
                onChange={event => setType(event.target.value)}
              >
                <option value='*'>Any</option>
                <option value='ARTWORK'>Artworks</option>
                <option value='CARD'>Card Contests</option>
                <option value='DECK'>Decks</option>
                <option value='DONATION'>Donations</option>
                <option value='EVENT'>Events</option>
                <option value='GUIDE'>Guides</option>
                <option value='HOST'>Tournament Hosts</option>
                <option value='PODIUM'>Podiums</option>
                <option value='PUZZLE'>Puzzles</option>
                <option value='STORY'>Stories</option>
              </select>
            </Column>
          </Row>
        </Column>
        <Column width='2/3'>
          {rows.map(([a, b, c], index) => (
            <Row desktopOnly key={index}>
              <Column width='1/3'>
                {a && <MemberListEntry key={a.member} member={a.member} />}
              </Column>
              <Column width='1/3'>
                {b && <MemberListEntry key={b.member} member={b.member} />}
              </Column>
              <Column width='1/3'>
                {c && <MemberListEntry key={c.member} member={c.member} />}
              </Column>
            </Row>
          ))}
        </Column>
      </Row>
      <PageMeta
        title='Members'
        description='Find an index of all Stormbound-Kitty community members having contributed, one way or another, to the site with content'
      />
    </>
  )
})
