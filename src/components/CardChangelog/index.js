import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Info from '../Info'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import FeedCardChange from '../FeedCardChange'
import changelog from '../../data/changelog'
import sortCards from '../../helpers/sortCards'
import getRawCardData from '../../helpers/getRawCardData'
import parseDate from '../../helpers/parseDate'
import { formatDate } from '../../helpers/formatDate'
import './index.css'

const getCardName = id => getRawCardData(id).name

export default function CardChangelog(props) {
  const [sorting, setSorting] = React.useState('DATE')
  const [type, setType] = React.useState('*')
  const changesByDate = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        const chunks = change.date.split('/')
        const key = chunks[1] + '/' + chunks[2]

        if (!acc[key]) acc[key] = []
        acc[key].push(change)
        return acc
      }, {})
  }, [type])
  const changesByCard = React.useMemo(() => {
    return changelog
      .filter(change => type === '*' || change.type === type)
      .reduce((acc, change) => {
        if (!acc[change.id]) {
          acc[change.id] = []
        }
        acc[change.id].push(change)
        return acc
      }, {})
  }, [type])

  return (
    <Article title='Card Changelog'>
      <Article.Narrow>
        <Title>Filters</Title>
        <Row>
          <Row.Column>
            <label htmlFor='sorting'>Sort by</label>
            <select
              id='sorting'
              name='sorting'
              value={sorting}
              onChange={event => setSorting(event.target.value)}
            >
              <option value='DATE'>Date</option>
              <option value='CARD'>Card</option>
            </select>
          </Row.Column>
          <Row.Column>
            <label htmlFor='type'>Types of changes</label>
            <select
              id='type'
              name='type'
              value={type}
              onChange={event => setType(event.target.value)}
            >
              <option value='*'>Any</option>
              <option value='BUFF'>Buff</option>
              <option value='INFO'>Info</option>
              <option value='MIXED'>Mixed</option>
              <option value='NERF'>Nerf</option>
            </select>
          </Row.Column>
        </Row>

        <Info icon='compass' title='Release notes'>
          If you happen to be looking for the details of a specific update,
          check out the <Link to='/releases'>release notes</Link> for a list of
          all the releases since July 2020.
        </Info>

        {sorting === 'DATE'
          ? Object.keys(changesByDate)
              .sort((a, b) => parseDate(b) - parseDate(a))
              .map(date => (
                <section className='CardChanges__section' key={date}>
                  <Title className='CardChanges__title'>
                    {formatDate(parseDate(date))}
                  </Title>
                  <ul className='CardChanges__list'>
                    {changesByDate[date]
                      .sort((a, b) =>
                        sortCards()(getRawCardData(a.id), getRawCardData(b.id))
                      )
                      .map(change => (
                        <li
                          className='CardChanges__item'
                          key={change.date + change.id + change.description}
                        >
                          <FeedCardChange
                            {...change}
                            date={change.type}
                            author={change.id}
                          />
                        </li>
                      ))}
                  </ul>
                </section>
              ))
          : Object.keys(changesByCard)
              .sort((a, b) => sortCards()(getRawCardData(a), getRawCardData(b)))
              .map(id => (
                <section className='CardChanges__section' key={id}>
                  <Title className='CardChanges__title'>
                    {getCardName(id)}
                  </Title>
                  <ul className='CardChanges__list'>
                    {changesByCard[id].map(change => (
                      <li
                        className='CardChanges__item'
                        key={id + change.date + change.description}
                      >
                        <FeedCardChange
                          {...change}
                          date={parseDate(change.date)}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
      </Article.Narrow>
      <PageMeta
        title='Card Changes'
        description='Find all cards changes that ever happened on Stormbound'
      />
    </Article>
  )
}
