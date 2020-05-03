import React from 'react'
import { EQUALS_TIER_LIST, TIER_COLORS } from '../../constants/list'
import Column from '../Column'
import PageMeta from '../PageMeta'
import Row from '../Row'
import ListBuilderTier from '../ListBuilderTier'
import ListBuilderToc from '../ListBuilderToc'
import Title from '../Title'
import getInitialListData from '../../helpers/getInitialListData'

export default React.memo(function ListBuilderDisplayView(props) {
  const id = EQUALS_TIER_LIST
  const tiers = getInitialListData(id)

  return (
    <>
      <h1 className='VisuallyHidden'>Equals Tier List</h1>
      <Row wideGutter desktopOnly>
        <Column width='1/3'>
          <Title element='h2'>Info</Title>

          <p>
            This tier list was made by HanooSt, a multiple-times winner of
            equal-levels tournaments. It is their take at ranking cards by
            efficiency in Equals mode. Your mileage may vary.
          </p>

          <ListBuilderToc tiers={tiers} />
        </Column>

        <Column width='2/3'>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <ListBuilderTier
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Column>
      </Row>

      <PageMeta
        title='Equals Tier List'
        description='Find a Tier List for ‘Equals Mode’ of all the Stormbound cards, ranked by effectiveness and popularity'
        author='HanooSt'
      />
    </>
  )
})
