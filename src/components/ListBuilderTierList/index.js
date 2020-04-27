import React from 'react'
import { TIER_COLORS } from '../../constants/list'
import ListBuilderTier from '../ListBuilderTier'

export default React.memo(props =>
  props.tiers.map((tier, index) => (
    <ListBuilderTier
      {...tier}
      color={TIER_COLORS[index]}
      key={index}
      prefix={`tier-${index}-`}
      isEditable={false}
    />
  ))
)
