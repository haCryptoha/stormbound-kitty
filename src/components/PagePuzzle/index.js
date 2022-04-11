import React from 'react'
import FAQSection from '~/components/FAQSection'
import Link from '~/components/Link'
import BlockNotice from '~/components/BlockNotice'
import Page from '~/components/Page'
import BattleSimApp from '~/components/BattleSimApp'
import useBattleSim from '~/hooks/useBattleSim'
import { formatDate } from '~/helpers/formatDate'
import parseDate from '~/helpers/parseDate'
import { CATEGORIES, RESTRICTIONS } from '~/constants/puzzles'

export default React.memo(function PagePuzzle(props) {
  const puzzle = props.puzzle
  const state = useBattleSim({ ...props, mode: 'DISPLAY' })
  const date = parseDate(puzzle.date)

  return (
    <Page
      title={puzzle.name}
      author={puzzle.user}
      meta={formatDate(date)}
      action={{ to: '/puzzles', children: 'Back to puzzles' }}
      description={`Figure out how to solve ${puzzle.name} by ${
        puzzle.user.name
      } (made in ${formatDate(date)}).`}
      isEditorialContent
    >
      <BattleSimApp {...state} {...props} />
      <Page.Narrow>
        <BlockNotice>{CATEGORIES[puzzle.category]}</BlockNotice>
        <p>The following restrictions apply:</p>
        <ul>
          {puzzle.restrictions.map(restriction => (
            <li key={restriction}>
              <strong>{RESTRICTIONS[restriction].name}</strong>:{' '}
              {RESTRICTIONS[restriction].description}
            </li>
          ))}
        </ul>

        <FAQSection
          id='FAQ'
          title='FAQ'
          entries={[
            {
              id: 'how-to-play',
              question: 'How to play?',
              answer: (
                <>
                  <p>
                    Puzzles are not actually playable, like a real Stormbound
                    game would. The puzzle showcases a static snapshot of a
                    game, and it’s up to you to figure out which moves would
                    need to be played in order to solve the puzzle.
                  </p>
                </>
              ),
            },
            {
              id: 'impossible',
              question: 'Is it really solvable?',
              answer: (
                <p>
                  This puzzle was designed by{' '}
                  <Link to={`/members/${puzzle.user.slug}`}>
                    {puzzle.user.name}
                  </Link>{' '}
                  in <strong>{formatDate(date)}</strong>. If you believe it no
                  longer to be possible in the current state of the game, please
                  reach out to the author or Kitty on Discord.
                </p>
              ),
            },
          ]}
        />
      </Page.Narrow>
    </Page>
  )
})