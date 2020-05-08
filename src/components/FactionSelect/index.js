import React from 'react'
import { FACTIONS } from '../../constants/game'
import capitalise from '../../helpers/capitalise'

export default React.memo(function FactionSelect(props) {
  return (
    <>
      <label htmlFor={props.id || 'faction'} className={props.labelClassName}>
        {props.label || 'Faction'}
      </label>
      <select
        form={props.form}
        name={props.name || 'faction'}
        id={props.id || 'faction'}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        data-testid={props['data-testid']}
      >
        {props.withAny && <option value='*'>Any</option>}
        {props.withEmpty && <option value=''>Pick a faction</option>}
        {Object.keys(FACTIONS)
          .filter(faction => props.withNeutral || faction !== 'neutral')
          .map(faction => (
            <option value={faction} key={faction}>
              {capitalise(faction)}
            </option>
          ))}
      </select>
    </>
  )
})
