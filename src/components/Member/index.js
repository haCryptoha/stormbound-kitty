import React from 'react'
import { useFela } from 'react-fela'
import Page from '~/components/Page'
import FeedItem from '~/components/FeedItem'
import Image from '~/components/Image'
import Info from '~/components/Info'
import MemberToC from '~/components/MemberToC'
import Row from '~/components/Row'
import isKATMember from '~/helpers/isKATMember'
import styles from './styles'

export default React.memo(function Member(props) {
  const { css } = useFela()
  const {
    memberId: id,
    channel,
    content,
    count,
    details,
    displayName,
    roles,
  } = props

  return (
    <Page
      title={displayName}
      description={`Find all of ${displayName}’s contributions to Stormbound-Kitty such as stories, decks, puzzles or guides.`}
      noIndex={count === 0 && !channel}
      action={{ to: '/members', children: 'Back to Members' }}
      meta={
        <>
          {count} contribution{count === 1 ? '' : 's'}
          {roles.isKAT ? (
            <>
              {' '}
              · {roles.isSuperKAT ? 'Super ' : null}
              <abbr title='Kitty Appreciation Team'>KAT</abbr> member
            </>
          ) : (
            ''
          )}
        </>
      }
      isEditorialContent
    >
      <Row isDesktopOnly withWideGutter>
        <Row.Column width='1/3'>
          <p>
            <span className='Highlight'>{displayName}</span> is a member of the
            Stormbound community. Their contribution can be found below.
          </p>

          <MemberToC {...details} />

          {details.donations.length > 0 && (
            <Info
              icon={roles.isSuperKAT ? 'super-star' : 'star'}
              title='Financial contributor'
            >
              <p>
                {displayName} is one of the generous contributors who can make
                Stormbound-Kitty a reality. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}

          {details.contributions.length > 0 && (
            <Info icon='hammer' title='Technical contributor'>
              <p>
                {displayName} is one of the skilled contributors who help make
                Stormbound-Kitty better every day. Thank you and welcome to the{' '}
                <abbr title='Kitty Appreciation Team'>KAT</abbr>!
              </p>
            </Info>
          )}
        </Row.Column>
        <Row.Column width='2/3'>
          {count > 0 || channel ? (
            <ul className={css(styles.feed)}>
              {channel && (
                <li className={css(styles.item)}>
                  <FeedItem {...channel} type='YOUTUBE' />
                </li>
              )}
              {content.map((entry, index) => (
                <li key={index} className={css(styles.item)}>
                  <FeedItem {...entry} date={new Date(entry.date)} user={id} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={css(styles.empty)}>
              <Image
                src='/assets/images/cards/sweetcap_kittens.png'
                extend={styles.image}
                withAvif
              />
              <p>
                No ‘{displayName}’ user could be found, or no content was
                associated to that user. If you believe this is a bug, please
                report it to Kitty#1909 on Discord.
              </p>
            </div>
          )}
        </Row.Column>
      </Row>
    </Page>
  )
})
