import React from 'react'
import { Link } from 'react-router-dom'
import Checkbox from '../Checkbox'
import Column from '../Column'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Only from '../Only'
import PageMeta from '../PageMeta'
import ResourceIcon from '../ResourceIcon'
import Row from '../Row'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import { BOOKS } from '../../constants/game'
import { Coins, Rubies, Stones } from '../Resource'
import capitalise from '../../helpers/capitalise'
import getBrawlRewardLabel from '../../helpers/getBrawlRewardLabel'
import getAverageStonesPerBook from '../../helpers/getAverageStonesPerBook'
import './index.css'

const DEFAULT_STATE = { coins: 0, rubies: 0, stones: 0, cards: [0, 0, 0, 0] }
const PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
const SELECT_LENGTH_MULTIPLIER = {
  DAILY: '1ch',
  WEEKLY: '1.2ch',
  MONTHLY: '1.2ch',
  YEARLY: '1.1ch',
}

const getMultiplier = period => {
  switch (period) {
    case 'YEARLY':
      return 365.25
    case 'MONTHLY':
      return 365.25 / 12
    case 'WEEKLY':
      return 7
    case 'DAILY':
    default:
      return 1
  }
}

const getWinCoins = setup => {
  switch (setup) {
    case 'MOBILE_WITHOUT_ADS':
      return 5
    case 'MOBILE_WITH_ADS':
      return 20
    case 'STEAM_OR_WEB':
      return 10
    default:
      return 1
  }
}

const CLIMBING_CARDS = {
  DIAMOND: [0, 1, 2, 1, 3],
  PLATINUM: [0, 1, 2, 1, 2],
  GOLD: [0, 1, 0, 1, 2],
  SILVER: [0, 0, 1, 0, 2],
  BRONZE: [0, 0, 1, 0, 1],
  IRON: [0, 0, 0, 0, 1],
}

const BRAWL_REWARDS = [
  {
    stones: getAverageStonesPerBook('HUMBLE'),
    cards: [
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[0],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[1],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[2],
      BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[3],
    ],
  },
  { rubies: 5 },
  {
    stones: getAverageStonesPerBook('CLASSIC'),
    cards: [
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[0],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[1],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[2],
      BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[3],
    ],
  },
  { stones: 10 },
  {
    stones: getAverageStonesPerBook('MYTHIC'),
    cards: [
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[0],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[1],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[2],
      BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[3],
    ],
  },
  { cards: [0, 0, 0, 1] },
  { stones: 50 },
  { rubies: 250 },
  { cards: [0, 0, 0, 5] },
  { stones: 200 },
]

const getMonthlyChestReward = league => {
  switch (league) {
    case 'DIAMOND':
      return { coins: 1800, rubies: 50, stones: 7.5, cards: [14, 12, 6, 2] }
    case 'PLATINUM':
      return { coins: 1200, rubies: 30, stones: 0, cards: [12, 9, 4, 1] }
    case 'GOLD':
      return { coins: 800, rubies: 20, stones: 0, cards: [10, 6, 3, 0] }
    case 'SILVER':
      return { coins: 500, rubies: 10, stones: 0, cards: [7, 4, 2, 0] }
    case 'BRONZE':
      return { coins: 300, rubies: 5, stones: 0, cards: [5, 2, 1, 0] }
    case 'IRON':
      return { coins: 150, rubies: 0, stones: 0, cards: [3, 1, 0, 0] }
    default:
      return { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }
  }
}

const getWeeklyBrawlReward = milestone => {
  const rewards = { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }

  for (let i = 0; i <= milestone; i += 1) {
    const reward = BRAWL_REWARDS[i]

    if (reward.coins) rewards.coins += reward.coins
    if (reward.rubies) rewards.rubies += reward.rubies
    if (reward.stones) rewards.stones += reward.stones
    if (reward.cards) {
      rewards.cards[0] += reward.cards[0]
      rewards.cards[1] += reward.cards[1]
      rewards.cards[2] += reward.cards[2]
      rewards.cards[3] += reward.cards[3]
    }
  }

  return rewards
}

