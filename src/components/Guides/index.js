import React from 'react'
import { Link } from 'react-router-dom'
import Column from '../Column'
import GuideTeaser from '../GuideTeaser'
import HeaderBanner from '../HeaderBanner'
import Notice from '../Notice'
import Only from '../Only'
import PageMeta from '../PageMeta'
import Row from '../Row'
import guides from '../../data/guides'
import chunk from '../../helpers/chunk'

export default React.memo(function Guides(props) {
  return (
    <>
      <Only.Desktop>
        <HeaderBanner title='Guides' />
      </Only.Desktop>

      {chunk(
        guides.filter(guide => guide.id !== 'RESOURCES_GUIDE'),
        3
      ).map((row, index) => (
        <Row key={index} desktopOnly wideGutter>
          <Column width='1/3'>{row[0] && <GuideTeaser {...row[0]} />}</Column>
          <Column width='1/3'>{row[1] && <GuideTeaser {...row[1]} />}</Column>
          <Column width='1/3'>{row[2] && <GuideTeaser {...row[2]} />}</Column>
        </Row>
      ))}

      <Notice icon='compass'>
        Looking to teach others and guide them towards glorious battles?{' '}
        <Link to='/faq#adding-a-guide'>Have your own guide published</Link>.
      </Notice>

      <PageMeta
        title='Guides'
        description='Find guides from the community about Stormbound and improve your gameplay and knowledge about the game'
      />
    </>
  )
})
