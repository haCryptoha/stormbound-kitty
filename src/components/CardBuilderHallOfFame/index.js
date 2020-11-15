import React from 'react'
import HallOfFameTeaser from '../HallOfFameTeaser'
import Row from '../Row'
import Title from '../Title'
import swcc from '../../data/swcc'
import chunk from '../../helpers/chunk'

export const CardBuilderHallOfFameSeason = React.memo(
  function CardBuilderHallOfFameSeason(props) {
    return chunk(props.weeks, 3).map((row, index) => (
      <Row key={index} desktopOnly wideGutter>
        <Row.Column width='1/3'>
          {row[0] && (
            <HallOfFameTeaser
              {...row[0]}
              number={props.weeks.length - index * 3}
            />
          )}
        </Row.Column>
        <Row.Column width='1/3'>
          {row[1] && (
            <HallOfFameTeaser
              {...row[1]}
              number={props.weeks.length - index * 3 - 1}
            />
          )}
        </Row.Column>
        <Row.Column width='1/3'>
          {row[2] && (
            <HallOfFameTeaser
              {...row[2]}
              number={props.weeks.length - index * 3 - 2}
            />
          )}
        </Row.Column>
      </Row>
    ))
  }
)

export default React.memo(function CardBuilderHallOfFame(props) {
  return (
    <>
      <Title>Season 2</Title>
      <CardBuilderHallOfFameSeason
        weeks={swcc
          .filter(week => !!week.winner && week.season === 2)
          .reverse()}
      />

      <Title>Season 1</Title>
      <CardBuilderHallOfFameSeason
        weeks={swcc
          .filter(week => !!week.winner && week.season === 1)
          .reverse()}
      />
    </>
  )
})
