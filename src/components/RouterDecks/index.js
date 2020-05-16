import React from 'react'
import { Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Page from '../Page'
import PersonalDecksProvider from '../PersonalDecksProvider'
import load from '../../helpers/load'

const DeckSuggestions = load('DeckSuggestions')
const DeckBuilderRoot = load('DeckBuilderRoot')
const DeckDetailView = load('DeckDetailView')
const DeckDryRunView = load('DeckDryRunView')
const DeckEditorView = load('DeckEditorView')
const DeckCollection = load('DeckCollection')

export default function RouterDecks() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Page path={`${path}/suggestions`} active={['DECKS', 'SUGGESTIONS']}>
        <PersonalDecksProvider>
          <DeckSuggestions />
        </PersonalDecksProvider>
      </Page>
      <Page path={`${path}/collection`} active={['DECKS', 'COLLECTION']}>
        <PersonalDecksProvider>
          <DeckCollection />
        </PersonalDecksProvider>
      </Page>

      {/* Maintain old URL for backward compatibility */}
      <Redirect path={`${path}/yours`} to={`${path}/collection`} />

      <Page path={`${path}/:deckId/detail`} active={['DECKS', 'DETAIL']}>
        <DeckBuilderRoot>
          {state => <DeckDetailView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId/dry-run`} active={['DECKS', 'DRY_RUN']}>
        <DeckBuilderRoot>
          {state => <DeckDryRunView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={`${path}/:deckId`} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
      <Page path={path} active={['DECKS', 'EDITOR']}>
        <DeckBuilderRoot>
          {state => <DeckEditorView {...state} />}
        </DeckBuilderRoot>
      </Page>
    </Switch>
  )
}
