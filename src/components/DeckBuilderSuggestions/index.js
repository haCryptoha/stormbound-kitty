import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import hookIntoProps from 'hook-into-props'
import debounce from 'lodash.debounce'
import decks from '../../data/decks'
import Column from '../Column'
import EmptySearch from '../EmptySearch'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Suggestion from '../DeckBuilderSuggestion'
import SuggestionsFilters from '../DeckBuilderSuggestionsFilters'
import SuggestionsNav from '../DeckBuilderSuggestionsNav'
import Title from '../Title'
import chunk from '../../helpers/chunk'
import { deserialiseDeck } from '../../helpers/deserialise'
import './index.css'

class DeckBuilderSuggestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...this.getURLParameters(),
      name: '',
      activePage: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.href !== this.props.location.href) {
      this.setState(this.getURLParameters())
    }
  }

  getURLParameters = () => {
    const parameters = new URLSearchParams(window.location.search)

    return {
      category: parameters.get('category') || '*',
      faction: parameters.get('faction') || '*',
      author: parameters.get('author') || '*',
      including: parameters.get('including') || null,
    }
  }

  updateURLParameters = event => {
    const parameters = new URLSearchParams(window.location.search)

    if (this.state.category === '*') parameters.delete('category')
    else parameters.set('category', this.state.category)

    if (this.state.faction === '*') parameters.delete('faction')
    else parameters.set('faction', this.state.faction)

    if (this.state.author === '*') parameters.delete('author')
    else parameters.set('author', this.state.author)

    if (this.state.including === null) parameters.delete('including')
    else parameters.set('including', this.state.including)

    this.props.history.replace('?' + parameters.toString())
  }

  updateCategory = category =>
    this.setState({ category, activePage: 0 }, this.updateURLParameters)
  updateFaction = faction =>
    this.setState({ faction, activePage: 0 }, this.updateURLParameters)
  updateAuthor = author =>
    this.setState({ author, activePage: 0 }, this.updateURLParameters)
  updateName = name =>
    this.setState(
      {
        name,
        category: '*',
        faction: '*',
        author: '*',
        including: null,
        activePage: 0,
      },
      this.updateURLParameters
    )
  updateIncluding = including =>
    this.setState({ including, activePage: 0 }, this.updateURLParameters)
  debouncedUpdateName = debounce(this.updateName, 500)

  matchesName = deck =>
    this.state.name === '' ||
    deck.name
      .toLowerCase()
      .replace('’', "'")
      .includes(this.state.name.toLowerCase())
  matchesFaction = deck =>
    this.state.faction === '*' || deck.faction === this.state.faction
  matchesCategory = deck =>
    this.state.category === '*' || deck.category === this.state.category
  matchesAuthor = deck =>
    this.state.author === '*' || deck.author === this.state.author
  matchesIncluding = deck =>
    !this.state.including ||
    deserialiseDeck(deck.id)
      .map(card => card.id)
      .includes(this.state.including)
  getDecks = () =>
    decks
      .filter(this.matchesFaction)
      .filter(this.matchesCategory)
      .filter(this.matchesAuthor)
      .filter(this.matchesName)
      .filter(this.matchesIncluding)
      .sort((a, b) => {
        if (a.faction > b.faction) return +1
        if (a.faction < b.faction) return -1
        if (a.name > b.name) return +1
        if (a.name < b.name) return -1
        return 0
      })

  resetFilters = () =>
    this.setState({
      faction: '*',
      category: '*',
      author: '*',
      name: '',
      including: null,
      activePage: 0,
    })

  render() {
    const decks = this.getDecks()
    const pages = chunk(decks, 10)
    const page = pages[this.state.activePage] || pages[0]

    return (
      <>
        <h1 className='visually-hidden'>Deck Suggestions</h1>

        <Row desktopOnly wideGutter>
          <Column width={33}>
            <Title>Filters</Title>

            <SuggestionsFilters
              {...this.state}
              updateCategory={this.updateCategory}
              updateFaction={this.updateFaction}
              updateAuthor={this.updateAuthor}
              updateName={this.debouncedUpdateName}
              updateIncluding={this.updateIncluding}
              resetFilters={this.resetFilters}
              formRef={this.formRef}
            />
          </Column>
          <Column width={66}>
            <Title>Decks</Title>
            {page ? (
              chunk(page, 2).map(([a, b]) => (
                <Row desktopOnly key={a.id}>
                  <Column>
                    <Suggestion
                      {...a}
                      onClick={card =>
                        this.props.history.push('/card/' + card.id + '/display')
                      }
                    />
                  </Column>
                  <Column>
                    {b ? (
                      <Suggestion
                        {...b}
                        onClick={card =>
                          this.props.history.push(
                            '/card/' + card.id + '/display'
                          )
                        }
                      />
                    ) : null}
                  </Column>
                </Row>
              ))
            ) : (
              <EmptySearch
                title='No Decks found'
                resetFilters={this.resetFilters}
              />
            )}

            <SuggestionsNav
              pages={pages}
              setActivePage={activePage => this.setState({ activePage })}
              activePage={this.state.activePage}
            />
          </Column>
        </Row>

        <PageMeta
          title='Deck Suggestions'
          description='Decks suggested by the Stormbound community.'
        />
      </>
    )
  }
}

export default hookIntoProps(() => ({
  history: useHistory(),
  location: useLocation(),
}))(DeckBuilderSuggestions)
