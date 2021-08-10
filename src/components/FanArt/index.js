import React from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import Image from '../Image'
import Article from '../Article'
import Loader from '../Loader'
import PageMeta from '../PageMeta'
import artworks from '../../data/artworks'
import shuffle from '../../helpers/shuffle'
import useLazyLoad from '../../hooks/useLazyLoad'
import styles from './styles'

export default React.memo(function FanArt(props) {
  const { css } = useFela()
  const entries = React.useMemo(() => shuffle(artworks), [])
  const { loading, items, ref } = useLazyLoad(entries, 3)

  return (
    <Article title='Fan Art'>
      <Article.Narrow>
        <p>
          All illustrations displayed on this page have been collected from the
          official Discord and Reddit, and all credits go to their respective
          author. If you are the author of an artwork showcased on this page and
          would like to have it removed, contact Kitty#1909 on Discord.
        </p>
      </Article.Narrow>

      <Masonry
        breakpointCols={{
          default: 3,
          1100: 3,
          700: 2,
          500: 1,
        }}
        className={css(styles.wrapper)}
        columnClassName={css(styles.item)}
      >
        {items.map(entry => (
          <figure className={css(styles.art)} key={entry.image}>
            <Image
              src={'/assets/images/art/' + entry.image}
              alt={'Artwork by ' + entry.author}
              extend={styles.image}
            />
            <figcaption className={css(styles.caption)}>
              Artwork by{' '}
              <Link to={'/member/' + entry.author}>{entry.author}</Link>
            </figcaption>
          </figure>
        ))}
      </Masonry>

      {loading && <Loader />}
      <div ref={ref} />

      <PageMeta
        title='Fan Art'
        description='Find the amazing visual artwork created by the Stormbound community'
      />
    </Article>
  )
})
