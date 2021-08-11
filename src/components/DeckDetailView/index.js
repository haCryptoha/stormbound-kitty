import React from 'react'
import { useHistory } from 'react-router-dom'
import Advice from '../DeckAdvice'
import Page from '../Page'
import Deck from '../Deck'
import DeckStatsChart from '../DeckStatsChart'
import Info from '../Info'
import Link from '../Link'
import Row from '../Row'
import Stats from '../DeckStats'
import Title from '../Title'
import { NotificationContext } from '../NotificationProvider'
import { TAGS } from '../../constants/deck'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'
import modifyDeck from '../../helpers/modifyDeck'
import getDeckPresets from '../../helpers/getDeckPresets'
import isSuggestedDeck from '../../helpers/isSuggestedDeck'
import toSentence from '../../helpers/toSentence'
import useViewportSize from '../../hooks/useViewportSize'
import { BRAWL_INDEX } from '../../constants/brawl'

const getDefaultBrawlModifier = deck => {
  const presets = getDeckPresets(deck)

  return presets.modifier.includes('MANA') ? presets.modifier : 'NONE'
}

export default React.memo(function DeckDetailView(props) {
  const { viewportWidth } = useViewportSize()
  const { notify } = React.useContext(NotificationContext)
  const history = useHistory()
  const defaultModifier = getDefaultBrawlModifier(props.deck)
  const [modifier, setModifier] = React.useState(defaultModifier)
  const deck = React.useMemo(
    () => modifyDeck(props.deck, modifier),
    [modifier, props.deck]
  )
  const suggestedDeck = isSuggestedDeck(props.deck) || {}
  const sendNotification = React.useCallback(
    message => notify({ icon: 'stack', children: message }),
    [notify]
  )

  React.useEffect(() => {
    if (defaultModifier !== 'NONE') {
      const brawlLabel = BRAWL_INDEX[defaultModifier].label
      sendNotification(`Brawl deck found. Loaded with modifier ${brawlLabel}.`)
    }
  }, [defaultModifier, sendNotification])

  return (
    <Page
      title={suggestedDeck.name || 'Deck details'}
      {...getDeckBuilderMetaTags(props.deck, 'Deck Insights')}
      author={suggestedDeck.author}
      meta={
        suggestedDeck.tags
          ? toSentence(
              suggestedDeck.tags.map(tag => TAGS[tag] || tag),
              'and'
            )
          : undefined
      }
      action={{ to: '/deck/' + props.deckId, children: 'Edit deck' }}
    >
      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>Deck</Title>
          <Deck
            id='deck'
            deck={deck}
            orientation={viewportWidth >= 700 ? 'vertical' : 'horizontal'}
            highlightedCards={props.highlightedCards}
            onClick={card => history.push('/card/' + card.id + '/display')}
            onClickLabel='Open card in card builder'
          />
          {suggestedDeck.name === 'Reckless Rush' && (
            <Info icon='compass' title='Reckless Rush Guide'>
              <p>
                If you are interested in playing the Reckless Rush deck, be sure
                to read{' '}
                <Link to='/guides/reckless-rush'>the comprehensive guide</Link>.
              </p>
            </Info>
          )}
        </Row.Column>

        <Row.Column width='1/3'>
          <Stats deck={deck} highlight={props.highlight} />
          <DeckStatsChart
            deck={deck}
            modifier={modifier}
            setModifier={setModifier}
            withHowTo
            withModifiers
          />
        </Row.Column>

        <Row.Column width='1/3'>
          <Advice deck={deck} highlight={props.highlight} modifier={modifier} />
        </Row.Column>
      </Row>
    </Page>
  )
})
