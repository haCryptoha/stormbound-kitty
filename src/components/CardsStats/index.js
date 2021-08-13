import React from 'react'
import Link from '../Link'
import Page from '../Page'
import { CollectionContext } from '../CollectionProvider'
import ChartAbility from '../ChartAbility'
import ChartMana from '../ChartMana'
import ChartModifier from '../ChartModifier'
import ChartMovement from '../ChartMovement'
import ChartRarity from '../ChartRarity'
import ChartStrength from '../ChartStrength'
import ChartStrengthMana from '../ChartStrengthMana'
import ChartType from '../ChartType'
import Info from '../Info'
import Only from '../Only'
import Row from '../Row'
import Spacing from '../Spacing'

export default React.memo(function CardsStats() {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  return (
    <Page
      title='Cards Statistics'
      description='Enjoy insights and statistics about the state of the Stormbound card collection'
      action={
        hasDefaultCollection
          ? undefined
          : {
              to: '/collection/stats',
              children: 'Your statistics',
              icon: 'arrow-right',
            }
      }
      isEditorialContent
    >
      <Page.Narrow>
        <p>
          This is data visualisation about the current state of the Stormbound
          card collection. If you would like to suggest more data
          representations, please get in touch with me on Discord (Kitty#1909).
        </p>

        <Only.CustomCollection>
          <Info icon='books' title='Your collection'>
            <p>
              If you happen to be looking for data visualisation on{' '}
              <strong className='Highlight'>your</strong> card collection, head
              over to <Link to='/collection/stats'>the collection section</Link>
              .
            </p>
          </Info>
        </Only.CustomCollection>

        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartType />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartRarity />
            </Spacing>
          </Row.Column>
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartMovement />
            </Spacing>
          </Row.Column>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartAbility />
            </Spacing>
          </Row.Column>
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartModifier />
            </Spacing>
          </Row.Column>
          <Row.Column />
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartMana />
            </Spacing>
          </Row.Column>
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartStrength />
            </Spacing>
          </Row.Column>
        </Row>
        <Row desktopOnly>
          <Row.Column>
            <Spacing vertical='BASE'>
              <ChartStrengthMana />
            </Spacing>
          </Row.Column>
        </Row>
      </Page.Narrow>
    </Page>
  )
})
