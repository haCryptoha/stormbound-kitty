import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import BattleSimNav from '../BSNav'
import DeckBuilderNav from '../DBNav'
import CardBuilderNav from '../CBNav'
import ListBuilderNav from '../TLBNav'
import GuidesNav from '../GuidesNav'
import StoriesNav from '../StoriesNav'
import NavLink from '../NavLink'
import Icon from '../Icon'
import TogglableContent from '../TogglableContent'
import useViewportWidth from '../../helpers/useViewportWidth'
import './index.css'

const SubNav = props => {
  switch (props.active) {
    case 'BATTLE_SIM':
      return <BattleSimNav />
    case 'DECK_BUILDER':
      return <DeckBuilderNav />
    case 'CARD_BUILDER':
      return <CardBuilderNav />
    case 'LIST_BUILDER':
      return <ListBuilderNav />
    case 'GUIDES':
      return <GuidesNav />
    case 'STORIES':
      return <StoriesNav />
    default:
      return null
  }
}

const Header = props => {
  const viewportWidth = useViewportWidth()
  const [isExpanded, expand] = React.useState(false)

  return (
    <header role='banner' className='Header'>
      <TogglableContent
        id='navigation'
        isExpanded={viewportWidth > 700 ? true : isExpanded}
        renderToggle={toggleProps =>
          viewportWidth > 700 ? null : (
            <Fragment>
              <button
                {...toggleProps}
                type='button'
                onClick={() => expand(s => !s)}
                className='Header__toggle'
                title={isExpanded ? 'Close menu' : 'Open menu'}
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
              >
                ☰
              </button>
              <Link to='/' className='Header__title'>
                Stormbound Kitty
              </Link>
            </Fragment>
          )
        }
      >
        <nav className='Header__nav'>
          <ul className='Header__list'>
            <li className='Header__item Header__item--desktop'>
              <NavLink exact to='/'>
                <Icon icon='home' /> Home
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/sim'>
                <Icon icon='sword' /> Battle Sim
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/deck'>
                <Icon icon='stack' /> Deck builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/card'>
                <Icon icon='wand' /> Card builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/list'>
                <Icon icon='template' /> List Builder
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/stories'>
                <Icon icon='quill' /> Stories
              </NavLink>
            </li>
            <li className='Header__item'>
              <NavLink to='/guides'>
                <Icon icon='compass' /> Guides
              </NavLink>
            </li>
          </ul>
        </nav>

        {Boolean(props.active) && <SubNav active={props.active} />}
      </TogglableContent>
    </header>
  )
}

export default Header
