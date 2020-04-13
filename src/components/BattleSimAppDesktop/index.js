import React from 'react'
import isEqual from 'lodash.isequal'
import Board from '../BattleSimBoardDesktop'
import CardsForm from '../BattleSimCardsForm'
import CellFormDialog from '../BattleSimCellFormDialog'
import Column from '../Column'
import Deck from '../Deck'
import GameForm from '../BattleSimGameForm'
import PlayerForm from '../BattleSimPlayerForm'
import Puzzle from '../BattleSimPuzzle'
import Row from '../Row'
import Title from '../Title'
import './index.css'

export default class BattleSimAppDesktop extends React.Component {
  state = {
    coords: {},
  }

  open = () => this.dialog.show()
  close = () => this.dialog.hide()

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.activeCell, this.props.activeCell)) {
      if (this.props.activeCell) {
        const node = document.querySelector(
          `.BattleSimRow:nth-child(${
            this.props.activeCell[0] + 1
          }) > :nth-child(${this.props.activeCell[1] + 1})`
        )
        const coords = node.getBoundingClientRect()

        this.dialog.dialog.style.left =
          window.scrollX + coords.width / 2 + coords.left + 'px'
        this.dialog.dialog.style.top =
          window.scrollY + coords.height + coords.top + 'px'

        this.setState({ coords })
        this.open()
      } else {
        this.close()
      }
    }
  }

  onMouseDown = (x, y) => () => {
    // If there is a unit/structure in the current cell, enable dragging mode on
    // mouse down and set the cell coordinates as drag source
    if (!!this.props.board[x][y].card.id) {
      this.props.setIsDragging(true)
      this.props.setDndSource([x, y])
    }
  }

  onMouseUp = (x, y) => () => {
    if (!this.props.isDragging) {
      return
    }

    this.props.setIsDragging(false)
  }

  onMouseOver = (x, y) => () => {
    if (!this.props.isDragging) {
      return
    }

    this.props.setDndTarget([x, y])
  }

  dndProps = (x, y) =>
    this.props.mode === 'DISPLAY'
      ? {}
      : {
          onMouseDown: this.onMouseDown(x, y),
          onMouseOver: this.onMouseOver(x, y),
          onMouseUp: this.onMouseUp(x, y),
          isDragging: this.props.isDragging,
        }

  render() {
    return (
      <div className='BattleSimAppDesktop'>
        <Board {...this.props} dndProps={this.dndProps} />

        <CellFormDialog
          {...this.props}
          close={this.close}
          coords={this.state.coords}
          dialogRef={dialog => (this.dialog = dialog)}
        />

        {this.props.mode === 'DISPLAY' && !!this.props.puzzle && (
          <div className='BattleSimAppDesktop__puzzle'>
            <Puzzle {...this.props.puzzle} noImage />
          </div>
        )}

        {this.props.mode === 'DISPLAY' && (
          <div className='BattleSimAppDesktop__deck'>
            <Deck
              deck={this.props.cards}
              onClick={this.props.zoom}
              onClickLabel='Enlarge card'
              showEmptySlots={false}
            />
          </div>
        )}

        {this.props.mode === 'EDITOR' && (
          <div className='BattleSimAppDesktop__settings'>
            <Row wideGutter>
              <Column width={33}>
                <Title>Game settings</Title>
                <GameForm {...this.props} />
              </Column>

              <Column width={33}>
                <Title>Player settings</Title>
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
              </Column>

              <Column width={33}>
                <Title>Cards settings</Title>
                <CardsForm {...this.props} />
              </Column>
            </Row>
          </div>
        )}
      </div>
    )
  }
}
