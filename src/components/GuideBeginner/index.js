import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import Guide from '../Guide'
import Title from '../Title'
import WikiLink from '../WikiLink'
import guides from '../../data/guides'
import './index.css'

const guide = guides.find(g => g.id === 'BEGINNER_GUIDE')

export default React.memo(function GuideBeginner(props) {
  return (
    <Guide {...guide}>
      <p>
        In this straightforward guide, we will cover the basics of the game such
        what are the different abilities, as well as all the little pieces of
        trivia you need to know to be effective on the battlefield.
      </p>

      <Title>Understanding the board</Title>

      <p>
        When placing a unit with at least 1 movement on the board, it resolves
        its direction following this pattern:
      </p>

      <ol>
        <li>If there is an enemy in the cell in front, attack it.</li>
        <li>
          Otherwise, if there is an enemy in the inner cell (right column when
          on the left side of the board, left column when on the right side of
          the board), attack it.
        </li>
        <li>
          Otherwise, if there is an enemy outer cell (left column when on the
          left side of the board, right column when on the right side of the
          board), attack it.
        </li>
        <li>Otherwise move forward.</li>
      </ol>

      <p>
        This also applies to units with higher speed, which will never attack
        sideways into a tile unless there’s an enemy in it.
      </p>

      <p>
        Units move their respective speed value (which is the number of tiles
        they move) on their first turn. Every other movement the unit makes will
        be 1 tile.
      </p>

      <p>
        Units attacking a base always die right after the damage is done to the
        base, which triggers their “on death” effects immediately after, unless
        they destroy the base in which case the game is obviously over.
      </p>

      <p>
        The term “<span className='Highlight'>bordering tiles</span>” refers to
        the four tiles in front, behind, to the left, and right. The term “
        <span className='Highlight'>surrounding tiles</span>” refers to the
        bordering tiles plus the corner tiles, effectively the 8 tiles around.
      </p>

      <p>
        “<span className='Highlight'>In front</span>” of a unit means in the
        same column as the target unit, “most forward” (e.g.{' '}
        <WikiLink id='N34' />) picks randomly between the enemy units that have
        been placed or have advanced the furthest (even ahead of the Post
        itself). For cards like <WikiLink id='F12' /> and <WikiLink id='N59' />{' '}
        that refer to the “tile in front” of an enemy unit, that means the tile
        the unit will attack/move into during the enemy’s next turn.
      </p>

      <p>
        The bases do not count as structures. That being said, when a card
        ability states “<span className='Highlight'>enemy</span>” without
        precising “unit” or “structure” — like <WikiLink id='I19' /> or{' '}
        <WikiLink id='S15' /> — the enemy base counts as an enemy and it enables
        these cards to do direct damage to the base. This mechanism is heavily
        used in some decks, preferring damaging the base without actually
        passing units through (called “chip”).
      </p>

      <Title>Cards and decks</Title>

      <p>
        <Link to='/deck/suggestions'>Decks</Link> can be made with cards from
        the Neutral faction and also one of the others (Shadowfen, Ironclad,
        Winter, Swarm).
      </p>

      <p>
        Every unit belongs to a <em>race</em> and can also be an Elder or a Hero
        (
        <WikiLink id='N76' /> is the only Elder Hero but there is an Undead
        Hero, Frostling Elder, and so on).
      </p>

      <p>
        Unit races are relevant in some situations if you plan to use cards like{' '}
        <WikiLink id='N40' /> or <WikiLink id='N35' />. Note that both Elder and
        Hero count as unit races, so if Ubass the Hunter was to be played next
        to Prime Oracle Bragda, his ability would trigger twice (since Bradga is
        both a Hero and an Elder).
      </p>

      <p>
        Token units can be identified by their name as it will always start with
        the word “Token”. They have no level, 1 movement, and cost 0 mana. This
        is relevant for cards like <WikiLink id='N38' /> and{' '}
        <WikiLink id='N8' /> — if Harvesters of Souls attack an enemy token
        unit, they’ll put one in your deck with 0 mana cost. The strength of
        token units varies with the level of Harvesters of Souls and Collector
        Mirz.
      </p>

      <p>
        Token units and Qordia’s Eggs can’t be included in your deck, only
        summoned by other units.
      </p>

      <Title>Triggers</Title>

      <p>There are four triggers of unit effects:</p>
      <ul>
        <li>
          <strong className='Highlight'>On play</strong> — when they’re first
          placed down.
        </li>
        <li>
          <strong className='Highlight'>On attack</strong> — shown by two swords
          above the unit.
          <ul>
            <li>
              When attacking: includes cards like <WikiLink id='W5' /> and{' '}
              <WikiLink id='N18' />, which means the ability triggers before it
              attacks.
            </li>
            <li>
              After attacking: cards like <WikiLink id='I16' />.
            </li>
          </ul>
        </li>
        <li>
          <strong className='Highlight'>On death</strong> — shown by a skull
          above the unit e.g. <WikiLink id='I12' /> deals damage to a random
          bordering enemy on death — the potential enemies are on tiles
          bordering the tile where it died. Units that die when attacking die on
          the previous tile, not the tile they attacked.
        </li>
        <li>
          <strong className='Highlight'>When surviving damage</strong> — only
          Elders have these abilities. They can trigger at any time, including
          during your turn, when they take any type of damage without dying.
          This includes during the enemy’s turn either through enemy units
          attacking the Elder or through Force Attack (see below).
        </li>
      </ul>

      <p>
        Structure abilities (“at the start of your turn…”) will trigger before
        any units move, and they’ll trigger from back to front and left to right
        (even if they’re triggered by <WikiLink id='I2' />
        ), and units move in the same order.
      </p>

      <img
        className='GuideBeginner__image'
        src='/assets/images/guide_ozone_purifiers.png'
        alt='Ozone Purifiers pushing the front unit instead of the side one which is blocked between Ozone Purifiers and the edge and thus cannot move'
      />

      <p>
        Cards always choose from valid options. For instance, in this image, the{' '}
        <WikiLink id='I4' /> wouldn’t have pushed away the unit in the bottom
        left since it was unable to be pushed. The only valid option was the
        Satyr in front.
      </p>

      <p>
        When there’s a tie (<WikiLink id='F9' /> deals x damage to the strongest
        enemy unit, and there’s two with the same strength for example) the game
        picks randomly.
      </p>

      <Title>Status Effects</Title>
      <ul>
        <li>
          Structures are effectively immune to all status effects but can still
          take damage.
        </li>
        <li>
          <strong className='Highlight'>Poison</strong>: units lose 1 health per
          turn. Lasts until the unit dies.
        </li>
        <li>
          <strong className='Highlight'>Confusion</strong>: units have a 33%
          chance to move forward, left, or right (50% chance to move forward or
          left/right if the unit is in an edge column) and will attack friendly
          units or structures if they’re in the target tile. Lasts until the
          unit moves or attacks left or right (if it moves forward normally, the
          unit remains confused).
        </li>
        <li>
          <strong className='Highlight'>Freeze</strong>: units don’t move at the
          start of their owner’s next turn. Lasts until the owner’s next turn
          starts, so frozen units can still be commanded forward during the next
          turn.
        </li>
      </ul>

      <Title>Special abilities</Title>

      <p>
        <strong className='Highlight'>Conversion</strong>: the unit now fights
        for the enemy and starts going the opposite direction as it was
        previously going.
      </p>

      <p>
        <strong className='Highlight'>Pushing/pulling</strong>: the unit will be
        moved along a row or column (depending on what is doing the pushing and
        where it was placed) and stops when it hits a base, unit, or structure.
        Damage, if any is done, happens after the unit is pushed (so for
        example, <WikiLink id='S8' /> will spawn a satyr on a random tile
        bordering its new position, not the old one, when it dies).
      </p>

      <p>
        Push back/forward (
        <WikiLink id='I18' />, <WikiLink id='I9' />) means towards the enemy
        base. “Push away” (<WikiLink id='I4' />) means away from the unit with
        the ability (so it can be pushed in any column or row in any direction).
      </p>

      <p>
        Pull (<WikiLink id='I23' />) means towards the unit with the ability, in
        any direction. Note: Armed Schemers will only pull units in the same row
        or column as itself.
      </p>

      <p>
        <strong className='Highlight'>Draining health</strong>: Cards like{' '}
        <WikiLink id='F16' /> remove x health from the target unit and add x
        health to themselves. <WikiLink id='F28' /> drains health similarly,
        from the enemy base.
      </p>

      <p>
        <strong className='Highlight'>Destroying units</strong>: Cards like{' '}
        <WikiLink id='F23' /> and <WikiLink id='N17' /> destroy specific units
        by doing damage equal to their current health, pretty self-explanatory.
        This of course does not trigger elder abilities as the target units do
        not survive.
      </p>

      <p>
        <strong className='Highlight'>Gain mana</strong>: A Winter
        Pact-exclusive mechanic, the card gives its owner a certain amount of
        mana when a condition is met. For <WikiLink id='W12' />, the card is
        played and then the player is given back 3 of the 5 mana. This does not
        mean the card costs 2 mana as it cannot be played until mana 5.
        <WikiLink id='W16' /> can be made to attack on an enemy turn (see Force
        Attack below), and when this happens, the mana is given to the owner of
        the card during the enemy’s turn, and is able to be used by the owner
        when their turn begins.
      </p>

      <p>
        <strong className='Highlight'>Commanding forward</strong>: Cards like
        <WikiLink id='S20' /> and <WikiLink id='S6' /> can make friendly units
        move during your turn when they (the commanding cards, not the targets)
        are played.
      </p>

      <p>
        <strong className='Highlight'>Spawn other units</strong>: Cards that
        “randomly spawn” units or structures and don’t specify a location do so
        only inside your frontline and can’t advance your frontline, like{' '}
        <WikiLink id='F8' />, <WikiLink id='N2' />, <WikiLink id='N46' />. Other
        cards can advance it, and these include <WikiLink id='S16' />,{' '}
        <WikiLink id='S1' />, <WikiLink id='F23' />, <WikiLink id='F11' />, and{' '}
        <WikiLink id='W13' />.
      </p>

      <p>
        <strong className='Highlight'>Fly forward</strong>:{' '}
        <WikiLink id='I17' />
        and <WikiLink id='S19' />, can pass over friendly and enemy units and
        structures depending on where they’re played.
      </p>

      <p>
        <strong className='Highlight'>Reduce a unit’s strength</strong>:{' '}
        <WikiLink id='N58' /> and <WikiLink id='N9' /> damage don’t trigger
        elder abilities.
      </p>

      <p>
        <strong className='Highlight'>Jumping</strong>: <WikiLink id='F12' />{' '}
        moves to the tile in front of a random enemy unit or structure after
        attacking.
      </p>

      <p>
        <strong className='Highlight'>Force attack</strong>:{' '}
        <WikiLink id='N63' />
        and <WikiLink id='N61' /> force a target unit to attack a random
        bordering enemy, which can be behind them (and therefore can be the
        enemy base). <WikiLink id='N69' /> has a similar ability. This triggers
        any “on attack” abilities the target unit may have.
      </p>
      <p>
        <strong className='Highlight'>Area of Effect (AoE) damage</strong>:
        mostly applies to spells like <WikiLink id='I18' />,{' '}
        <WikiLink id='F4' />, <WikiLink id='W11' />, and some units like{' '}
        <WikiLink id='N47' /> and <WikiLink id='F5' />. Damage is done to all
        units at once, so if all the affected units die, certain on-death
        effects like that of <WikiLink id='N1' /> will not trigger (depending on
        the situation).
      </p>

      <Title>Card manipulation</Title>

      <p>
        <strong className='Highlight'>Add</strong>: <WikiLink id='N38' /> and{' '}
        <WikiLink id='N8' /> add cards randomly to your deck, not to your hand,
        but there is a (really low) chance of playing Harvesters of Souls or
        Mirz, recycling another card in your hand, and then drawing the newly
        added card into your hand.
      </p>

      <p>
        <strong className='Highlight'>Play</strong>: <WikiLink id='S21' /> plays
        random satyr cards from your deck, and <WikiLink id='N48' /> random
        spells from your hand, and both play them for free.{' '}
        <Link to='/guides/drawing#queen-of-herds'>
          Queen of Herds’ draws aren’t affected by weight
        </Link>
        .
      </p>

      <p>
        <strong className='Highlight'>Discard</strong>: <WikiLink id='N12' />{' '}
        removes a non-Pirate card randomly from your hand and does not draw a
        new one, limiting your options for that turn unless it’s your last
        played card.
      </p>

      <p>
        <strong className='Highlight'>Replace</strong>: <WikiLink id='N33' />{' '}
        actually replaces them, as does <WikiLink id='N22' />.
      </p>

      <p style={{ marginBottom: '2.5em' }}>
        <strong className='Highlight'>Draw</strong>: <WikiLink id='N14' /> draws
        new cards which allows you to play 5 cards (or 6 at higher levels) in
        one turn if Freebooters is one of them.
      </p>

      <Info icon='stack' title='Learn more about drawing'>
        <p>
          For a more in-depth look at the intricacies of drawing, cycling,
          playing and all around card manipulation, refer to the complete{' '}
          <Link to='/guides/drawing'>guide on drawing mechanisms</Link>.
        </p>
      </Info>

      <Title>Broodmother Qordia’s Eggs</Title>

      <p>
        <WikiLink id='F21' />
        ’s eggs are actually structures until they hatch. This can be asserted
        by noticing the structure strength icon on the card. Because of this,
        they can be hatched by a <WikiLink id='I2' /> (stolen with{' '}
        <WikiLink id='N38' />
        ), which hatches them on the same turn they were played on.
      </p>
      <p>
        This also means they will trigger <WikiLink id='N25' />’ and{' '}
        <WikiLink id='N39' />’ abilities, and are able to be used with{' '}
        <WikiLink id='I3' /> (although then again, both cards are not from the
        same faction so Harvesters of Souls would be required).
      </p>
      <p>
        Qordia’s Eggs are not available to put directly in your deck or be held
        in your hand. They exclusively exist during the turn they are summoned
        by Qordia’s ability.
      </p>

      <Title>Other info</Title>
      <p>
        <WikiLink id='N46' />
        ’s death effect either gives x strength to a random friendly unit, deals
        x damage to a random enemy unit or spawns an x strength unit within your
        frontline.
      </p>

      <p>
        If <WikiLink id='F12' /> has no enemies available to jump in front of
        after attacking (or if she is already in front of the only remaining
        enemy), she will still gain strength after attacking.
      </p>

      <p>
        <WikiLink id='I18' /> pushes back all units first, then deals damage to
        all. If a unit survives but was in front of a unit that doesn’t survive,
        it’ll be on the second tile from the back after Flaming Stream is used.
      </p>

      <p>
        Beasts of Terror deals damage to all other enemies with the same unit
        type when attacking, not including the one it’s attacking. The ability
        will also trigger when it attacks a friendly unit (through confusion, a
        feline enemy, or <WikiLink id='N63' />
        ), but the ability will only affect enemies. Similarly,{' '}
        <WikiLink id='N47' /> will damage all friendly units surrounding it
        before attacking a friendly unit.
      </p>

      <p>
        Units attacked by <WikiLink id='N69' /> will have all bordering units
        under a certain strength attack them, one at a time, until either the
        target unit dies and then Laurus will move into its tile, or all
        bordering units have attacked it.
      </p>
    </Guide>
  )
})
