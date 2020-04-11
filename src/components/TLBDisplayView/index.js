import React, { Fragment } from 'react'
import { useRouteMatch } from 'react-router-dom'
import TierList from '../TierList'
import Title from '../Title'
import Row from '../Row'
import Column from '../Column'
import CTA from '../CTA'
import ShareButton from '../TLBShareButton'
import PageMeta from '../PageMeta'
import { TIER_COLORS } from '../../constants/list'
import getInitialListData from '../../helpers/getInitialListData'

const TLBDisplayView = props => {
  const match = useRouteMatch()
  const id = match.params.listId
  const tiers = getInitialListData(id)

  return (
    <Fragment>
      <Row wideGutter desktopOnly>
        <Column width={33}>
          <Title element='h2'>Settings</Title>

          <p className='TLBApp__intro'>
            This tier list editor makes it possible to create up to 10 tiers of
            cards. It is currently very much in active development so make sure
            to report any bug, oddity or desired features.
          </p>

          <div className='TLBApp__buttons'>
            <Row>
              <Column>
                <CTA to={`/list/${id}`}>Edit list</CTA>
              </Column>
              <Column>
                <ShareButton title='Share tier list' />
              </Column>
            </Row>
          </div>
        </Column>
        <Column width={66}>
          <Title>Tier list</Title>

          {tiers.map((tier, index) => (
            <TierList
              {...tier}
              color={TIER_COLORS[index]}
              key={index}
              prefix={`tier-${index}-`}
              isEditable={false}
            />
          ))}
        </Column>
      </Row>

      <PageMeta title='Tier List Display' />
    </Fragment>
  )
}

export default TLBDisplayView
