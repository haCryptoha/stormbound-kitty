import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import Title from '../Title'
import cards from '../../data/cards'
import { TOOLTIP_STYLES } from '../../constants/stats'
import { CHIP_CARDS } from '../../constants/game'

export default React.memo(function ChartAbility(props) {
  const abilities = {
    drain: { name: 'Drain', color: 'var(--light-shadowfen)' },
    command: { name: 'Commanding', color: 'var(--swarm)' },
    confus: { name: 'Confusion', color: 'var(--confused)' },
    freeze: { name: 'Freeze', color: 'var(--winter)' },
    poison: { name: 'Poison', color: 'var(--shadowfen)' },
    pull: { name: 'Push/pull', color: 'var(--ironclad)' },
    push: { name: 'Push/pull', color: 'var(--ironclad)' },
    chip: { name: 'Chip', color: 'var(--beige)' },
  }
  const regex = new RegExp('(' + Object.keys(abilities).join('|') + ')', 'i')
  const data = Object.values(
    cards.reduce((acc, card) => {
      if (!card.ability) return acc
      const match = CHIP_CARDS.includes(card.id)
        ? [, 'chip']
        : card.ability.match(regex)
      if (!match) return acc
      const type = abilities[match[1].toLowerCase()].name

      if (typeof acc[type] === 'undefined') {
        acc[type] = {
          name: type,
          color: abilities[match[1]].color,
          value: 0,
        }
      }
      acc[type].value++
      return acc
    }, {})
  )

  return (
    <>
      <Title>Ability types</Title>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Tooltip {...TOOLTIP_STYLES} />
          <Legend verticalAlign='bottom' />
          <Pie
            data={data}
            dataKey='value'
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={80}
            label
            startAngle={90}
            endAngle={360 + 90}
          >
            {data.map(level => (
              <Cell key={`cell-${level}`} fill={level.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
})
