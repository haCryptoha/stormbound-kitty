import React from 'react'
import { RARITIES, TYPES, RACES } from '../../constants/game'
import CardSelect from '../CardSelect'
import Checkbox from '../Checkbox'
import FactionSelect from '../FactionSelect'
import ImageErrorDialog from '../CardBuilderImageErrorDialog'
import Row from '../Row'
import capitalise from '../../helpers/capitalise'
import './index.css'

export default React.memo(function CardBuilderCardForm(props) {
  const [imageFocusedColumn, setImageFocusedColumn] = React.useState(null)

  return (
    <>
      <form onSubmit={event => event.preventDefault()}>
        <Row>
          <Row.Column>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              maxLength={20}
              required
              value={props.name}
              onChange={event => props.setName(event.target.value)}
              data-testid='cb-name-input'
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='movement'>Movement</label>
            <input
              type='text'
              name='movement'
              id='movement'
              value={props.movement === null ? '' : props.movement}
              onChange={event => props.setMovement(event.target.value)}
              required
              disabled={props.type !== 'unit'}
              data-testid='cb-movement-input'
            />
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <label htmlFor='rarity'>Rarity</label>
            <select
              name='rarity'
              id='rarity'
              required
              value={props.rarity}
              onChange={event => props.setRarity(event.target.value)}
              data-testid='cb-rarity-select'
            >
              {Object.keys(RARITIES).map(rarity => (
                <option value={rarity} key={rarity}>
                  {capitalise(rarity)}
                </option>
              ))}
            </select>
          </Row.Column>
          <Row.Column>
            <label htmlFor='type'>Type</label>
            <select
              name='type'
              id='type'
              required
              value={props.type}
              onChange={event => props.setType(event.target.value)}
              data-testid='cb-type-select'
            >
              {Object.keys(TYPES).map(type => (
                <option value={type} key={type}>
                  {capitalise(type)}
                </option>
              ))}
            </select>
          </Row.Column>
        </Row>

        <Row>
          <Row.Column>
            <FactionSelect
              value={props.faction}
              onChange={event => props.setFaction(event.target.value)}
              withNeutral
              required
              data-testid='cb-faction-select'
            />
          </Row.Column>
          <Row.Column>
            <label htmlFor='race'>Race</label>
            <select
              name='race'
              id='race'
              required
              value={props.race || ''}
              disabled={props.type !== 'unit'}
              onChange={event => props.setRace(event.target.value)}
              data-testid='cb-race-select'
            >
              <option value=''>Race</option>
              {Object.keys(RACES).map(race => (
                <option value={race} key={race}>
                  {capitalise(race)}
                </option>
              ))}
            </select>
          </Row.Column>
        </Row>

        <Row>
          <Row.Column
            width={
              imageFocusedColumn === 'imageCardId'
                ? '2/3'
                : imageFocusedColumn === 'imageURL'
                ? '1/3'
                : undefined
            }
          >
            <label
              className='CardBuilderCardForm__image-label'
              htmlFor='imageCardId'
            >
              Existing card image
            </label>
            <CardSelect
              id='imageCardId'
              name='imageCardId'
              current={props.imageCardId}
              onChange={option =>
                props.setImageCardId(option ? option.value : null)
              }
              onFocus={() => setImageFocusedColumn('imageCardId')}
              onBlur={() => setImageFocusedColumn(null)}
              withSpells
              withTokens
              withClear
            />
            <ImageErrorDialog dialogRef={props.imageErrorDialogRef} />
          </Row.Column>
          <Row.Column
            width={
              imageFocusedColumn === 'imageURL'
                ? '2/3'
                : imageFocusedColumn === 'imageCardId'
                ? '1/3'
                : undefined
            }
          >
            <label
              className='CardBuilderCardForm__image-label'
              htmlFor='imageURL'
            >
              Or image from URL
            </label>
            <input
              type='url'
              name='imageURL'
              id='imageURL'
              value={props.imageURL}
              onChange={event => props.setImageURL(event.target.value)}
              onPaste={props.onImagePaste}
              onFocus={() => setImageFocusedColumn('imageURL')}
              onBlur={() => setImageFocusedColumn(null)}
              data-testid='cb-image-input'
            />
          </Row.Column>
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <fieldset>
              <legend>Unit-specific modifiers</legend>
              <Row>
                <Row.Column>
                  <Checkbox
                    className='CardBuilderCoreForm__checkbox'
                    name='elder'
                    id='elder'
                    checked={props.elder}
                    onChange={event => props.setElder(event.target.checked)}
                    disabled={props.type !== 'unit'}
                    data-testid='cb-elder-checkbox'
                  >
                    Elder
                  </Checkbox>
                </Row.Column>
                <Row.Column>
                  <Checkbox
                    className='CardBuilderCoreForm__checkbox'
                    name='hero'
                    id='hero'
                    checked={props.hero}
                    onChange={event => props.setHero(event.target.checked)}
                    disabled={props.type !== 'unit'}
                    data-testid='cb-hero-checkbox'
                  >
                    Hero
                  </Checkbox>
                </Row.Column>
              </Row>
            </fieldset>
          </Row.Column>
          <Row.Column />
        </Row>
      </form>
    </>
  )
})
