import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import Column from '../Column'
import FAQSection from '../FAQSection'
import PageMeta from '../PageMeta'
import { Coins, Rubies, Stones } from '../Resource'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import getInitialCardData from '../../helpers/getInitialCardData'
import './index.css'

const Rarity = ({ rarity, amount }) => (
  <>
    <img
      className='ChangelogOctober2020__rarity'
      src={`/assets/images/card/rarity-${rarity}.png`}
      alt=''
    />{' '}
    {amount} {rarity} card{amount === 1 ? '' : 's'}
  </>
)

const Legendary = ({ amount }) => <Rarity rarity='legendary' amount={amount} />
const Epic = ({ amount }) => <Rarity rarity='epic' amount={amount} />
const Rare = ({ amount }) => <Rarity rarity='rare' amount={amount} />
const Common = ({ amount }) => <Rarity rarity='common' amount={amount} />

export default React.memo(function ChangelogOctober2020(props) {
  return (
    <Article
      author='Kitty'
      title='Update 10-2020'
      backLink={{
        to: '/changelog/releases',
        children: 'Back to release notes',
      }}
      meta='2 minutes'
      className='ChangelogOctober2020'
      background='/assets/images/banners/factions.png'
      ratio='50%'
    >
      <p>
        The long awaited second update from Sheepyard is finally here, and it
        brings a lot of new things on the table. As always, I’m feeling very
        excited and honored to be able to announce the changes in exclusivity on
        the site.
      </p>

      <ul style={{ columns: '16em' }}>
        <li>
          <a href='#new-cards'>New cards</a>
        </li>
        <li>
          <a href='#balance-changes'>Balance changes</a>
        </li>
        <li>
          <a href='#friendly-matches-settings'>Friendly matches settings</a>
        </li>
        <li>
          <a href='#social-panel'>Social panel</a>
        </li>
        <li>
          <a href='#vanishing-packs'>Vanishing packs</a>
        </li>
        <li>
          <a href='#faq'>FAQ</a>
        </li>
      </ul>

      <Title id='new-cards'>New Cards</Title>

      <p>
        As <Link to='/changelog/07-2020'>announced back in July</Link>, this
        update introduces two new cards aiming at buffing the confusion
        mechanic: <WikiLink id='N78' /> (which will be available as soon as
        October 1st) and <WikiLink id='N79' /> (which will only be available
        later in October).
      </p>

      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N78')} />
      </Article.FullWidth>
      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N79')} />
      </Article.FullWidth>

      <p>
        Additionally, a new card{' '}
        <span className='Highlight'>from a new race</span> makes its entrance:
        Bisanu, an ancient card bringing a whole new mechanic into the
        landscape.
      </p>

      <Article.FullWidth>
        <CardBuilderCardDisplay {...getInitialCardData('N80')} />
      </Article.FullWidth>

      <Title id='balance-changes'>Balance Changes</Title>

      <p>
        Following on Sheepyard’s commitment to tweak some cards on a regular
        basis, this update is no exception and changes 12 cards, mostly to buff
        them.
      </p>

      <ul>
        <li>
          <WikiLink id='I2' />
          ’s ability now affects surrounding structures at level 2 instead of
          bordering only.
        </li>
        <li>
          <WikiLink id='I27' />’ strength is now 4/5/6/7/9 (from 3/4/5/6/7) but
          their ability remains the same.
        </li>
        <li>
          <WikiLink id='I28' /> no longer have initial movement (down from 1).
        </li>
        <li>
          <WikiLink id='N25' /> now have 1 movement (up from 0), and their
          ability affect surrounding structures instead of bordering only.
        </li>
        <li>
          <WikiLink id='N34' /> now attacks a second enemy for half the damage
          if its kills the first.
        </li>
        <li>
          <WikiLink id='N36' />’ ability now triggers when having at least 2
          surrounding enemies instead of bordering only.
        </li>
        <li>
          <WikiLink id='N40' /> now grants more strength to the main target
          (from 5/6/6/8/10 to 6/7/7/9/11).
        </li>
        <li>
          <WikiLink id='N49' /> now destroy bordering/surrounding units (based
          on level) instead of in front. They still spawn behind though.
        </li>
        <li>
          <WikiLink id='N61' />’ ability now triggers for a surrounding enemy
          instead of bordering only.
        </li>
        <li>
          <WikiLink id='N66' />’ mana cost is now 2 (down from 3) but their
          strength is now 1/2/3/4/5 (down from 3/4/5/6/7).
        </li>
        <li>
          <WikiLink id='N69' />
          ’s ability strength limit is increased by 1 (from 3/4/5/6/7 to
          4/5/6/7/8).
        </li>
        <li>
          <WikiLink id='S15' /> now affects enemy surrounding a friendly unit
          instead of bordering only.
        </li>
      </ul>

      <Title id='friendly-matches-settings'>Friendly matches settings</Title>

      <Article.FullWidth>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <p>
              It has been announced and snapshot a few times on Discord over the
              last few weeks so it’s no longer a surprise for many of you:
              advanced friendly matches are coming!
            </p>
            <p>
              When starting a friendly match with an in-game friend, it is now
              possible to:
            </p>
            <ul>
              <li>cap the level of cards (from 1 to 5)</li>
              <li>cap the fortress level (from 10 to 20)</li>
              <li>pick the starting mana (from 3 mana onwards)</li>
              <li>set up a turn timer</li>
              <li>apply Brawl modifiers</li>
            </ul>

            <p>
              Not all these settings are available to all players. They get
              unlocked as one progresses throughout the game.
            </p>
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/releases/friendly_matches_2.png'
              alt='A screenshot of the new advanced friendly matches options for a new player'
              style={{ marginTop: 0 }}
            />
          </Column>
          <Column width='1/3'>
            <img
              src='/assets/images/releases/friendly_matches_1.png'
              alt='A screenshot of the new advanced friendly matches options for a high-level player'
              style={{ marginTop: 0 }}
            />
          </Column>
        </Row>
      </Article.FullWidth>

      <Title id='social-panel'>Social panel</Title>

      <Row desktopOnly wideGutter>
        <Column>
          <p>
            The “social panel” has been hyped a few times on Discord over the
            last few weeks, and is a good testament of Sheepyard’s intents to
            grow the game and its community.
          </p>
          <p>
            It features Discord, Reddit, Stormbound-Kitty (needless to say I’m
            deeply honored to be featured in the game), the Stormbound Wiki (by
            FrozenEarth) and social networks (Facebook, Twitter and Instagram).
          </p>
          <p>
            Connecting with Stormbound on Facebook, Twitter and Instagram will
            grant <Rubies amount={10} /> for each, so <Rubies amount={30} />{' '}
            total. Not bad for just a few taps!
          </p>
        </Column>
        <Column>
          <img
            src='/assets/images/releases/social_panel.png'
            alt='New in-game social panel feature Discord, Reddit, Stormbound-Kitty, the wiki and social networks'
            style={{ marginTop: 0 }}
          />
        </Column>
      </Row>

      <Title id='vanishing-packs'>Vanishing Packs</Title>

      <Row desktopOnly wideGutter>
        <Column>
          <img
            src='/assets/images/releases/vanishing_packs.png'
            alt='A screenshot of the new tab dedicated to vanishing packs'
            style={{ marginTop: 0 }}
          />
        </Column>
        <Column>
          <p>
            For those of you who are not against putting a few Real-Life Coins™
            in the game every now and then, you will be pleased to know that
            there are now many more packs called{' '}
            <span className='Highlight'>vanishing packs</span>.
          </p>

          <p>
            Every day, every week, and every month, you will be offered one
            random resource pack and one random card pack (amongst the existing
            ones listed below).
          </p>

          <p>
            All daily packs cost $1.99, all weekly packs cost $9.99 and all
            monthly packs cost $29.99. These packs can be bought only once per
            period and are specific to your shop.
          </p>

          <p>
            Find below the exhaustive list of all the daily/weekly/monthly
            resource and card packs.
          </p>
        </Column>
      </Row>

      <Article.FullWidth padding='0'>
        <Row desktopOnly>
          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Daily resource packs ($1.99):</h3>
            <ul>
              <li>
                <Coins amount={400} />
              </li>
              <li>
                <Rubies amount={45} />
              </li>
              <li>
                <Stones amount={3} />
              </li>
              <li>
                <Coins amount={120} /> and <Rubies amount={30} />
              </li>
              <li>
                <Coins amount={160} /> and <Stones amount={2} />
              </li>
              <li>
                <Coins amount={100} />, <Rubies amount={20} /> and{' '}
                <Stones amount={1} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Weekly resource packs ($9.99):</h3>
            <ul>
              <li>
                <Coins amount={600} /> and <Rubies amount={150} />
              </li>
              <li>
                <Coins amount={800} /> and <Stones amount={10} />
              </li>
              <li>
                <Coins amount={500} />, <Rubies amount={100} /> and{' '}
                <Stones amount={5} />
              </li>
              <li>
                <Stones amount={15} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Monthyl resource packs ($29.99):</h3>
            <ul>
              <li>
                <Coins amount={3500} /> and <Rubies amount={400} />
              </li>
              <li>
                <Coins amount={5000} /> and <Stones amount={20} />
              </li>
              <li>
                <Coins amount={1500} />, <Rubies amount={250} /> and{' '}
                <Stones amount={30} />
              </li>
            </ul>
          </Column>
        </Row>
      </Article.FullWidth>

      <Article.FullWidth padding='0'>
        <Row desktopOnly>
          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Daily card packs ($1.99):</h3>
            <ul>
              <li>
                <Legendary amount={2} />
              </li>
              <li>
                <Epic amount={5} />
              </li>
              <li>
                <Rare amount={9} />
              </li>
              <li>
                <Common amount={18} />
              </li>
              <li>
                <Common amount={7} /> and <Rare amount={6} />
              </li>
              <li>
                <Common amount={2} />, <Rare amount={1} />, <Epic amount={1} />{' '}
                and <Legendary amount={15} />
              </li>
              <li>
                <Common amount={7} /> and <Legendary amount={1} />
              </li>
              <li>
                <Epic amount={2} /> and <Legendary amount={1} />
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Weekly card packs ($9.99):</h3>
            <ul>
              <li>
                <Common amount={35} /> and <Rare amount={30} />
              </li>
              <li>
                <Epic amount={10} /> and <Legendary amount={5} />
              </li>
              <li>
                <Common amount={10} />, <Rare amount={5} />, <Epic amount={5} />{' '}
                and 5 legendary cards
              </li>
            </ul>
          </Column>

          <Column width='1/3'>
            <h3 style={{ marginTop: 0 }}>Monthly card packs ($29.99):</h3>
            <ul>
              <li>
                <Common amount={105} /> and <Rare amount={90} />
              </li>
              <li>
                <Epic amount={30} /> and <Legendary amount={15} />
              </li>
              <li>
                <Common amount={30} />, <Rare amount={15} />,{' '}
                <Epic amount={15} /> and <Legendary amount={15} />
              </li>
            </ul>
          </Column>
        </Row>
      </Article.FullWidth>

      <FAQSection
        id='faq'
        title='FAQ'
        entries={[
          {
            id: 'release-date',
            question: 'When is the update going to be released?',
            answer:
              'The update should be released on October 1st, after which an immediate force update will be conducted so that all players download the new version from the Google Play Store and the App Store.',
          },
          {
            id: 'new-cards',
            question: 'When will the new cards be available in game?',
            answer: (
              <>
                <WikiLink id='N78' /> will be available as of October 1st,{' '}
                <WikiLink id='N79' /> will be released some time in October, and{' '}
                <WikiLink id='N80' /> not before November.
              </>
            ),
          },
          {
            id: 'trueshot-post',
            question: 'Why was Trueshot Post, of all structures, buffed?',
            answer:
              'As it turns out, this structure happens to have a relatively low win ratio. Moreover, it’s a neutral card so it will not weigh in a specific faction, and Execution is able to take it down at once.',
          },
        ]}
      />

      <PageMeta
        title='Update 10-2020'
        description='Discover everything there is to know about the second Sheepyard update!'
        image='/assets/images/banners/factions.png'
      />
    </Article>
  )
})
