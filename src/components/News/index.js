import React from 'react'
import news from '../../data/news'
import Column from '../Column'
import CTA from '../CTA'
import Row from '../Row'
import chunk from '../../helpers/chunk'
import './index.css'

const MAX_NEWS = 7

const News = props => {
  const pages = chunk(news, MAX_NEWS)
  const [activePage, setActivePage] = React.useState(0)
  const loadPrev = () => setActivePage(page => page + 1)
  const loadNext = () => setActivePage(page => page - 1)

  return (
    <>
      <ul className='News'>
        {pages[activePage].map((news, index) => (
          <li className='News__item' key={index}>
            <a href={news.link}>
              <strong>{news.intro}:</strong>
            </a>{' '}
            {news.description}
          </li>
        ))}
      </ul>
      <Row desktopOnly>
        <Column>
          <CTA type='button' onClick={loadNext} disabled={activePage === 0}>
            Recent news
          </CTA>
        </Column>
        <Column>
          <CTA
            type='button'
            onClick={loadPrev}
            disabled={activePage === pages.length - 1}
          >
            Older news
          </CTA>
        </Column>
      </Row>
    </>
  )
}

export default News
