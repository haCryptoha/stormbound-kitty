import React from 'react'
import Row from '../Row'
import Column from '../Column'
import FactionSelect from '../FactionSelect'

const BSPlayerForm = props => {
  return (
    <div className='BSPlayerForm'>
      <Row>
        <Column width={66}>
          <FactionSelect
            name={`faction-${props.player}`}
            id={`faction-${props.player}`}
            required
            onChange={event =>
              props.update({
                faction: event.target.value,
                health: props.health,
              })
            }
            value={props.faction || ''}
            data-testid={`${props.player}-faction-select`}
            withNeutral
          />
        </Column>
        <Column width={33}>
          <label
            className='BSPlayerForm__label'
            htmlFor={`health-${props.player}`}
          >
            {props.player} Health
          </label>
          <input
            type='number'
            name={`health-${props.player}`}
            id={`health-${props.player}`}
            value={props.health}
            onChange={event =>
              props.update({
                health: event.target.value,
                faction: props.faction,
              })
            }
            required
            min={1}
            max={99}
            data-testid={`${props.player}-health-input`}
          />
        </Column>
      </Row>
    </div>
  )
}

export default BSPlayerForm
