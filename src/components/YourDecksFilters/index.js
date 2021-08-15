import React from 'react'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import Input from '../Input'
import FactionSelect from '../FactionSelect'
import MobileTogglableContent from '../MobileTogglableContent'
import Row from '../Row'
import Select from '../Select'
import TagsSelect from '../TagsSelect'

export default React.memo(function YourDecksFilters(props) {
  const { decks } = React.useContext(PersonalDecksContext)
  const updateTags = tags => props.setFilters(filters => ({ ...filters, tags }))
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
    >
      <form onSubmit={event => event.preventDefault()}>
        <Row>
          <Row.Column>
            <Input
              label='Name'
              type='search'
              id='name'
              value={props.name}
              onChange={event => updateName(event.target.value)}
              placeholder='e.g. Reckless Rush'
              data-testid='decks-name-input'
            />
          </Row.Column>
        </Row>
        <Row>
          <Row.Column>
            <TagsSelect
              tags={props.tags}
              updateTags={updateTags}
              isTagAvailable={tag =>
                decks.some(deck => deck.tags.includes(tag))
              }
              id='tags'
              name='tags'
            />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <FactionSelect
              value={props.faction}
              onChange={event => updateFaction(event.target.value)}
              data-testid='decks-faction-select'
              withAny
            />
          </Row.Column>
          <Row.Column>
            <Select
              label='Order'
              id='order'
              value={props.order}
              onChange={event => updateOrder(event.target.value)}
            >
              <option value='DATE'>Chronological</option>
              <option value='FACTION'>Faction</option>
              <option value='NAME'>Name</option>
            </Select>
          </Row.Column>
        </Row>
      </form>
    </MobileTogglableContent>
  )
})
