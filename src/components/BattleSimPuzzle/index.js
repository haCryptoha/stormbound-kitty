import React from 'react'
import { Link } from 'react-router-dom'
import { RESTRICTIONS, TYPES } from '../../constants/puzzles'
import Image from '../Image'
import Only from '../Only'
import { formatDate } from '../../helpers/formatDate'
import './index.css'

const getDate = date => {
  if (date instanceof Date) return date

  const [month, year] = date.split('/')

  return new Date(+year, +month - 1, 1)
}

export default React.memo(function BattleSimPuzzle(props) {
  const date = getDate(props.date)

  return (
    <div className='BattleSimPuzzle'>
      {!props.noImage && (
        <Only.Desktop>
          <div className='BattleSimPuzzle__image-wrapper'>
            <Image
              className='BattleSimPuzzle__image'
              src={props.image}
              alt={props.name}
            />
          </div>
        </Only.Desktop>
      )}
      <div className='BattleSimPuzzle__content'>
        <h3 className='BattleSimPuzzle__name'>
          <Link to={`/sim/${props.board}/display`} data-testid='puzzle-link'>
            {props.name}
          </Link>
        </h3>
        <p className='BattleSimPuzzle__author'>
          by <Link to={'/member/' + props.author}>{props.author}</Link>, in{' '}
          <time
            className='BattleSimPuzzle__date'
            dateTime={
              date.getFullYear() +
              '-' +
              String(date.getMonth()).padStart(2, '0')
            }
          >
            {formatDate(date)}
          </time>
        </p>
        <dl className='BattleSimPuzzle__details'>
          <dt data-testid='puzzle-type'>{props.type.toLowerCase()}:</dt>
          <dd>
            {props.description || TYPES[props.type]} {props.note}
          </dd>

          <dt>Difficulty:</dt>
          <dd data-testid='puzzle-difficulty'>{props.difficulty}/3</dd>

          <dt>Restrictions:</dt>
          <dd data-testid={'puzzle-restrictions'}>
            {props.restrictions.length > 0
              ? [...props.restrictions].sort().map((restriction, index) => (
                  <React.Fragment key={index}>
                    <span
                      title={RESTRICTIONS[restriction].description}
                      className='BattleSimPuzzle__restriction'
                    >
                      {RESTRICTIONS[restriction].name}
                    </span>
                    {index !== props.restrictions.length - 1 && ', '}
                  </React.Fragment>
                ))
              : 'none'}
          </dd>
        </dl>
      </div>
    </div>
  )
})
