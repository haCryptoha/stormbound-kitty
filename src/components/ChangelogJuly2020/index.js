import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import BattleSimApp from '../BattleSimApp'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Checkbox from '../Checkbox'
import Column from '../Column'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Quest from '../Quest'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import { Coins, Rubies, Stones } from '../Resource'
import getInitialCardData from '../../helpers/getInitialCardData'
import './index.css'

export default React.memo(function ChangelogJuly2020(props) {
  const [withConfusionFix, setConfusionFix] = React.useState(true)

  React.useEffect(() => {
    const ODDS = [
      ['A3', '1\u20443', '4\u20449', 'middle'],
      ['B2', '1\u20443', '2\u20449', 'middle'],
      ['B4', '1\u20443', '3\u20449', 'middle'],
      ['D1', '1\u20443', '2\u20443', 'edge'],
      ['E2', '2\u20443', '1\u20443', 'edge'],
    ]

    ODDS.forEach(([cell, newOdd, oldOdd, position]) => {
      const container = document.querySelector(`[data-testid="cell-${cell}"]`)
      const odds = container.querySelector('.ChangelogJuly2020__odd')

      if (odds) {
        odds.innerText = withConfusionFix ? newOdd : oldOdd
      } else {
        const odds = document.createElement('span')
        odds.setAttribute('data-position', position)
        odds.innerText = withConfusionFix ? newOdd : oldOdd
        odds.setAttribute('class', 'ChangelogJuly2020__odd')
        container.appendChild(odds)
      }
    })
  }, [withConfusionFix])

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
        to a Polish game development studio called{' '}
        <a
          href='https://www.sheepyard.pl/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sheepyard
        </a>
        . A few months later, Sheepyard is ready to{' '}
        <u style={{ textDecoration: 'line-through', opacity: 0.5 }}>sheep</u>{' '}
        ship their very first release, after a drought of about 8 months. I am
        very excited and honoured to be able to announce these changes in
        exclusivity!
      </p>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#economy-update'>Economy update</a>
        </li>
        <li>
          <a href='#new-legendary-card'>New legendary card</a>
        </li>
        <li>
          <a href='#balance-changes'>Balance changes</a>
        </li>
        <li>
          <a href='#matchmaking-tweaks'>Matchmaking tweaks</a>
        </li>
        <li>
          <a href='#ui-improvements'>UI improvements</a>
        </li>
      </ul>

      <p>
        Following Paladin Studios’ advice, the update will hit the production
        servers some time early next week. From there, the new version of the
        application will be gradually rolled out to app stores and players are
        encouraged to update the game as soon as possible. A few days later, a
        forced update will be conducted to migrate the remaining players to the
        latest version of the app. Only after that will the{' '}
        <a href='#new-legendary-card'>new card and new pack offer</a> be
        available.
      </p>

      <Info icon='heart' title='Free rubies'>
        Anyone logging into the game during the 3 days following the update will
        be granted <Rubies amount={50} /> as a token of gratitude and to help
        with the fact that game development has been silent for so long.
      </Info>

      <Title id='economy-update'>Economy update</Title>

      <p>
        One thing Sheepyard has been quite adament to tackle is the somewhat
        awkward in-game economy, particularly the disparity between resources.
        Their first attempt at taming the beast has been to revisit quests to
        restore some balance between the three currencies.
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

      <p>
        Each quest can still be rerolled once per day, but a tier 1 quest will
        always grant coins, a tier 2 quest will always grant rubies and a tier 3
        quest will always grant fusion stones.
      </p>

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

      <Info title='Daily coin cap'>
        To compensate the fact that quests overall grant less coins than before,
        the daily coin cap has been increased to <Coins amount={400} /> (up from{' '}
        <Coins amount={250} />
        ).
      </Info>

      <Title id='new-legendary-card'>New legendary card</Title>

      <p>
        To celebrate their involvement in Stormbound, the Sheepyard studio
        wanted to mark the occasion with a brand new card in their effigy:{' '}
        <span className='Highlight'>Rogue Sheep</span>, a legendary pirate
        sheep! Meanwhile, Siren is crying in the corner seeing her hopes and
        dreams of becoming a pirate hero crushed.
      </p>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/2'>
            <h3 style={{ marginTop: 0 }}>Sketches & illustrations</h3>
            <img
              style={{ marginTop: 0 }}
              src='/assets/images/banner_rogue_sheep.png'
              alt='New Rogue Sheep card'
            />
          </Column>
          <Column width='1/2'>
            <h3 style={{ marginTop: 0 }}>In-game 3D model</h3>
            <video
              style={{ marginTop: 0 }}
              src='/assets/videos/sheep_hero.mp4'
              muted
              controls
            ></video>
          </Column>
        </Row>
      </div>

      <div className='Article__fullwidth'>
        <CardBuilderCardDisplay {...getInitialCardData('N77')} />
      </div>

      <p>
        <WikiLink id='N77' /> will be available shortly (in the upcoming days)
        through crafting and <Link to='/collection/books'>books</Link>.
        Additionally, it will be possible to buy a $10 limited edition pack
        containing Rogue Sheep and some resources. This one-time offer will only
        be available for a few days, so be sure to consider it!
      </p>
      <img
        style={{ marginTop: 0 }}
        src='https://i.gyazo.com/24207235577c36531a6e5d4af50cf6af.png'
        alt='Limited offer'
      />

      <Title id='balance-changes'>Balance changes</Title>

      <p>
        Sheepyard took a close look at the current state of the meta and went
        nuclear on its main assets, putting down the nerf hammer on many cards,
        especially but not limited to elders. This is only a first balance patch
        aiming at fixing the meta. It will be followed by over 30 card updates
        in the next release to balance things further.
      </p>
      <p>
        Overall, the idea appears to be to progressively decouple the meta from
        aggressively cheap decks, and to favor control over rush. It will
        probably take a few releases and adjustments before getting there.
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

      <Info icon='heart' title='Nerf compensation'>
        Like in the past, some compensation in the form of coins and/or fusion
        stones will be provided to owners of these nerfed cards, proportional to
        the amount of owned copies.
      </Info>

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
        their mana cost, Sheepyard has{' '}
        <u style={{ textDecoration: 'line-through', opacity: 0.5 }}>
          revisited
        </u>{' '}
        fixed the Confusion mechanic to make it more reliable.
      </p>

      <p>
        <span className='Highlight'>New mechanic</span>: If confused, a unit has
        ⅓ chance to move forward, ⅓ chance to move inwards and ⅓ chance to move
        outwards. If sitting on the edge of the board, the unit has ⅓ chance to
        move forward and ⅔ chance to move inwards.
      </p>

      <Info icon='sword' title='Existing implementation'>
        <p>
          While it might sound like it is how Confusion currently works, it
          turns out that it’s not at all how it worked until now despite popular
          belief.
        </p>
        <p>
          Currently, a confused unit has {'4\u20449'} chance (you read
          correctly) to go forward, ⅓ (or {'3\u20449'}) chance to go outwards
          and {'2\u20449'} chance to go inwards. When on the edge of the board,
          it has ⅔ chance to go forward and ⅓ chance to go inwards. No wonder we
          all thought it was broken.
        </p>
      </Info>

      <p>
        In the following situation, Westwind Sailors will now have a proper ⅓
        chance to go in any direction (but backwards). Similarly, Green
        Prototypes now have ⅓ chance to move forward, and ⅔ chance to move to
        the right side. That’s because they are sitting on the edge of the
        board, so the ⅓ chance to move to the left are effectively redistributed
        to the right side.
      </p>

      <div className='Article__fullwidth'>
        <Checkbox
          checked={withConfusionFix}
          onChange={event => setConfusionFix(event.target.checked)}
          name='confusion-fix'
          id='confusion-fix'
          className='ChangelogJuly2020__fix'
        >
          Apply the confusion fix
        </Checkbox>
        <BattleSimApp
          environment='winter'
          mode='DISPLAY'
          simId='MU42MlIxLCwsLCwsMU4xNkI1QywsLCwsLCwsLCwxTjFCMUMsLCw7UjEwTi1CMTBOOzNNMDs7'
        />
      </div>

      <p>
        Sheepyard also allowed me to announce that the next update will
        introduce two extra ways to induce confusion. They are planning on
        making confusion a mechanic to prolong games, essentially shifting the
        meta away from aggressively cheap decks. Note that the goal is not to
        make confusion the new freeze. It is only to provide a way to tempo
        games a little more.
      </p>

      <Title>Matchmaking tweaks</Title>

      <p>
        Stormbound has a long history of awkward matchmaking. In order to make
        it a little more fair, Sheepyard is introduced a base health upper limit
        based on the current league a player is in. The caps go as follow:
      </p>

      <ul>
        <li>
          <span style={{ color: '#c8c0df' }}>Diamond</span>: no cap (besides 20
          maximum health).
        </li>
        <li>
          <span style={{ color: '#c0e0cf' }}>Platinum</span>: health capped at
          17.
        </li>
        <li>
          <span style={{ color: '#f1e0be' }}>Gold</span>: health capped at 14.
        </li>
        <li>
          <span style={{ color: '#d6d9e2' }}>Silver</span>: health capped at 12.
        </li>
        <li>
          <span style={{ color: '#e2c3b7' }}>Bronze</span>: health capped at 11.
        </li>
        <li>
          <span style={{ color: '#d3d1cc' }}>Iron</span>: health capped at 10.
        </li>
      </ul>

      <p>
        Note that these upper limits on base health are not applied in Brawl
        mode whatsoever. Additionally, the CPU health has also been similarly
        adjusted when facing bots.
      </p>

      <Title id='ui-improvements'>UI improvements</Title>

      <div className='Article__fullwidth' style={{ '--padding': '0' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <p style={{ marginTop: '2em' }}>
              Sheepyard has already started to revisit old interfaces and is
              going to introduce{' '}
              <span className='Highlight'>many interface improvements</span> in
              this release, and even more so in the next one.
            </p>

            <p>
              Here, the base health — which is now named “
              <span className='Highlight'>Fortress Level</span>”. It comes with
              a handy dialog box giving more information, as well as the
              effective progression.
            </p>

            <p>
              Still no disclosure of the actual formula determine one’s Fortress
              Level based on progression, but things are changing fast so who
              knows?
            </p>

            <p>
              Another minor interface change not displayed in the joined images
              — amongst a lot more improvements across all interfaces — is a new
              icon for the “Friends” button to replace to current one.
            </p>
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/base_health_dialog.png'
              alt='Dialog disclosing information about the current base health'
            />
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/base_health_level.gif'
              alt='Animation of the base health increasing'
            />
          </Column>
        </Row>
      </div>

      <hr />

      <p>
        That’s it for this update, which is not trivial for the first one from
        Sheepyard. They already have the next update in the starting blocks,
        including but not limited to:
      </p>

      <ul>
        <li>
          As mentioned before, at least two new cards inducing confusion, thus
          helping making confusion-decks more competitive.
        </li>
        <li>
          A community tab within the game, with links to social media and
          Stormbound platforms.
        </li>
        <li>More options when it comes to friendly matches.</li>
      </ul>

      <PageMeta
        title='Update 07-2020'
        description='Discover everything there is to know about the first Stormbound update from the Sheepyard studio!'
        image='/assets/images/environment_dragon.png'
      />
    </Article>
  )
})
