import React from 'react'
import { Link } from 'react-router-dom'
import Info from '../Info'
import { Coins, Crowns } from '../Resource'
import { MILESTONES } from '../../constants/brawl'
import getMilestoneIndexFromCoins from '../../helpers/getMilestoneIndexFromCoins'
import getRewardLabel from '../../helpers/getRewardLabel'
import getCostForMilestone from '../../helpers/getCostForMilestone'
import getMilestoneForCrowns from '../../helpers/getMilestoneForCrowns'
import getVictoryCoins from '../../helpers/getVictoryCoins'
import './index.css'

const BrawlCalculatorRewards = React.memo(function BrawlCalculatorRewards(
  props
) {
  const info = getMilestoneForCrowns(props.crowns)

  return (
    <ol className='BrawlCalculatorOutcome__rewards' start={info.nextIndex + 1}>
      {MILESTONES.slice(info.nextIndex, props.milestone + 1).map(milestone => {
        return (
          <li key={milestone.crowns}>
            {getRewardLabel(milestone, true)}{' '}
            {milestone.reward === 'LEGENDARY_CARD' && props.hasLegendary5
              ? '(exchanged)'
              : ''}
          </li>
        )
      })}
    </ol>
  )
})

export default React.memo(function BrawlCalculatorOutcome(props) {
  const {
    coins,
    crowns,
    discount,
    hasLegendary5,
    league,
    milestone,
    mode,
    setup,
    winRate,
    withPremiumPass,
  } = props
  const options = {
    costModifier: 1 - discount / 100,
    crowns,
    hasLegendary5,
    league,
    setup,
    winRatio: winRate / 100,
    withPremiumPass,
  }

  const info = getMilestoneForCrowns(crowns)
  const gains =
    setup === 'NONE' ? (
      'without considering winning gain'
    ) : (
      <>
        considering <Coins amount={getVictoryCoins(setup, league)} /> per win
        until coin cap
      </>
    )

  if (!mode) {
    return (
      <p>
        Start by deciding whether you want to reach a certain milestone or
        contribute with a certain amount of coins. Then, fill the remaining
        options to let the calculator come up with a result.
      </p>
    )
  }

  // If `nextIndex` is `-1`, it means we have too many crowns for the entire
  // Brawl, and have already finished it entirely, therefore there is nothing
  // else to do.
  if (info.nextIndex === -1) {
    return (
      <p>
        With <Crowns amount={crowns} />, you have already reached milestone #
        {MILESTONES.length}. Set less than 250 crowns to use the calculator.
      </p>
    )
  }

  if (mode === 'COINS') {
    if (!coins) {
      return (
        <p>
          You must define how many coins you are willing to spend for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const reachableIndex = getMilestoneIndexFromCoins({ ...options, coins })

    // If the reachable milestone with the available coins is the same as the
    // current milestone, it means there are not enough coins to reach said
    // milestone.
    if (info.currentIndex === reachableIndex) {
      return (
        <p>
          Starting at <Crowns amount={crowns} />, with <Coins amount={coins} />{' '}
          ({gains}) and accounting for a {winRate}% win rate, you unfortunately
          cannot reach a next milestone.
        </p>
      )
    }

    const next =
      reachableIndex < MILESTONES.length - 1
        ? getCostForMilestone({ ...options, milestone: reachableIndex + 1 })
        : null
    const nextUp = next ? Math.ceil(Math.ceil(next) / 5) * 5 : null

    return (
      <>
        <p>
          Starting at <Crowns amount={crowns} />, with <Coins amount={coins} />{' '}
          ({gains}) and accounting for a {winRate}% win rate, you can expect
          reaching{' '}
          <span className='Highlight'>milestone #{reachableIndex + 1}</span>,
          and get the following rewards:
        </p>

        <BrawlCalculatorRewards
          crowns={props.crowns}
          milestone={reachableIndex}
          hasLegendary5={hasLegendary5}
        />

        {next ? (
          <>
            <p>
              Reaching the next milestone (milestone #{reachableIndex + 2},
              yielding {getRewardLabel(MILESTONES[reachableIndex + 1], true)})
              would cost <Coins amount={nextUp} />, or an{' '}
              <span className='Highlight'>
                extra <Coins amount={nextUp - coins} />
              </span>
              .
            </p>
            <Info icon='equalizer' title='Income calculator'>
              To figure out how much coins you can earn in a given period of
              time, check out the{' '}
              <Link to='/calculators/income'>income calculator</Link>.
            </Info>
          </>
        ) : null}
      </>
    )
  }

  if (mode === 'GOAL') {
    if (milestone === '') {
      return (
        <p>
          You must define which milestone you are wishing to reach for the
          calculator to compute a result. Remember to check which winning gains
          to use depending on whether you watch ads or play on Steam (or don’t
          want to consider winning coins at all).
        </p>
      )
    }

    const outcome = getCostForMilestone({ ...options, milestone })
    const outcomeUp = Math.ceil(Math.ceil(outcome) / 5) * 5
    const reward = getRewardLabel(MILESTONES[milestone], true)

    return (
      <>
        <p>
          Starting at <Crowns amount={crowns} />, reaching milestone #
          {milestone + 1} ({reward}) and accounting for a {winRate}% win rate
          would cost <Coins amount={outcomeUp} /> ({gains}). Here are all the
          rewards you would get:
        </p>

        <BrawlCalculatorRewards
          crowns={crowns}
          milestone={milestone}
          hasLegendary5={hasLegendary5}
        />

        <Info icon='equalizer' title='About the cost'>
          <p>
            Keep in mind the aforementioned cost is an estimation based on the
            given win rate. Depending on the milestones at which the losses
            occur in reality, the actual cost will vary and might not exactly
            match the expected outcome.
          </p>
        </Info>
      </>
    )
  }

  return null
})