const getDailyIncome = ({
  brawlCost,
  league,
  milestone,
  preferTier3Stones,
  rank,
  setup,
  wins,
  withDailyHumble,
  withDailyQuests,
}) => {
  const income = { ...DEFAULT_STATE, cards: [...DEFAULT_STATE.cards] }
  const chest = getMonthlyChestReward(league)

  // Recalibrate the monthly chest rewards to daily rewards
  income.coins += chest.coins / getMultiplier('MONTHLY')
  income.rubies += chest.rubies / getMultiplier('MONTHLY')
  income.stones += chest.stones / getMultiplier('MONTHLY')
  chest.cards.forEach((cards, index) => {
    income.cards[index] += cards / getMultiplier('MONTHLY')
  })

  // Consider the cards earned from climbing on a monthly basis
  if (league && rank) {
    CLIMBING_CARDS[league].slice(0, 5 - rank + 1).forEach(rank => {
      income.cards[rank] += 1 / getMultiplier('MONTHLY')
    })
  }

  // Recalibrate the weekly Brawl rewards to daily rewards
  if (milestone !== '') {
    const brawl = getWeeklyBrawlReward(milestone)

    income.coins += brawl.coins / getMultiplier('WEEKLY')
    income.coins -= brawlCost / getMultiplier('WEEKLY')
    income.rubies += brawl.rubies / getMultiplier('WEEKLY')
    income.stones += brawl.stones / getMultiplier('WEEKLY')
    brawl.cards.forEach((cards, index) => {
      income.cards[index] += cards / getMultiplier('WEEKLY')
    })
  }

  if (withDailyHumble) {
    income.stones += getAverageStonesPerBook('HUMBLE')
    income.cards[0] += BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[0]
    income.cards[1] += BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[1]
    income.cards[2] += BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[2]
    income.cards[3] += BOOKS.HUMBLE.draws * BOOKS.HUMBLE.percentiles[3]
  }

  if (withDailyQuests) {
    income.coins += 100 + ((preferTier3Stones ? 5 : 6) / 9) * 150
    income.rubies += 5
    income.stones += ((preferTier3Stones ? 4 : 3) / 9) * 2
  }

  if (wins > 0) {
    income.coins += 30
    income.coins += wins * getWinCoins(setup)
  }

  return income
}

const getPeriodIncome = (income, period, rubiesConversion) => {
  const multiplier = getMultiplier(period)

  income.coins *= multiplier
  income.rubies *= multiplier
  income.stones *= multiplier
  income.cards = income.cards.map(prob => prob * multiplier)

  if (rubiesConversion === 'MYTHIC') {
    const books = Math.floor(income.rubies / 80)
    income.rubies -= books * 80

    for (let i = 0; i < books; i += 1) {
      income.stones += getAverageStonesPerBook('MYTHIC')
      income.cards[0] += BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[0]
      income.cards[1] += BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[1]
      income.cards[2] += BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[2]
      income.cards[3] += BOOKS.MYTHIC.draws * BOOKS.MYTHIC.percentiles[3]
    }
  } else if (rubiesConversion === 'HEROIC') {
    const books = Math.floor(income.rubies / 40)
    income.rubies -= books * 40

    for (let i = 0; i < books; i += 1) {
      income.stones += getAverageStonesPerBook('HEROIC')
      income.cards[0] += BOOKS.HEROIC.draws * BOOKS.HEROIC.percentiles[0]
      income.cards[1] += BOOKS.HEROIC.draws * BOOKS.HEROIC.percentiles[1]
      income.cards[2] += BOOKS.HEROIC.draws * BOOKS.HEROIC.percentiles[2]
      income.cards[3] += BOOKS.HEROIC.draws * BOOKS.HEROIC.percentiles[3]
    }
  } else if (rubiesConversion === 'CLASSIC') {
    const books = Math.floor(income.rubies / 20)
    income.rubies -= books * 20

    for (let i = 0; i < books; i += 1) {
      income.stones += getAverageStonesPerBook('CLASSIC')
      income.cards[0] += BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[0]
      income.cards[1] += BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[1]
      income.cards[2] += BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[2]
      income.cards[3] += BOOKS.CLASSIC.draws * BOOKS.CLASSIC.percentiles[3]
    }
  } else if (rubiesConversion === 'CARD_SHOP') {
    const cards = Math.floor(income.rubies / 20)
    income.rubies -= cards * 20
    income.cards[2] += cards
  }

  return income
}

