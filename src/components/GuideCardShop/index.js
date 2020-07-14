import React from 'react'
import { Link } from 'react-router-dom'
import Guide from '../Guide'
import Info from '../Info'
import { Rubies } from '../Resource'
import Title from '../Title'
import WikiLink from '../WikiLink'
import guides from '../../data/guides'
import './index.css'

const guide = guides.find(g => g.id === 'CARD_SHOP_GUIDE')

export default React.memo(function GuideCardShop(props) {
  return (
    <Guide {...guide}>
      <p>
        Buying cards in the shop is a bit less efficient than getting 3 random
        cards from a noble book, but can be a good way to forgo randomness and
        to get important cards to a higher level faster. This helps to prepare
        for the Diamond league and even Diamond 1 as early as possible.
      </p>

      <Info title='About resources'>
        For a complete guide on Stormbound resources, how to get them and how to
        make the most of them, please refer to the{' '}
        <Link to='/guides/resources'>dedicated resources guide</Link> by Roman.
      </Info>

      <Title id='cheap-core-cards'>Cheap Core Cards</Title>

      <blockquote>
        <p>
          “Not every game has a late game, but every game has an early game.”
        </p>
      </blockquote>

      <p>
        This old adage applies to Stormbound as well as anywhere. Your cards
        below 4 mana are your troopers, your opening gambit, the backbone upon
        which your strategy is built. In longer games, they are often played
        multiple times, so that 1 more strength can quickly add up over the
        course of a game. Definitely more than upgrading a more expensive unit.
      </p>

      <p>
        This is why it is important to level up cheap units as soon as possible.
        Getting cards to level 3 is fairly quick and should be done naturally by
        buying Noble books, but the stretches from 3 to 4 and from 4 to 5 are
        much larger. So if you want to speed this process up, starting from card
        level 3, buying one or two copies (if possible) is recommended for the
        following cards:
      </p>

      <ul>
        <li>
          <WikiLink id='N1' /> is an incredibly cheap mover which is why it is
          included in many a deck given how important movement is early game.
        </li>
        <li>
          <WikiLink id='N3' /> is also a cheap unit with movement without any
          penalty, which makes it an essential tool of most decks.
        </li>
        <li>
          <WikiLink id='N4' /> does not move but is cheap and robust, which is a
          good card to put units on the board.
        </li>
        <li>
          <WikiLink id='N16' /> is a little more expensive than the
          aforementioned cards but has decent strength and one movement, making
          it very efficient.
        </li>
        <li>
          <WikiLink id='N9' /> becomes invaluable at level 5 for a lot of
          non-rush decks against Elders.
        </li>
        <li>
          <WikiLink id='N63' />: this is a really powerful spell for a low cost,
          but there is a caveat because it doesn’t always have a target. For
          this reason it is better in decks that are capable of setting up
          scenarios where it gets value — for instance in rush decks to clear
          blockers, or to send the defending units of your opponent into their
          own base.
        </li>
      </ul>

      <Title id='faction-cards'>Faction Cards</Title>

      <p>
        Depending on your main faction, you might also want to consider the
        following cards.
      </p>

      <p>
        <span className='Highlight'>Swarm</span> tends to be used mainly for
        cheap and fast decks, so it only makes sense to invest mainly in these
        type of cards:
      </p>
      <ul>
        <li>
          <WikiLink id='N2' />
        </li>
        <li>
          <WikiLink id='S1' />
        </li>
        <li>
          <WikiLink id='S24' />
        </li>
        <li>
          <WikiLink id='S6' />
        </li>
        <li>
          <WikiLink id='N15' />
        </li>
      </ul>

      <p>
        <span className='Highlight'>Winter</span> on the other hand is very
        late-game oriented. Some common and rare cards might be worth investing
        into depending on what strategies you like, including:
      </p>
      <ul>
        <li>
          <WikiLink id='N14' />
        </li>
        <li>
          <WikiLink id='W9' />
        </li>
        <li>
          <WikiLink id='N13' />
        </li>
        <li>
          <WikiLink id='N47' />
        </li>
        <li>
          <WikiLink id='W27' />
        </li>
        <li>
          <WikiLink id='N44' />
        </li>
        <li>
          <WikiLink id='W17' />
        </li>
        <li>
          <WikiLink id='W21' />
        </li>
      </ul>

      <p>
        <span className='Highlight'>Shadowfen</span> is very versatile and can
        be played either rush or control, depending on opportunities and
        play-style:
      </p>
      <ul>
        <li>
          <WikiLink id='F4' />
        </li>
        <li>
          <WikiLink id='F3' />
        </li>
        <li>
          <WikiLink id='F7' />
        </li>
        <li>
          <WikiLink id='F25' />
        </li>
        <li>
          <WikiLink id='F14' /> (which is commonly considered the best 4-mana
          card in the game at level 5)
        </li>
      </ul>

      <p>
        <span className='Highlight'>Ironclad</span> relies a lot on its epic
        cards to shine, so there are not so many cards that are definitely worth
        purchasing when maining Ironclad:
      </p>
      <ul>
        <li>
          <WikiLink id='N2' />
        </li>
        <li>
          <WikiLink id='I1' />
        </li>
        <li>
          <WikiLink id='I7' />
        </li>
      </ul>

      <Title id='ruby-purchases'>Ruby Purchases</Title>

      <p>
        Now, rubies are a lot more rare than coins, so you should think twice
        about spending them on the shop where you only get a single epic card
        for <Rubies amount={20} />.
      </p>
      <p>
        In most cases, if you want epics, saving up to buy a Heroic or Mythic
        book is probably always the better investment. However, there are a few
        epic cards that are very good and spending rubies on them is not wrong
        per se. It might be different from player to player, depending on taste
        and play-style, and you definitely shouldn’t spread your rubies too thin
        among all of them. Like I said, books are better.
      </p>

      <p>
        <span className='Highlight'>Neutral</span>
      </p>
      <ul>
        <li>
          <WikiLink id='N67' /> is the cheapest neutral runner in the game and
          can also be used to stay static which is sometimes needed — making it
          ideal for rush decks, mainly Swarm or Shadowfen.
        </li>
        <li>
          <WikiLink id='N23' /> is a very cheap spell which can bring a lot of
          value and easily finds its place in control decks.
        </li>
        <li>
          <WikiLink id='N74' /> is a very strong neutral Elder with incredible
          strength at all level and offering solid board control.
        </li>
        <li>
          <WikiLink id='N34' /> tends to be mainly for Ironclad due to{' '}
          <WikiLink id='I2' /> but can be efficiently used in a variety of
          decks.
        </li>
        <li>
          <WikiLink id='N39' /> is a great defensive and offensive tool for all
          decks running structures.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Swarm</span>
      </p>
      <ul>
        <li>
          <WikiLink id='S2' /> is a cheap runner with a penalty that becomes
          more and more marginal as the base health increases, making it the
          perfect backbone of many rush decks.
        </li>
        <li>
          <WikiLink id='S11' /> is an often overlooked card but has become more
          popular thanks to its presence in the highly-competitive{' '}
          <Link to='/deck/3n13n23s13n33s243s23n633n673s63n153s83s11/detail'>
            Reckless Rush deck
          </Link>
          .
        </li>
        <li>
          <WikiLink id='S28' /> is a very valuable Elder, especially when
          combined with <WikiLink id='S21' /> for control decks.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Winter</span>
      </p>
      <ul>
        <li>
          <WikiLink id='W19' /> is the backbone of a larger number of Winter
          decks especially control and mana-ramp, literally granting free mana.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Ironclad</span>
      </p>
      <ul>
        <li>
          <WikiLink id='I8' /> is a cheap construct providing a lot of value for
          a relatively simple condition, making it a de factor part of many
          Ironclad decks.
        </li>
        <li>
          <WikiLink id='I28' /> is a strong Elder with incredible chip
          capabilities, giving a non-marginal edge in games lasting passed early
          game.
        </li>
      </ul>

      <p>
        <span className='Highlight'>Shadowfen</span>
      </p>
      <ul>
        <li>
          <WikiLink id='F8' /> is an incredibly cheap spell spawning a lot of
          units, opening a lot of combos with cards such as{' '}
          <WikiLink id='F23' />, <WikiLink id='F17' /> and <WikiLink id='N76' />
          .
        </li>
        <li>
          <WikiLink id='F28' /> is the only way for Shadowfen to do chip damage,
          and can be precisely controlled with self-harm and poisoning.
        </li>
      </ul>

      <p>
        At the end of the day, you have to figure out what you want from the
        game to know how to best spend your resources!
      </p>
    </Guide>
  )
})
