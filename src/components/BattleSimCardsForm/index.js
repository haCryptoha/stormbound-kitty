import React from 'react'
import { DEFAULT_CARD } from '../../constants/deck'
import CardSelect from '../CardSelect'
import DeckImport from '../BattleSimDeckImport'
import NumberInput from '../NumberInput'
import Row from '../Row'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

const CardsFormRow = React.memo(({ index, ...props }) => (
  <div
    className='BattleSimCardsForm__row'
    hidden={!props.expanded && index >= 4}
  >
    <Row>
      <Row.Column width='2/3'>
        <label className='VisuallyHidden' htmlFor={`card-${index}`}>
          Slot #{index + 1}’s card
        </label>
        <CardSelect
          id={`card-${index}`}
          name={`card-${index}`}
          current={props.cards[index] ? props.cards[index].id : ''}
          onChange={option => {
            !option
              ? props.setCard(index)({ ...DEFAULT_CARD })
              : props.setCard(index)({
                  id: option.value,
                  level: Math.min(props.cards[index].level, 5),
                })
          }}
          withSpells
          withTokens
          disabledOptions={props.cards.map(card => card.id)}
        />
      </Row.Column>
      <Row.Column width='1/3'>
        <Row>
          <Row.Column>
            <label className={'VisuallyHidden'} htmlFor={`card-${index}-level`}>
              Slot #{index + 1}’s level
            </label>
            {getRawCardData(props.cards[index].id).token ? (
              <NumberInput
                name={`card-${index}-level`}
                id={`card-${index}-level`}
                required
                min={1}
                value={props.cards[index].level || 1}
                onChange={level => props.setCard(index)({ level })}
                data-testid={`cards-form-strength-${index}`}
              />
            ) : (
              <select
                disabled={getRawCardData(props.cards[index].id).token}
                name={`card-${index}-level`}
                id={`card-${index}-level`}
                value={Math.min(props.cards[index].level, 5) || 1}
                onChange={event =>
                  props.setCard(index)({ level: +event.target.value })
                }
                data-testid={`cards-form-level-${index}`}
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            )}
          </Row.Column>
          <Row.Column>
            <button
              type='button'
              className='BattleSimCardsForm__hand-button'
              aria-pressed={props.hand.includes(props.cards[index].id)}
              disabled={
                !props.cards[index].id ||
                (props.hand.length === 4 &&
                  !props.hand.includes(props.cards[index].id))
              }
              onClick={() => props.addToHand({ id: props.cards[index].id })}
              title={
                !props.cards[index].id
                  ? ''
                  : props.hand.includes(props.cards[index].id)
                  ? 'Remove card from hand'
                  : 'Add card to hand'
              }
              aria-label={
                props.hand.includes(props.cards[index].id)
                  ? 'Remove card from hand'
                  : 'Add card to hand'
              }
            >
              {props.hand.includes(props.cards[index].id) ? '-' : '+'}
            </button>
          </Row.Column>
        </Row>
      </Row.Column>
    </Row>
  </div>
))

export default React.memo(function BattleSimCardsForm(props) {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <>
      <fieldset className='BattleSimCardsForm' data-testid='cards-form'>
        <legend>
          Cards
          <button
            type='button'
            onClick={() => setExpanded(e => !e)}
            className='ButtonAsLink BattleSimCardsForm__expand-button'
          >
            {expanded ? 'Collapse deck' : 'Expand deck'}
          </button>
        </legend>

        {props.cards.map((card, index) => (
          <CardsFormRow
            {...props}
            index={index}
            key={card.id || index}
            expanded={expanded}
          />
        ))}
      </fieldset>
      <DeckImport importDeck={props.importDeck} />
    </>
  )
})
