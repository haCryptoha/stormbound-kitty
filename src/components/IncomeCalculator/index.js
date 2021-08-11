import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import Checkbox from '../Checkbox'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import LeagueSelect from '../LeagueSelect'
import NumberInput from '../NumberInput'
import Only from '../Only'
import PageMeta from '../PageMeta'
import PremiumPassCheckbox from '../PremiumPassCheckbox'
import ResourceIcon from '../ResourceIcon'
import Row from '../Row'
import Title from '../Title'
import VisuallyHidden from '../VisuallyHidden'
import { BRAWL_MILESTONES } from '../../constants/brawl'
import { BOOKS } from '../../constants/books'
import {
  Common,
  Rare,
  Epic,
  Legendary,
  Coins,
  Rubies,
  Stones,
} from '../Resource'
import capitalise from '../../helpers/capitalise'
import getActivityRewards from '../../helpers/getActivityRewards'
import getBookName from '../../helpers/getBookName'
import getBrawlRewards from '../../helpers/getBrawlRewards'
import getClimbingRewards from '../../helpers/getClimbingRewards'
import getHeroesLeagueRewards from '../../helpers/getHeroesLeagueRewards'
import getLeagueChestRewards from '../../helpers/getLeagueChestRewards'
import getRewardLabel from '../../helpers/getRewardLabel'
import getVictoryCoins from '../../helpers/getVictoryCoins'
import {
  DailyIncome,
  WeeklyIncome,
  MonthlyIncome,
  YearlyIncome,
} from '../../helpers/Income'
import styles from './styles'

const PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
const SELECT_LENGTH_MULTIPLIER = {
  DAILY: '1ch',
  WEEKLY: '1.2ch',
  MONTHLY: '1.2ch',
  YEARLY: '1.1ch',
}

const getPeriodicIncome = period => {
  if (period === 'YEARLY') return new YearlyIncome()
  if (period === 'MONTHLY') return new MonthlyIncome()
  if (period === 'WEEKLY') return new WeeklyIncome()
  if (period === 'DAILY') return new DailyIncome()
}

const useIncomeOverPeriod = (settings, period, rubiesConversion) => {
  const income = getPeriodicIncome(period)

  if (settings.league) {
    const chestRewards = getLeagueChestRewards(settings.league)
    income.add(chestRewards)
  }

  if (settings.league === 'HEROES') {
    const heroLeagueRewards = getHeroesLeagueRewards(settings.heroesPosition)
    income.add(heroLeagueRewards)
  }

  if (settings.league && settings.rank) {
    const climbingRewards = getClimbingRewards(settings.league, settings.rank)
    income.add(climbingRewards)
  }

  const brawlRewards = getBrawlRewards({
    casual: settings.casualMilestone || -1,
    warrior: settings.warriorMilestone || -1,
    ultimate: settings.ultimateMilestone || -1,
  })
  brawlRewards.coins -= settings.brawlCost || 0
  income.add(brawlRewards)

  const activityRewards = getActivityRewards({
    league: settings.league,
    preferTier3Stones: settings.preferTier3Stones,
    setup: settings.setup,
    wins: settings.wins,
    withDailyHumble: settings.withDailyHumble,
    withDailyQuests: settings.withDailyQuests,
    withPremiumPass: settings.withPremiumPass,
  })
  income.add(activityRewards)

  if (rubiesConversion !== 'NONE') {
    income.convertRubies(rubiesConversion)
  }

  return income
}

