import React from 'react'
import Article from '../Article'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import Info from '../Info'
import Quest from '../Quest'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import { Coins, Rubies, Stones } from '../Resource'
import getInitialCardData from '../../helpers/getInitialCardData'

export default React.memo(function ChangelogJuly2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update July 2020'
      backLink={{ to: '/changelog', children: 'Back to changelog' }}
      readingTime='10 minutes'
      className='ChangelogJuly2020'
      background='/assets/images/environment_dragon.png'
      ratio='50%'
    >
      <p>
        Back in April, Paladin Studios announced they would hand over Stormbound
        to a Polish game development studio called Sheepyard. A few months
        later, Sheepyard is ready to ship their very first release, after a
        drought of about 8 months. I am very excited and honoured to be able to
        announce these changes in exclusivity!
      </p>

      <Title>Economy update</Title>

      <p>
        One thing Sheepyard has been quite adament to tackle is the somewhat
        awkward in-game economy. Their first attempt at taming the beast has
        been to revisit quests to restore some balance between the three
        currencies.
      </p>

      <ul>
        <li>
          Tier 1 quests will now grant <Coins amount={100} />.
        </li>
        <li>
          Tier 2 quests will now grant <Rubies amount={5} />.
        </li>
        <li>
          Tier 3 quests will now grant 1 or <Stones amount={2} />, depending on
          the quest.
        </li>
      </ul>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Quest
              difficulty={1}
              name='Student'
              description='Play 20 cards'
              currency='COINS'
              amount={100}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={2}
              name='Grand recruitment'
              description='Spawn 15 token units'
              currency='RUBIES'
              amount={5}
            />
          </Column>
          <Column width='1/3'>
            <Quest
              difficulty={3}
              name='Masterful Blueprint'
              description='Play 15 structure cards'
              currency='STONES'
              amount={2}
            />
          </Column>
        </Row>
      </div>

      <Info title='Rerolling quests'>
        <p>
          Quests can still be re-rolled once per day, but a quest tier 1 will
          always grant coins, a tier 2 quest will always grant rubies and a tier
          3 quest will always grant fusion stones.
        </p>
      </Info>

      <Title>A new legendary card</Title>

      <p>
        To celebrate their involvement in Stormbound, the Sheepyard studio
        wanted to mark the occasion with a brand new card in their effigy: a
        legendary pirate sheep!
      </p>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('N77')} />
      </div>

      <Title>Balance changes</Title>

      <p>
        Sheepyard took a close look at the current state of the “meta” — as the
        cool kids say — and went nuclear on its main competitors, putting down
        the nerf hammer on many cards, especially but not limited to elders.
      </p>

      <h3>Nerfs</h3>

      <ul>
        <li>
          <WikiLink id='N70' /> has its strength and its ability both decreased
          by 1.
        </li>
        <li>
          <WikiLink id='N74' /> cost 6 mana at all levels (up from 5).
        </li>
        <li>
          <WikiLink id='N76' /> has its strength decreased by 1 at all levels.
        </li>
        <li>
          <WikiLink id='F20' /> have their strengrh decreased by 2 at all
          levels.
        </li>
        <li>
          <WikiLink id='F28' /> have their strength decreased by 2 at all
          levels.
        </li>
        <li>
          <WikiLink id='S20' /> costs 7 mana at all levels (up from 6).
        </li>
        <li>
          <WikiLink id='S21' /> costs 7 mana at all levels (up from 6).
          Additionally, its ability is no longer able to play a card of rarity
          higher than rare.
        </li>
        <li>
          <WikiLink id='S28' /> have their strength decreased by 1 at all
          levels.
        </li>
        <li>
          <WikiLink id='W9' /> have their strength and ability described by 1 at
          all levels.
        </li>
        <li>
          <WikiLink id='W13' /> have their movement decreased by 1 at all
          levels.
        </li>
        <li>
          <WikiLink id='W19' /> costs 8 mana at all levels (up from 7).
        </li>
        <li>
          <WikiLink id='W27' /> have their strength decreased by 1 at all levels
          and regenerate 3, 3, 3 (down from 4), 4 (down from 5), 4 (down from
          6).
        </li>
      </ul>

      <h3>Buffs</h3>

      <ul>
        <li>
          <WikiLink id='N9' /> costs 3 mana at all levels (down from 4 at level
          1 to 3) and reduce strength to 5, 4, 3, 2 (down from 3) and 1.
        </li>
        <li>
          <WikiLink id='N21' /> does 1 more damage at all levels.
        </li>
        <li>
          <WikiLink id='N60' /> costs 5 mana at all levels (down from 6).
        </li>
      </ul>

      <h3>Confusion</h3>

      <p>
        On top of making <WikiLink id='N60' /> more accessible by decreasing
        their mana cost, Sheepyard has revisit the Confusion mechanic to make it
        more reliable.
      </p>
    </Article>
  )
})
