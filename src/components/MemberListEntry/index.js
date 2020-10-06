import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import useMemberContent from '../../hooks/useMemberContent'
import './index.css'

const getLabel = (key, number) => {
  switch (key) {
    case 'stories':
      return number === 1 ? 'story' : 'stories'
    case 'decks':
      return number === 1 ? 'deck' : 'decks'
    case 'guides':
      return number === 1 ? 'guide' : 'guides'
    case 'hosts':
      return number === 1 ? 'hosted tournament' : 'hosted tournaments'
    case 'podiums':
      return number === 1 ? 'podium' : 'podiums'
    case 'artworks':
      return number === 1 ? 'artwork' : 'artworks'
    case 'puzzles':
      return number === 1 ? 'puzzle' : 'puzzles'
    case 'cards':
      return number === 1 ? 'won card contest' : 'won card contests'
    case 'donations':
      return number === 1 ? 'donation' : 'donations'
    case 'events':
      return number === 1 ? 'miscellaneous event' : 'miscellaneous events'
    default:
      return null
  }
}

const MemberListEntryToC = React.memo(function MemberListEntryToC(props) {
  const keys = Object.keys(props.details)
  const data = keys.reduce((acc, key) => {
    if (props.details[key].length > 0) {
      acc[key] = props.details[key]
    }

    return acc
  }, {})

  return (
    <ul className='MemberListEntry__toc'>
      {Object.keys(data).map(key => (
        <li key={key}>
          {data[key].length} {getLabel(key, data[key].length)}
        </li>
      ))}
    </ul>
  )
})

export default React.memo(function MemberListEntry(props) {
  const { content, details } = useMemberContent(props.member.toLowerCase())
  const KATMember = details.donations.length > 0
  return (
    <div className='MemberListEntry'>
      <Icon
        icon={KATMember ? 'star' : 'user'}
        className='MemberListEntry__icon'
      />
      <div className='MemberListEntry__content'>
        <Link to={`/member/${props.member}`} className='MemberListEntry__name'>
          {props.member}
        </Link>
        <details>
          <summary>
            <span className='MemberListEntry__summary'>
              {content.length} contribution{content.length === 1 ? '' : 's'}
            </span>
          </summary>
          <MemberListEntryToC details={details} />
        </details>
      </div>
    </div>
  )
})