export default React.memo(function IncomeCalculator(props) {
  const { css } = useFela()
  const [withPremiumPass, setWithPremiumPass] = React.useState(false)
  const [period, setPeriod] = React.useState(PERIODS[0])
  const [setup, setSetup] = React.useState('MOBILE_WITHOUT_ADS')
  const [wins, setWins] = React.useState(0)
  const [league, setLeague] = React.useState('')
  const [rank, setRank] = React.useState('')
  const [casualMilestone, setCasualMilestone] = React.useState('')
  const [warriorMilestone, setWarriorMilestone] = React.useState('')
  const [ultimateMilestone, setUltimateMilestone] = React.useState('')
  const [brawlCost, setBrawlCost] = React.useState(0)
  const [heroesPosition, setHeroesPosition] = React.useState('NOT_RANKED')
  const [rubiesConversion, setRubiesConversion] = React.useState('NONE')
  const [preferTier3Stones, setPreferTier3Stones] = React.useState(false)
  const [withDailyHumble, setWithDailyHumble] = React.useState(false)
  const [withDailyQuests, setWithDailyQuests] = React.useState(false)
  const income = useIncomeOverPeriod(
    {
      brawlCost,
      heroesPosition,
      league,
      casualMilestone,
      warriorMilestone,
      ultimateMilestone,
      preferTier3Stones,
      rank,
      setup,
      wins,
      withDailyHumble,
      withDailyQuests,
      withPremiumPass,
    },
    period,
    rubiesConversion
  )

  const coinCap = withPremiumPass ? 700 : 400
  const maxWins = Math.ceil(
    (coinCap - 30) / getVictoryCoins(setup, league, withPremiumPass)
  )

  React.useEffect(() => {
    if (wins > maxWins) setWins(maxWins)
  }, [maxWins, setup, wins])

  return (
    <>
      <HeaderBanner title='Income Calculator' />

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
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

          <p className={css({ marginBottom: '2em' })}>
            Special thanks to <Link to='/member/Oeni'>Oeni</Link> (oeni#7266)
            and <Link to='/member/Roman'>Roman</Link> (Roman_NFP#6918) for their
            help in designing and making this simulator possible.
          </p>

          <Info icon='compass' title='Resources Guide'>
            To learn about the best way to spend resources based on your
            play-style, <Link to='/member/Roman'>Roman</Link> has authored a
            fantastic{' '}
            <Link to='/guides/resources'>guides on Stormbound resources</Link>.
          </Info>
        </Row.Column>
        <Row.Column width='1/3'>
          <Title>Configuration</Title>
          <Row desktopOnly>
            <Row.Column>
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
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Daily wins'
                id='wins'
                name='wins'
                value={wins}
                onChange={setWins}
                min={0}
                max={maxWins}
              />
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <LeagueSelect
                label='Monthly league'
                value={league}
                onChange={event => setLeague(event.target.value)}
              />
            </Row.Column>
            <Row.Column>
              <label htmlFor='rank'>Monthly rank</label>
              <select
                name='rank'
                id='rank'
                value={rank}
                disabled={league === 'HEROES'}
                onChange={event => setRank(event.target.value)}
              >
                <option value=''>Select a rank</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='milestone'>Casual milestone</label>
              <select
                name='casualMilestone'
                id='casualMilestone'
                value={casualMilestone}
                onChange={event => setCasualMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.CASUAL.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='milestone'>Warrior milestone</label>
              <select
                name='warriorMilestone'
                id='warriorMilestone'
                value={warriorMilestone}
                onChange={event => setWarriorMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.WARRIOR.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='milestone'>Ultimate milestone</label>
              <select
                name='ultimateMilestone'
                id='ultimateMilestone'
                value={ultimateMilestone}
                onChange={event => setUltimateMilestone(+event.target.value)}
              >
                <option value=''>Select a milestone</option>
                {BRAWL_MILESTONES.ULTIMATE.map((milestone, index) => (
                  <option key={milestone.crowns} value={index}>
                    {index + 1}. {getRewardLabel(milestone)}
                  </option>
                ))}
              </select>
            </Row.Column>
            <Row.Column>
              <NumberInput
                label='Brawl total cost'
                id='brawl-cost'
                name='brawl-cost'
                value={brawlCost}
                onChange={setBrawlCost}
                step={10}
                min={0}
              />
            </Row.Column>
          </Row>
          <Row desktopOnly>
            <Row.Column>
              <label htmlFor='rubies-conversion'>Heroes Position</label>
              <select
                id='heroes-position'
                name='heroes-position'
                value={heroesPosition}
                disabled={league !== 'HEROES'}
                onChange={event => setHeroesPosition(event.target.value)}
              >
                <option value='NOT_RANKED'>Not within top 500</option>
                <option value='TOP_500'>Top 500</option>
                <option value='TOP_100'>Top 100</option>
                <option value='TOP_10'>Top 10</option>
                <option value='TOP_1'>Top 1</option>
              </select>
            </Row.Column>
            <Row.Column>
              <label htmlFor='rubies-conversion'>Convert rubies to</label>
              <select
                id='rubies-conversion'
                name='rubies-conversion'
                value={rubiesConversion}
                onChange={event => setRubiesConversion(event.target.value)}
              >
                <option value='NONE'>Nothing</option>
                {Object.keys(BOOKS).map(bookType => (
                  <option value={bookType} key={bookType}>
                    {getBookName(bookType, true)}
                  </option>
                ))}
                <option value='CARD_SHOP'>Card Shop Epics</option>
              </select>
            </Row.Column>
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
          <PremiumPassCheckbox
            checked={withPremiumPass}
            onChange={event => setWithPremiumPass(event.target.checked)}
          />
        </Row.Column>
        <Row.Column width='1/3'>
          <div>
            <Title
              extend={{
                '--length': period.length,
                '--multiplier': SELECT_LENGTH_MULTIPLIER[period],
              }}
            >
              <VisuallyHidden as='label' htmlFor='period'>
                Period
              </VisuallyHidden>
              <select
                name='period'
                id='period'
                value={period}
                onChange={event => setPeriod(event.target.value)}
                className={css(styles.period)}
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
                <Common amount={Number(income.cards[0].toFixed(2))} />
              </li>
              <li>
                <Rare amount={Number(income.cards[1].toFixed(2))} />
              </li>
              <li>
                <Epic amount={Number(income.cards[2].toFixed(2))} />
              </li>
              <li>
                <Legendary amount={Number(income.cards[3].toFixed(2))} />
              </li>
            </ul>
          </div>
        </Row.Column>
      </Row>
      <PageMeta
        title='Income Calculator'
        description='Compute how many resources you can get during a certain period of time to get most out of your resources.'
      />
    </>
  )
})
