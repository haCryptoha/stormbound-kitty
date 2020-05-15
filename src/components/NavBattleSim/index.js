import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import NavLink from '../NavLink'

export default React.memo(function NavBattleSim(props) {
  const match = useRouteMatch()
  const id = match.params.simId

  return (
    <nav className='Header__nav'>
      <ul className='Header__list Header__list--sub'>
        <li className='Header__item'>
          <NavLink
            to={id ? `/sim/${id}` : '/sim'}
            active={props.active === 'EDITOR'}
          >
            Simulator
          </NavLink>
        </li>

        <li className='Header__item'>
          {id ? (
            <NavLink
              to={`/sim/${id}/display`}
              active={props.active === 'DISPLAY'}
            >
              Display Mode
            </NavLink>
          ) : (
            <span
              className='Header__link Header__link--disabled'
              title='Your sim is not complete'
            >
              Display Mode
            </span>
          )}
        </li>

        <li className='Header__item  Header__item--right'>
          <NavLink to='/sim/puzzles' active={props.active === 'PUZZLES'}>
            Puzzles
          </NavLink>
        </li>
      </ul>
    </nav>
  )
})