export default React.memo(function IncomeCalculator(props) {
  const [period, setPeriod] = React.useState(PERIODS[0])
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const [wins, setWins] = React.useState(0)
  const [league, setLeague] = React.useState('')
  const [rank, setRank] = React.useState('')
  const [milestone, setMilestone] = React.useState('')
  const [brawlCost, setBrawlCost] = React.useState(0)
  const [rubiesConversion, setRubiesConversion] = React.useState('NONE')
  const [preferTier3Stones, setPreferTier3Stones] = React.useState(false)
  const [withDailyHumble, setWithDailyHumble] = React.useState(false)
  const [withDailyQuests, setWithDailyQuests] = React.useState(false)
  const income = getPeriodIncome(
    getDailyIncome({
      brawlCost,
      league,
      milestone,
      preferTier3Stones,
      rank,
      setup,
      wins,
      withDailyHumble,
      withDailyQuests,
    }),
    period,
    rubiesConversion
  )
  const maxWins =
    setup === 'STEAM_OR_WEB' ? 37 : setup === 'MOBILE_WITH_ADS' ? 19 : 74

  React.useEffect(() => {
    if (wins > maxWins) setWins(maxWins)
  }, [maxWins, setup, wins])

  return (
    <>
      <HeaderBanner title='Income Calculator' />

      <Row desktopOnly wideGutter>
        <Column width='1/3'>
          <Title>What is this?</Title>
          <p>
            This income calculator helps you figure out how many{' '}
            <ResourceIcon resource='STONE' /> stones,{' '}
            <ResourceIcon resource='RUBY' /> rubies,{' '}
            <ResourceIcon resource='COIN' /> coins and cards you make during a
            certain time frame based on your play-style.
          </p>

          <p>
            Fill the form <Only.Desktop>on the right</Only.Desktop>
            <Only.Mobile>below</Only.Mobile>, and change the period by{' '}
            <Only.Desktop>clicking</Only.Desktop>
            <Only.Mobile>tapping</Only.Mobile> “Daily” in the outcome section.
          </p>

          <p style={{ marginBottom: '2em' }}>
            Special thanks to Oeni (oeni#7266) and Roman (Roman_NFP#6918) for
            their help in designing and making this simulator possible.
          </p>

          <Info icon='compass' title='Resources Guide'>
            To learn about the best way to spend resources based on your
            play-style, Roman has authored a fantastic{' '}
            <Link to='/guides/resources'>guides on Stormbound resources</Link>.
          </Info>
        </Column>
        <Column width='1/3'>
          <Title>Configuration</Title>
          <Row desktopOnly>
            <Column>
              <label htmlFor='setup'>Game setup</label>
              <select
                name='setup'
                id='setup'
                value={setup}
                onChange={event => setSetup(event.target.value)}
              >
                <option value='MOBILE_WITHOUT_ADS'>Mobile without ads</option>
                <option value='MOBILE_WITH_ADS'>Mobile with ads</option>
                <option value='STEAM_OR_WEB'>Steam or web version</option>
              </select>
            </Column>
            <Column>
              <label htmlFor='wins'>Daily wins</label>
              <input
                id='wins'
                name='wins'
                type='number'
                value={wins}
                onChange={event => setWins(event.target.value)}
                min={0}
                max={maxWins}
              />
            </Column>
          </Row>
          <Row desktopOnly>
            <Column>
              <label htmlFor='league'>Monthly league</label>
              <select
                name='league'
                id='league'
                value={league}
                onChange={event => setLeague(event.target.value)}
              >
                <option value=''>Select a league</option>
                <option value='DIAMOND'>Diamond</option>
                <option value='PLATINUM'>Platinum</option>
                <option value='GOLD'>Gold</option>
                <option value='SILVER'>Silver</option>
                <option value='BRONZE'>Bronze</option>
                <option value='IRON'>Iron</option>
              </select>
            </Column>
            <Column>
              <label htmlFor='rank'>Monthly rank</label>
              <select
                name='rank'
                id='rank'
                value={rank}
                onChange={event => setRank(event.target.value)}
              >
                <option value=''>Select a rank</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </Column>
          </Row>
          <Row desktopOnly>
            <Column>
              <label htmlFor='milestone'>Weekly milestone</label>
              <select
                name='milestone'
                id='milestone'
                value={milestone}
                onChange={event => setMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {MILESTONES.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getBrawlRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </Column>
            <Column>
              <label htmlFor='brawl-cost'>Brawl avg. cost</label>
              <input
                id='brawl-cost'
                name='brawl-cost'
                type='number'
                value={brawlCost}
                onChange={event => setBrawlCost(+event.target.value)}
                min={
                  milestone === ''
                    ? 0
                    : MILESTONES.slice(0, milestone + 1).reduce(
                        (max, ms) => max + (ms.cost * ms.crowns) / 5,
                        0
                      )
                }
                step={10}
                max={MILESTONES.slice(0, milestone + 1).reduce(
                  (max, ms) => max + ms.cost * ms.crowns,
                  0
                )}
              />
            </Column>
          </Row>
          <Row desktopOnly>
            <Column>
              <label htmlFor='rubies-conversion'>Convert rubies to</label>
              <select
                id='rubies-conversion'
                name='rubies-conversion'
                type='number'
                value={rubiesConversion}
                onChange={event => setRubiesConversion(event.target.value)}
              >
                <option value='NONE'>Nothing</option>
                <option value='MYTHIC'>Mythic Tomes</option>
                <option value='HEROIC'>Heroic Tomes</option>
                <option value='CLASSIC'>Classic Tomes</option>
                <option value='CARD_SHOP'>Card Shop Epics</option>
              </select>
            </Column>
            <Column></Column>
          </Row>
          <Checkbox
            id='with-daily-quests'
            name='with-daily-quests'
            checked={withDailyQuests}
            onChange={event => setWithDailyQuests(event.target.checked)}
          >
            Complete daily quests
          </Checkbox>
          <Checkbox
            id='prefer-tier3-stones'
            name='prefer-tier3-stones'
            checked={preferTier3Stones}
            onChange={event => setPreferTier3Stones(event.target.checked)}
          >
            Prefer tier-3 quest to be fusion stones
          </Checkbox>
          <Checkbox
            id='with-daily-humble'
            name='with-daily-humble'
            checked={withDailyHumble}
            onChange={event => setWithDailyHumble(event.target.checked)}
          >
            Open daily Humble book
          </Checkbox>
        </Column>
        <Column width='1/3'>
          <div>
            <Title
              style={{
                '--length': period.length,
                '--multiplier': SELECT_LENGTH_MULTIPLIER[period],
              }}
            >
              <label htmlFor='period' className='VisuallyHidden'>
                Period
              </label>
              <select
                name='period'
                id='period'
                value={period}
                onChange={event => setPeriod(event.target.value)}
                className='IncomeCalculator__period'
              >
                {PERIODS.map(period => (
                  <option key={period} value={period}>
                    {capitalise(period.toLowerCase())}
                  </option>
                ))}
              </select>
              Income
            </Title>

            <p>
              On a {period.toLowerCase()} basis, and given your current play
              style, you would collect the following resources:
            </p>
            <ul>
              <li>
                <Coins amount={parseFloat(income.coins.toFixed(2))} />
              </li>
              <li>
                <Rubies amount={parseFloat(income.rubies.toFixed(2))} />
              </li>
              <li>
                <Stones amount={parseFloat(income.stones.toFixed(2))} />
              </li>
            </ul>

            <p>As well as:</p>
            <ul>
              <li>
                <img
                  className='IncomeCalculator__rarity'
                  src={`/assets/images/iconography/rarity-common.png`}
                  alt=''
                />{' '}
                {income.cards[0].toFixed(2)} common card
                {income.cards[0] < 2 ? '' : 's'}
              </li>
              <li>
                <img
                  className='IncomeCalculator__rarity'
                  src={`/assets/images/iconography/rarity-rare.png`}
                  alt=''
                />{' '}
                {income.cards[1].toFixed(2)} rare card
                {income.cards[1] < 2 ? '' : 's'}
              </li>
              <li>
                <img
                  className='IncomeCalculator__rarity'
                  src={`/assets/images/iconography/rarity-epic.png`}
                  alt=''
                />{' '}
                {income.cards[2].toFixed(2)} epic card
                {income.cards[2] < 2 ? '' : 's'}
              </li>
              <li>
                <img
                  className='IncomeCalculator__rarity'
                  src={`/assets/images/iconography/rarity-legendary.png`}
                  alt=''
                />{' '}
                {income.cards[3].toFixed(2)} legendary card
                {income.cards[3] < 2 ? '' : 's'}
              </li>
            </ul>
          </div>
        </Column>
      </Row>
      <PageMeta
        title='Income Calculator'
        description='Compute how many resources you can get during a certain period of time to get most out of your resources.'
      />
    </>
  )
})
