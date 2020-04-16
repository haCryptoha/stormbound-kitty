import React from 'react'
import hookIntoProps from 'hook-into-props'
import ActiveCardForm from '../CollectionActiveCardForm'
import CardsGallery from '../CardsGallery'
import { CollectionContext } from '../CollectionProvider'
import CollectionClearHint from '../CollectionClearHint'
import CollectionStats from '../CollectionStats'
import Column from '../Column'
import CTA from '../CTA'
import EmptySearch from '../EmptySearch'
import CardsFiltering from '../CardsFiltering'
import Filters from '../CollectionFilters'
import ImportCollection from '../ImportCollection'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import download from '../../helpers/download'
import resolveCardForLevel from '../../helpers/resolveCardForLevel'
import isCardUpgradable from '../../helpers/isCardUpgradable'
import getRawCardData from '../../helpers/getRawCardData'
import './index.css'

class Collection extends React.Component {
  constructor(props) {
    super(props)

    this.state = { activeCard: null, hasImported: null }

    this.levelField = React.createRef()
  }

  setActiveCard = id => {
    this.setState(
      state => ({
        activeCard: state.activeCard === id ? null : id,
      }),
      () => {
        if (this.state.activeCard) {
          this.levelField.current.focus()
        }
      }
    )
  }

  onActiveCardFormSubmit = event => {
    const { activeCard: id } = this.state
    event.preventDefault()

    this.setState({ activeCard: null }, () => {
      const $button = document.querySelector(`#card-${id} > button`)

      if ($button) $button.focus()
    })
  }

  uploadCSV = data => {
    if (data) {
      this.props.updateCollection(data)
      this.setState({ hasImported: true }, () => {
        setTimeout(() => this.setState({ hasImported: null }), 3000)
      })
    }
  }

  formatCollectionAsCSV = cards => {
    const headers = ['id', 'name', 'level', 'copies']
    const data = [
      headers,
      ...cards.map(card => [
        card.id,
        // Make sure the name doesn’t contain a comma otherwise it might cause
        // an issue when deserialising the CSV
        getRawCardData(card.id).name.replace(',', ''),
        // For people to open the CSV file in Excel, it’s better if it contains
        // *all* cards; missing ones are marked as level 0
        card.missing ? 0 : card.level,
        card.copies || 0,
      ]),
    ].join('\n')

    return data
  }

  download = () =>
    download({
      content: this.formatCollectionAsCSV(this.props.collection),
      fileName: 'collection.csv',
      mimeType: 'text/csv;encoding:utf-8',
    })

  updateActiveCardInCollection = (key, value) => {
    this.props.updateCollection(collection => {
      const { activeCard } = this.state
      const ids = collection.map(card => card.id)
      const index = ids.indexOf(activeCard)
      const card = collection.find(card => card.id === activeCard)
      const newCard = { ...card, [key]: value }

      return [
        ...collection.slice(0, index),
        newCard,
        ...collection.slice(index + 1),
      ]
    })
  }

  setActiveCardLevel = event =>
    this.updateActiveCardInCollection('level', +event.target.value)

  setActiveCardCopies = event =>
    this.updateActiveCardInCollection('copies', +event.target.value || null)

  setActiveCardMissing = event =>
    this.updateActiveCardInCollection('missing', event.target.checked)

  getActiveCardData = () => {
    const activeCard = this.props.collection.find(
      card => card.id === this.state.activeCard
    )

    return (
      activeCard &&
      resolveCardForLevel({
        id: this.state.activeCard,
        level: activeCard.level,
      })
    )
  }

  isCardUpgradable = id =>
    isCardUpgradable(this.props.collection.find(card => card.id === id))

  isCardMissing = id =>
    this.props.collection.find(card => card.id === id).missing

  render() {
    const activeCard = this.props.collection.find(
      card => card.id === this.state.activeCard
    )
    const resolvedActiveCard = this.getActiveCardData()

    return (
      <>
        <h1 className='visually-hidden'>Card Collection</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <div className='Collection__info'>
              <Title>What is this</Title>

              <p>
                If you take the time to mark the level of all your cards, as
                well as the amount of copies you have for each, you can get
                handy stats such as the amount of fusion stones or gold you need
                to upgrade your cards.
              </p>

              <p>
                The collection is locally saved in your browser as you update it
                so you can safely leave or refresh the page. If you want to save
                it more permanently and synchronise it between device, you can
                export it as a CSV.
              </p>

              <CollectionClearHint />

              <Row>
                <Column>
                  <ImportCollection onChange={this.uploadCSV} />
                </Column>
                <Column>
                  <CTA type='button' onClick={this.download}>
                    Export collection
                  </CTA>
                </Column>
              </Row>

              {this.state.hasImported !== null && (
                <span>
                  {this.state.hasImported
                    ? '✓ Your collection has been successfully imported!'
                    : '✘ Unfortunately their was an error importing your collection.'}
                </span>
              )}
            </div>

            {this.state.activeCard ? (
              <ActiveCardForm
                activeCard={activeCard}
                resolvedActiveCard={resolvedActiveCard}
                onActiveCardFormSubmit={this.onActiveCardFormSubmit}
                setActiveCardLevel={this.setActiveCardLevel}
                setActiveCardCopies={this.setActiveCardCopies}
                setActiveCardMissing={this.setActiveCardMissing}
                levelFieldRef={this.levelField}
              />
            ) : (
              <CollectionStats collection={this.props.collection} />
            )}
          </Column>

          <Column width={66}>
            <Title>Cards Collection</Title>

            <CardsFiltering
              cards={this.props.collection.map(resolveCardForLevel)}
            >
              {({
                filters,
                filtersSetters,
                collection,
                resetFilters,
                cardsPerPage,
              }) => (
                <>
                  <Filters
                    {...filters}
                    {...filtersSetters}
                    resetFilters={resetFilters}
                  />

                  {collection.length > 0 ? (
                    <CardsGallery
                      filters={filters}
                      cards={collection}
                      cardsPerPage={cardsPerPage}
                      onCardClick={this.setActiveCard}
                      isCardAffordable={id => id === this.state.activeCard}
                      isCardUpgradable={this.isCardUpgradable}
                      isCardMissing={this.isCardMissing}
                      onPageChange={() => this.setState({ activeCard: null })}
                    />
                  ) : (
                    <EmptySearch
                      title='No cards found'
                      resetFilters={resetFilters}
                    />
                  )}
                </>
              )}
            </CardsFiltering>
          </Column>
        </Row>

        <PageMeta
          title='Cards Collection'
          description='Import and export your own card collection.'
        />
      </>
    )
  }
}

export default hookIntoProps(() => React.useContext(CollectionContext))(
  Collection
)
