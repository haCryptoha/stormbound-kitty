import React from 'react'
import { Link } from 'react-router-dom'
import HeaderBanner from '../HeaderBanner'
import './index.css'

export const renderAuthorsLinks = (acc, author, index, authors) => {
  if (authors.length > 1 && index === authors.length - 1) {
    acc.push(' and ')
  } else if (index !== 0) {
    acc.push(', ')
  }

  acc.push(
    <Link to={`/member/${author}`} key={author}>
      {author}
    </Link>
  )

  return acc
}

const Article = React.memo(function Article(props) {
  const backLink = props.backLink || {}
  const authors = (props.authors || [props.author]).filter(Boolean)

  return (
    <article className={['Article', props.className].filter(Boolean).join(' ')}>
      <HeaderBanner
        title={props.title}
        background={props.background}
        ratio={props.ratio}
        withAvif={props.withAvif}
        withoutWebp={props.withoutWebp}
      />

      <p className='Article__meta'>
        {authors.length > 0 && (
          <>
            <span className='Article__author'>
              By {authors.reduce(renderAuthorsLinks, [])}
            </span>
            {props.meta && <>&nbsp;·&nbsp;</>}
          </>
        )}
        {props.meta && <span>{props.meta}</span>}
        {Object.keys(backLink).length > 0 && (
          <Link {...backLink} className='Article__backLink' />
        )}
      </p>

      <div
        className={[
          'Article__content',
          props.noDropCap && 'Article__content--no-drop-cap',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}
      </div>
    </article>
  )
})

Article.FullWidth = React.memo(function FullWidth(props) {
  return (
    <div
      className='Article__fullwidth'
      style={{ ...props.style, '--padding': props.padding }}
    >
      {props.children}
    </div>
  )
})

export default Article
