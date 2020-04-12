import React from 'react'
import isEqual from 'lodash.isequal'
import Board from '../BattleSimBoardMobile'
import CellForm from '../BattleSimCellForm'
import CardsForm from '../BattleSimCardsForm'
import GameForm from '../BattleSimGameForm'
import PlayerForm from '../BattleSimPlayerForm'
import ButtonIcon from '../ButtonIcon'
import Puzzle from '../BattleSimPuzzle'
import Panel from '../BattleSimPanel'
import Hint from '../Hint'
import Deck from '../Deck'
import { serialiseDeck } from '../../helpers/serialise'
import './index.css'

export default class BattleSimAppMobile extends React.Component {
  static MODES = {
    GAME: 'GAME',
    SETTINGS: 'SETTINGS',
    CELL: 'CELL',
  }

  state = { mode: BattleSimAppMobile.MODES.GAME }

  componentDidMount() {
    this.xDown = null
    this.yDown = null

    document.addEventListener('touchstart', this.handleTouchStart, false)
    document.addEventListener('touchend', this.handleTouchMove, false)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeCell &&
      !isEqual(prevProps.activeCell, this.props.activeCell)
    ) {
      this.setState({ mode: BattleSimAppMobile.MODES.CELL })
    }
  }

  getTouches = event => {
    return event.touches || event.changedTouches || event.originalEvent.touches
  }

  handleTouchStart = event => {
    const firstTouch = this.getTouches(event)[0]

    if (['BUTTON', 'INPUT'].includes(event.target.nodeName)) {
      return
    }

    this.xDown = firstTouch.clientX
    this.yDown = firstTouch.clientY
  }

  handleTouchMove = event => {
    if (!this.xDown || !this.yDown) {
      return
    }

    const touches = event.changedTouches
    const touch = touches[touches.length - 1]

    const xUp = touch.clientX
    const yUp = touch.clientY
    const xDiff = this.xDown - xUp
    const yDiff = this.yDown - yUp

    const viewportWidth = document.documentElement.clientWidth
    const isRelevant =
      Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > viewportWidth / 3

    if (isRelevant) {
      if (xDiff > 0) {
        this.handleLeftSwipe()
      } else {
        this.handleRightSwipe()
      }
    }

    this.xDown = null
    this.yDown = null
  }

  handleLeftSwipe = () => {
    const shouldRenderRightPanel =
      (this.props.mode === 'EDITOR' &&
        !!this.props.activePlayer &&
        !!this.props.activeCell) ||
      (this.props.mode === 'DISPLAY' && !!this.props.puzzle)

    if (
      this.state.mode === BattleSimAppMobile.MODES.GAME &&
      shouldRenderRightPanel
    ) {
      this.setState({ mode: BattleSimAppMobile.MODES.CELL })
    } else if (this.state.mode === BattleSimAppMobile.MODES.SETTINGS) {
      this.setState({ mode: BattleSimAppMobile.MODES.GAME })
    }
  }

  handleRightSwipe = () => {
    if (this.state.mode === BattleSimAppMobile.MODES.CELL) {
      this.setState({ mode: BattleSimAppMobile.MODES.GAME })
    } else if (
      this.state.mode === BattleSimAppMobile.MODES.GAME &&
      this.props.shouldRenderLeftPanel
    ) {
      this.setState({ mode: BattleSimAppMobile.MODES.SETTINGS })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.handleTouchStart, false)
    document.removeEventListener('touchmove', this.handleTouchMove, false)
  }

  setActivePlayer = player => {
    if (!this.props.activePlayer) {
      this.setState({ mode: BattleSimAppMobile.MODES.GAME })
    }

    this.props.setActivePlayer(player)
  }

  onUnitSubmit = event => {
    this.props.onUnitSubmit(event)
    this.setState({ mode: BattleSimAppMobile.MODES.GAME })
  }

  emptyActiveCell = () => {
    this.props.emptyActiveCell()
    this.setState({ mode: BattleSimAppMobile.MODES.GAME })
  }

  render() {
    const shouldRenderRightPanel =
      (this.props.mode === 'EDITOR' &&
        !!this.props.activePlayer &&
        !!this.props.activeCell) ||
      (this.props.mode === 'DISPLAY' && !!this.props.puzzle)

    return (
      <div
        className={`BattleSimAppMobile BattleSimAppMobile--${this.state.mode}`}
      >
        {this.props.shouldRenderLeftPanel && (
          <div
            className={`BattleSimAppMobile__panel BattleSimAppMobile__panel--${BattleSimAppMobile.MODES.SETTINGS}`}
          >
            {this.props.mode === 'EDITOR' ? (
              <Panel
                side='left'
                title='Game and turn settings'
                isMobile={true}
                isPanelOpen={
                  this.state.mode === BattleSimAppMobile.MODES.SETTINGS
                }
                closePanel={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.GAME })
                }
                data-testid='settings-panel'
              >
                <PlayerForm
                  player='RED'
                  displayName='🔴 Red player (opponent)'
                  {...this.props.players.RED}
                />
                <PlayerForm
                  player='BLUE'
                  displayName='🔵 Blue player (you)'
                  {...this.props.players.BLUE}
                />
                <CardsForm {...this.props} />
                <GameForm {...this.props} />
              </Panel>
            ) : (
              <Panel
                side='left'
                title='Your deck'
                isMobile={true}
                isPanelOpen={
                  this.state.mode === BattleSimAppMobile.MODES.SETTINGS
                }
                closePanel={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.GAME })
                }
                data-testid='deck-panel'
              >
                <Deck
                  deck={this.props.cards}
                  onClick={this.props.zoom}
                  onClickLabel='Enlarge card'
                />
                <Hint>
                  <a
                    href={`/deck/` + serialiseDeck(this.props.cards)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Open deck
                  </a>{' '}
                  in deck builder.
                </Hint>
              </Panel>
            )}
          </div>
        )}

        <div className='BattleSimAppMobile__board'>
          <Board
            {...this.props}
            openCellPanel={() =>
              this.setState({ mode: BattleSimAppMobile.MODES.CELL })
            }
            dndProps={() => ({})}
          />

          {this.props.shouldRenderLeftPanel &&
            this.state.mode !== BattleSimAppMobile.MODES.SETTINGS && (
              <ButtonIcon
                className='BattleSimAppMobile__panel-button BattleSimAppMobile__panel-button--left'
                onClick={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.SETTINGS })
                }
                aria-label='Open settings panel'
                data-testid='settings-panel-btn'
              >
                ←
              </ButtonIcon>
            )}

          {shouldRenderRightPanel &&
            this.state.mode !== BattleSimAppMobile.MODES.CELL && (
              <ButtonIcon
                className='BattleSimAppMobile__panel-button BattleSimAppMobile__panel-button--right'
                onClick={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.CELL })
                }
                aria-label='Open cell panel'
                data-testid='cell-panel-btn'
              >
                →
              </ButtonIcon>
            )}
        </div>

        {shouldRenderRightPanel && (
          <div
            className={`BattleSimAppMobile__panel BattleSimAppMobile__panel--${BattleSimAppMobile.MODES.CELL}`}
          >
            {this.props.mode === 'EDITOR' ? (
              <Panel
                side='right'
                title='Active cell'
                isMobile={true}
                isPanelOpen={this.state.mode === BattleSimAppMobile.MODES.CELL}
                closePanel={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.GAME })
                }
                data-testid='cell-panel'
              >
                {!!this.props.activePlayer && !!this.props.activeCell && (
                  <CellForm
                    {...this.props}
                    setActivePlayer={this.setActivePlayer}
                    onUnitSubmit={this.onUnitSubmit}
                    emptyActiveCell={this.emptyActiveCell}
                  />
                )}
                {(!this.props.activePlayer || !this.props.activeCell) && (
                  <Hint>Select a cell.</Hint>
                )}
              </Panel>
            ) : (
              <Panel
                title='Puzzle'
                side='right'
                isMobile
                closePanel={() =>
                  this.setState({ mode: BattleSimAppMobile.MODES.GAME })
                }
                isPanelOpen={this.state.mode === BattleSimAppMobile.MODES.CELL}
              >
                <Puzzle {...this.props.puzzle} noImage />
              </Panel>
            )}
          </div>
        )}
      </div>
    )
  }
}
