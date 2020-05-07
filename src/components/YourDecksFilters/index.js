import React from 'react'
import { CATEGORIES } from '../../constants/decks'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import Column from '../Column'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import './index.css'

export default React.memo(function YourDecksFilters(props) {
  const { decks } = React.useContext(PersonalDecksContext)

  const updateCategory = category =>
    props.setFilters(filters => ({ ...filters, category }))
  const updateName = name => props.setFilters(filters => ({ ...filters, name }))
  const updateFaction = faction =>
    props.setFilters(filters => ({ ...filters, faction }))
  const updateOrder = order =>
    props.setFilters(filters => ({ ...filters, order }))

  if (decks.length < 2) return null

  return (
    <MobileTogglableContent
      id='deck-filters'
      withSymbols
      labelCollapsed='Expand deck filters'
      labelExpanded='Collapse deck filters'
      className='YourDecksFilters__toggle'
    >
      <form
        onSubmit={event => event.preventDefault()}
        className='YourDecksFilters'
      >
        <Row>
          <Column>
            <FactionSelect
              value={props.faction}
              onChange={event => updateFaction(event.target.value)}
              data-testid='decks-faction-select'
              withAny
            />
          </Column>
          <Column>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              name='category'
              value={props.category}
              onChange={event => updateCategory(event.target.value)}
              data-testid='decks-category-select'
            >
              <option value='*'>Any</option>
              {Object.keys(CATEGORIES).map(category => (
                <option value={category} key={category}>
                  {CATEGORIES[category]}
                </option>
              ))}
            </select>
          </Column>
        </Row>

        <Row>
          <Column>
            <label htmlFor='name'>Name</label>
            <input
              type='search'
              name='name'
              id='name'
              value={props.name}
              onChange={event => updateName(event.target.value)}
              placeholder='e.g. Let It Go'
              data-testid='decks-name-input'
            />
          </Column>
          <Column>
            <label htmlFor='order'>Order</label>
            <select
              id='order'
              name='order'
              value={props.order}
              onChange={event => updateOrder(event.target.value)}
            >
              <option value='CATEGORY'>Category</option>
              <option value='DATE'>Chronological</option>
              <option value='FACTION'>Faction</option>
            </select>
          </Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
