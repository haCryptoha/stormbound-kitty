import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import CardLink from '../CardLink'
import CardBuilderCardDisplay from '../CardBuilderCardDisplay'
import CheapenedBrawl from '../CheapenedBrawl'
import FAQSection from '../FAQSection'
import Guide from '../Guide'
import Image from '../Image'
import Info from '../Info'
import NerfCompensationInfo from '../NerfCompensationInfo'
import ReleaseNotes from '../ReleaseNotes'
import Row from '../Row'
import { Coins, Rubies, Stones, Legendary } from '../Resource'
import ResourceIcon from '../ResourceIcon'
import Title from '../Title'
import getInitialCardData from '../../helpers/getInitialCardData'
import useViewportSize from '../../hooks/useViewportSize'
import './index.css'

export default React.memo(function ReleaseNotesAugust2021(props) {
  const { viewportWidth } = useViewportSize()
  const CardsContainer = viewportWidth >= 700 ? Guide.FullWidth : React.Fragment

  return (
    <ReleaseNotes id='08_2021'>
      <Article.Narrow>
        <p>
          Hello Stormbounders! A new version of Stormbound is coming early
          August, bringing balance changes, a new card, and some further Brawl
          developments!
        </p>

        <ol style={{ columns: '16em' }}>
          <li>
            <a href='#balance-changes'>Balance changes</a>
          </li>
          <li>
            <a href='#new-card'>New card</a>
          </li>
          <li>
            <a href='#brawl-bonuses'>Brawl bonuses</a>
          </li>
          <li>
            <a href='#cheapened-brawl'>Cheapened Brawl</a>
          </li>
          <li>
            <a href='#books-update'>Books update</a>
          </li>
          <li>
            <a href='#daily-check-in-redeeming'>Daily check-in redeeming</a>
          </li>
          <li>
            <a href='#faq'>FAQ</a>
          </li>
        </ol>

        <Info icon='heart' title='Important notice'>
          <p>
            While I have your attention, please remember the pandemic is not
            over, even if you have been vaccinated. You can still carry the
            disease and make people sick.
          </p>
          <p>
            So wear a mask and avoid unnecessary travels—especially if you live
            in an area with rampant COVID-19 cases. It takes everyone’s effort
            to slow down this pandemic. Do the right thing. 🙏
          </p>
        </Info>

        <Title id='balance-changes'>Balance changes</Title>

        <p>This release, like any other, brings some balance changes.</p>

        <ul>
          <li>
            <CardLink id='W29' />
            ’s ability now considers all friendly units (instead of surrounding
            only), but affects less units at all levels (from 2/3/4/5/6 to
            1/2/2/3/3). It also attemps to spawn a 1-strength copy of itself on
            the tile behind, like a tree expanding its roots. Additionally, its
            strength has been decreased by 1 (from 3/4/5/6/7 to 2/3/4/5/6).
          </li>

          <li>
            <CardLink id='N85' />
            ’s ability still triggers at the start of the turn but now grants
            (or removes if already present) fixedly forward movement to the
            leftmost unit in the hand, then destroys the weakest confused unit
            on the board.
          </li>

          <li>
            <CardLink id='S21' />’ strength is now 8/10/12/12/14 (up from
            6/8/10/10/12).
          </li>

          <li>
            <CardLink id='F20' />’ strength is now 5/6/7/8/10 (up from
            3/4/5/6/8).
          </li>

          <li>
            <CardLink id='N77' /> now costs 4 mana (down from 6) and its
            strength is now 3/4/5/6/7 (up from 2/3/4/5/7). Additionally, its
            ability is reworked from scratch. It now draws up to 1/1/2/2/3 card
            copies from the enemy’s hand, and reduces the mana cost of these
            copies by 1. Card copies can be cycled like normal cards but they
            are single-use. They do not go back into the deck once they’ve been
            played once.
          </li>
        </ul>

        <p>
          Quite uniquely, <CardLink id='N77' /> owners will be compensated with
          the usual rewards despite the card being reworked and overall buffed.
          We decided to do so because you’re effectively “losing” a card you
          might have invested your resources in.
        </p>

        <NerfCompensationInfo title='Compensation' ids={['N77']} />

        <Title id='new-card'>New card</Title>

        <p>
          Another temple card will come early August, the Temple of Time! As its
          name might suggest, it plays with the flow of the game, restoring
          friendly units and structures to the state from the previous turn.
        </p>
      </Article.Narrow>

      <Article.Embed>
        <CardBuilderCardDisplay {...getInitialCardData('F29')} />
      </Article.Embed>

      <Article.Narrow>
        <p>Here it is in action:</p>

        <iframe
          width='700'
          height='394'
          src='https://www.youtube-nocookie.com/embed/tac3eTGN7Ng?start=30'
          title='YouTube video player'
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          style={{ margin: '0 auto 2em' }}
        ></iframe>

        <p>
          As usual, there will be an exclusive pack to quickly get access to the
          new card, for a week after its release date. To celebrate Sheepyard’s
          first anniversary taking care of the game, there will also be a
          Sheepyard Pack available, as well as a Rogue Sheep pack.
        </p>

        <Guide.FullWidth padding='120px'>
          <Row desktopOnly wideGutter>
            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_sheepyard.png'
                alt='Sheepyard pack ($9.99): 1 random legendary card, 50 fusion stones, 100 rubies and 500 coins'
                withAvif
              />

              <p>
                It will be available between July 29th and August 1st at $9.99,
                and will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 random legendary card
                </li>
                <li>
                  <Coins amount={500} />
                </li>
                <li>
                  <Rubies amount={100} />
                </li>
                <li>
                  <Stones amount={50} />
                </li>
              </ul>
            </Row.Column>
            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_rogue_sheep.png'
                alt='Rogue Sheep pack ($9.99): 1 copy of Rogue Sheep, 5 fusion stones, 750 coins'
                withAvif
                style={{ transform: 'scale(1.03) translateY(-3%)' }}
              />

              <p>
                It will be available for a week from August 8th at $9.99, and
                will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 copy of{' '}
                  <CardLink id='N77' />
                </li>
                <li>
                  <Stones amount={5} />
                </li>
                <li>
                  <Coins amount={750} />
                </li>
              </ul>
            </Row.Column>

            <Row.Column width='1/3'>
              <Image
                src='/assets/images/releases/pack_temple_of_time.png'
                alt='Temple of Time ($9.99): 1 copy of Temple of Time, 5 fusion stones and 750 coins'
                withAvif
                style={{ transform: 'scale(1.07)' }}
              />
              <p>
                It will be available for a week from August 15th at $9.99, and
                will grant the following :{' '}
              </p>

              <ul>
                <li>
                  <ResourceIcon resource='LEGENDARY' /> 1 copy of{' '}
                  <CardLink id='F29' />
                </li>
                <li>
                  <Stones amount={5} />
                </li>
                <li>
                  <Coins amount={750} />
                </li>
              </ul>
            </Row.Column>
          </Row>
        </Guide.FullWidth>

        <Title id='brawl-bonuses'>Brawl bonuses</Title>

        <p>
          The second part of the new heart system will be introduced in late
          July in the form of Brawl winning bonuses.
        </p>

        <Row desktopOnly>
          <Row.Column>
            <p>
              The idea is that after{' '}
              <span className='Highlight'>every victory</span> in Brawl, the
              player will be offered one of two random bonuses, amongst a set of
              9 different possible bonuses (see the complete list below). Some
              of them will provide resources while some will improve the
              player’s livelihood in Brawl by redeeming and refilling hearts.
            </p>
            <p>
              A player begins a Brawl adventure in the selected tier with 3 full
              green hearts (just like it is right now). When losing a match, a
              player loses one heart (it gets emptied and red). If all hearts
              are lost, then the player’s crowns get reset to the beginning of
              the current milestone.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              style={{ marginTop: 0 }}
              src='/assets/images/releases/brawl_bonuses_choice.jpg'
              alt=''
            />
          </Row.Column>
        </Row>

        <CardsContainer>
          <div className='ReleaseNotesAugust2021__cards'>
            <Image
              src='/assets/images/iconography/brawl_LIFE_UP.png'
              alt='Life up bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_ALL_LIVES_UP.png'
              alt='All lives up'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_RUSTY_SLOT.png'
              alt='Rusty slot bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_GOLD_SLOT.png'
              alt='Gold slot bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_ICE_ARMOR.png'
              alt='Ice armor bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_FORTRESS_LEVEL.png'
              alt='Fortress level bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_COINS.png'
              alt='Coins bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_RUBIES.png'
              alt='Rubies bonus'
              className='ReleaseNotesAugust2021__card'
            />
            <Image
              src='/assets/images/iconography/brawl_FUSION_STONES.png'
              alt='Fusion stones bonus'
              className='ReleaseNotesAugust2021__card'
            />
          </div>
        </CardsContainer>

        <p>Here is the breakdown of every victory bonus:</p>

        <ul>
          <li>
            <span className='Highlight'>Life/Lives Up bonuses:</span> Picking
            these bonuses will refill a heart (or all hearts), giving the player
            extra chances to climb the milestones without being reset to the
            start of the current milestone.
          </li>
          <li>
            <span className='Highlight'>Rusty Slot:</span> Picking this bonus
            will grant the player an extra heart slot (up to 5 heart slots in
            total). Once the player loses a life from this slot, the slots
            destroys itself. It also destroys itself on milestone reset.
          </li>
          <li>
            <span className='Highlight'>Solidify:</span> Picking this bonus will
            make one of the player’s rusty slots indestructible. From there on,
            it behaves like one of three default slots.
          </li>
          <li>
            <span className='Highlight'>Ice Armor:</span> Picking this bonus
            will give an Ice Armor to the first full heart. After a loss, the
            Ice Armor gets destroyed while keeping the heart beneath it intact.
          </li>
          <li>
            <span className='Highlight'>Fortress Up bonus:</span> Picking this
            bonus will increase the Fortress Level of the player by 1 within the
            current Brawl difficulty and only for Brawl matches. It will not
            increase the Fortress Level beyond the cap for that Brawl. This
            bonus cannot be drawn if already capped.
          </li>
          <li>
            <span className='Highlight'>Resources bonuses:</span> Picking these
            bonuses will immediately grant the player a certain amount of
            resources, varying based on the Brawl difficulty and milestone.
            <ul>
              <li>
                The Coins bonus can be obtained from the very first milestone
                onwards. Its rewards can go up to <Coins amount={100} /> in
                Casual, <Coins amount={250} /> in Warrior and{' '}
                <Coins amount={500} /> in Ultimate.
              </li>
              <li>
                The Rubies bonus can be obtained from milestone 3 onwards and
                can go up to <Rubies amount={25} /> in Casual,{' '}
                <Rubies amount={50} /> in Warrior and <Rubies amount={100} /> in
                Ultimate.
              </li>
              <li>
                The Fusion Stones can be obtained from milestone 5 onwards and
                bonus can go up to <Stones amount={3} /> in Casual,{' '}
                <Stones amount={10} /> in Warrior and <Stones amount={25} /> in
                Ultimate.
              </li>
            </ul>
          </li>
        </ul>

        <Info icon='hammer' title='Brawl tracker'>
          <p>
            The <Link to='/brawl'>Brawl tracker</Link> has been updated to take
            these bonuses into account. You can now record which bonus you
            picked with every victory, and the loss counter will reflect that.
          </p>
        </Info>

        <CheapenedBrawl ratio={0.9}>
          <p>
            Similar to previous events, the Brawl starting on July 29th (and
            only that one) is going to be cheaper. All fights will be 10% off.
            Owners of the Premium Pass will also have their usual discount
            applied, leading to a 20% reduction.
          </p>

          <Info icon='gift' title='Compensation'>
            <p>
              Additionally, to apologize for the recent sub-par experience with
              the Brawl, every player logging at least once into the game before
              the end of 29th of July will be rewarded with{' '}
              <Coins amount={500} />.
            </p>
          </Info>
        </CheapenedBrawl>

        <Title id='books-update'>Books update</Title>

        <p>
          Four new books will be introduced, all available to buy with rubies as
          usual. We hope they help players sharpening their collection!
        </p>

        <ul>
          <li>
            The new <span className='Highlight'>Book of Magic</span> costs{' '}
            <Rubies amount={40} /> and contains 3 spells with rarity odds being
            50/30/20/0.
          </li>
          <li>
            The new <span className='Highlight'>Book of Structures</span> costs{' '}
            <Rubies amount={40} /> and contains 3 structures with rarity odds
            being 50/30/15/5.
          </li>
          <li>
            The new <span className='Highlight'>Book of Chaos</span> costs{' '}
            <Rubies amount={50} /> and contains 3 cards with the word “random”
            (or its localized equivalent) in their ability with rarity odds
            being 25/25/25/25.
          </li>
          <li>
            The new <span className='Highlight'>Book of Legends</span> costs{' '}
            <Rubies amount={120} /> and contains <Legendary amount={3} />.
          </li>
        </ul>

        <Row>
          <Row.Column width='1/4'>
            <Image
              src='/assets/images/books/book-magic.png'
              alt='Book of Magic'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src='/assets/images/books/book-structure.png'
              alt='Book of Structures'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src='/assets/images/books/book-chaos.png'
              alt='Book of Chaos'
            />
          </Row.Column>
          <Row.Column width='1/4'>
            <Image
              src='/assets/images/books/book-legends.png'
              alt='Book of Legends'
            />
          </Row.Column>
        </Row>

        <p>
          On top of that, some existing books will be updated to be more
          interesting:
        </p>

        <ul>
          <li>
            The <span className='Highlight'>Book of Archdragons</span> now costs{' '}
            <Rubies amount={90} /> (down from <Rubies amount={120} />
            ).
          </li>
          <li>
            The <span className='Highlight'>Book of Dragons</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 20/60/15/5 (improved from 20/60/20/0).
          </li>
          <li>
            The <span className='Highlight'>Book of Elders</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 0/60/35/5 (improved from 0/67/30/3).
          </li>
          <li>
            The <span className='Highlight'>Book of Pirates</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />) and its
            rarity odds are now 50/30/15/5 (improved from 55/25/15/5).
          </li>
          <li>
            The <span className='Highlight'>Book of Felines</span> now costs{' '}
            <Rubies amount={40} /> (down from <Rubies amount={60} />
            ).
          </li>
        </ul>

        <Title id='daily-check-in-redeeming'>Daily check-in redeeming</Title>

        <Row desktopOnly wideGutter>
          <Row.Column>
            <p>
              We are introducing a way to redeem some skipped days from the
              daily check-in calendar for both Premium and non-Premium users.
              Every day, you’ll be able to redeem a skipped day reward by
              watching an ad.
            </p>
            <p>
              We hope this will help players with a more sporadic involvement
              with the game to still get all the rewards they need to progress.
            </p>
          </Row.Column>
          <Row.Column>
            <Image
              style={{ marginTop: 0 }}
              src='/assets/images/releases/check_in_redeem.jpg'
              alt='Dialog window inviting the user to redeem a day from the daily check-in calendar or buy the Premium Pass'
            />
          </Row.Column>
        </Row>

        <FAQSection
          id='faq'
          title='FAQ'
          entries={[
            {
              id: 'release-date',
              question: 'When is the update going to be released?',
              answer: (
                <>
                  The balance changes will be deployed with the season reset as
                  usual along with the compensation for Rogue Sheep. The changes
                  to the Brawl will come live on the 29th of July, with the
                  10%-discounted Brawl. Temple of Time will be available from
                  August 15th along with its promotional pack (for a week).
                </>
              ),
            },
          ]}
        />
      </Article.Narrow>
    </ReleaseNotes>
  )
})
