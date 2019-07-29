import React, { Fragment } from 'react'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

const FactionSelect = props => {
  return (
    <Fragment>
      <label htmlFor={props.id || 'faction'}>Faction</label>
      <select
        name={props.name || 'faction'}
        id={props.id || 'faction'}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
      >
        {props.withAny && <option value="*">Any</option>}
        {Object.keys(FACTIONS)
          .filter(faction => props.withNeutral || faction !== 'neutral')
          .map(faction => (
            <option value={faction} key={faction}>
              {capitalise(faction)}
            </option>
          ))}
      </select>
    </Fragment>
  )
}

export default FactionSelect
