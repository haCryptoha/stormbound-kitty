import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { TIER_COLORS, MAX_TIERS } from '../../constants/list'
import Article from '../Article'
import CTA from '../CTA'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ShareButton from '../ListBuilderShareButton'
import ListBuilderTier from '../ListBuilderTier'
import ListBuilderToc from '../ListBuilderToc'
import Title from '../Title'
import getInitialListData from '../../helpers/getInitialListData'

export default React.memo(function ListBuilderDisplayView(props) {
  const match = useRouteMatch()
  const id = match.params.listId
  const tiers = getInitialListData(id)

  return (
    <Article
      title='List builder'
      action={{
        to: `/list/${id}`,
        children: 'Edit list',
      }}
      smallFontSize
    >
      <Row wideGutter desktopOnly>
        <Row.Column width='1/3'>
          <Title style={{ marginTop: 0 }}>Information</Title>

          <p>
            This tier list editor makes it possible to create up to {MAX_TIERS}{' '}
            tiers of cards. It is currently very much in active development so
            make sure to report any bug, oddity or desired features.
          </p>

          <ListBuilderToc tiers={tiers} />

          <Row>
            <Row.Column>
              <CTA to={`/list/${id}`}>Edit list</CTA>
            </Row.Column>
            <Row.Column>
              <ShareButton title='Share tier list' />
            </Row.Column>
          </Row>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title style={{ marginTop: 0 }}>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Row.Column>
      </Row>

      <PageMeta
        title='Tier List Builder'
        description='Compose your own tier lists from the Stormbound cards, ranking them the way you see fit'
      />
    </Article>
  )
})
