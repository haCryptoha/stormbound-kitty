import React from 'react'
import Icon from '../Icon'
import './index.css'

export default React.memo(function MemberToC(props) {
  return (
    <ul className='MemberToC'>
      <li>
        <Icon icon='quill' /> {props.stories.length}{' '}
        {props.stories.length === 1 ? 'story' : 'stories'}
      </li>
      <li>
        <Icon icon='compass' /> {props.guides.length}{' '}
        {props.guides.length === 1 ? 'guide' : 'guides'}
      </li>
      <li>
        <Icon icon='stack' /> {props.decks.length}{' '}
        {props.decks.length === 1 ? 'deck' : 'decks'}
      </li>
      <li>
        <Icon icon='users' /> {props.hosts.length} hosted{' '}
        {props.hosts.length === 1 ? 'tournament' : 'tournaments'}
      </li>
      <li>
        <Icon icon='trophy' /> {props.podiums.length}{' '}
        {props.podiums.length === 1 ? 'podium' : 'podiums'}
      </li>
      <li>
        <Icon icon='wand' /> {props.cards.length} won{' '}
        {props.cards.length === 1 ? 'card contest' : 'card contests'}
      </li>
      <li>
        <Icon icon='image' /> {props.artworks.length}{' '}
        {props.artworks.length === 1 ? 'artwork' : 'artworks'}
      </li>
      <li>
        <Icon icon='sword' /> {props.puzzles.length}{' '}
        {props.puzzles.length === 1 ? 'puzzle' : 'puzzles'}
      </li>
      <li>
        <Icon icon='bubbles' /> {props.podcasts.length}{' '}
        {props.podcasts.length === 1 ? 'podcast' : 'podcasts'}
      </li>
      <li>
        <Icon icon='star' /> {props.events.length} miscellaneous{' '}
        {props.events.length === 1 ? 'event' : 'events'}
      </li>
      <li>
        <Icon icon='hammer' /> {props.contributions.length}{' '}
        {props.contributions.length === 1
          ? 'code contribution'
          : 'code contributions'}
      </li>
      <li>
        <Icon icon='heart' /> {props.donations.length}{' '}
        {props.donations.length === 1 ? 'donation' : 'donations'}
      </li>
    </ul>
  )
})
