import React from 'react'
import { useFela } from 'react-fela'
import { useRouteMatch, useHistory, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../Card'
import CTA from '../CTA'
import HeaderBanner from '../HeaderBanner'
import Info from '../Info'
import Input from '../Input'
import Notice from '../Notice'
import NumberInput from '../NumberInput'
import PageMeta from '../PageMeta'
import ResetButton from '../ResetButton'
import Row from '../Row'
import Select from '../Select'
import ShareDialog from '../ShareDialog'
import Title from '../Title'
import openBook from '../../helpers/openBook'
import getBookName from '../../helpers/getBookName'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import serialisation from '../../helpers/serialisation'
import useViewportSize from '../../hooks/useViewportSize'
import { BOOKS } from '../../constants/books'
import styles from './styles'

const ShareButton = ({ disabled }) => (
  <ShareDialog
    label='Share book'
    disabled={disabled}
    image='/assets/images/cards/rogue_sheep.png'
    extend={{ margin: '1em auto 0' }}
  >
    <p>
      Your book is automatically saved to the URL of the page as you open it.
      You can safely reload the page, or bookmark it to come back to it later.
    </p>

    <p>
      If you would like to share your book with others, you can easily do so
      with the button below.
    </p>
  </ShareDialog>
)

const getCardsFromURL = id => {
  try {
    return serialisation.cards.deserialise(id).map(getResolvedCardData)
  } catch (error) {
    return []
  }
}

const CustomBookFields = ({
  amount,
  setAmount,
  expectations,
  setExpectations,
}) => {
  const setExpectation = React.useCallback(
    (index, value) => {
      setExpectations(expectations => [
        ...expectations.slice(0, index),
        value === '' ? '' : Number(value),
        ...expectations.slice(index + 1),
      ])
    },
    [setExpectations]
  )
  const setCommonExpectation = React.useCallback(
    value => setExpectation(0, value),
    [setExpectation]
  )
  const setRareExpectation = React.useCallback(
    value => setExpectation(1, value),
    [setExpectation]
  )
  const setEpicExpectation = React.useCallback(
    value => setExpectation(2, value),
    [setExpectation]
  )
  const setLegendaryExpectation = React.useCallback(
    value => setExpectation(3, value),
    [setExpectation]
  )

  return (
    <>
      <Row>
        <Row.Column>
          <Input
            label='Amount of cards'
            type='number'
            id='amount'
            required
            min={1}
            max={10}
            value={amount}
            onChange={event => setAmount(+event.target.value)}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <NumberInput
            label='Common (%)'
            name='common'
            id='common'
            min={0}
            max={100}
            onChange={setCommonExpectation}
            value={expectations[0]}
          />
        </Row.Column>
        <Row.Column>
          <NumberInput
            label='Rare (%)'
            name='rare'
            id='rare'
            min={0}
            max={100}
            onChange={setRareExpectation}
            value={expectations[1]}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <NumberInput
            label='Epic (%)'
            name='epic'
            id='epic'
            min={0}
            max={100}
            onChange={setEpicExpectation}
            value={expectations[2]}
          />
        </Row.Column>
        <Row.Column>
          <NumberInput
            label='Legendary (%)'
            name='legendary'
            id='legendary'
            min={0}
            max={100}
            onChange={setLegendaryExpectation}
            value={expectations[3]}
          />
        </Row.Column>
      </Row>
    </>
  )
}

const BookOpeningSimulator = props => {
  const { css } = useFela()
  const history = useHistory()
  const { params } = useRouteMatch()
  const { viewportWidth } = useViewportSize()
  const container = React.useRef(null)
  const [bookType, setBookType] = React.useState('')
  const [cards, setCards] = React.useState(getCardsFromURL(params.id))
  const [amount, setAmount] = React.useState(1)
  const [expectations, setExpectations] = React.useState([25, 25, 25, 25])

  const isFormValid = React.useMemo(
    () =>
      bookType === 'CUSTOM'
        ? expectations.reduce((a, b) => a + b, 0) === 100
        : Boolean(bookType),
    [bookType, expectations]
  )

  const reset = React.useCallback(() => {
    setBookType('')
    setCards([])
    setAmount(1)
    setExpectations([25, 25, 25, 25])
  }, [])

  const open = React.useCallback(
    event => {
      event.preventDefault()

      const book =
        bookType !== 'CUSTOM'
          ? BOOKS[bookType]
          : {
              draws: amount,
              percentiles: expectations.map(expectation => expectation / 100),
            }

      setCards(openBook(book))
    },
    [bookType, expectations, amount]
  )

  React.useEffect(() => {
    history.replace(
      ['/simulators/books', serialisation.cards.serialise(cards)]
        .filter(Boolean)
        .join('/')
        .toLowerCase()
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards])

  return (
    <>
      <HeaderBanner
        title='Book Simulator'
        background='/assets/images/wallpapers/lite/wp-d-6.png'
      />

      <Row desktopOnly wideGutter>
        <Row.Column width='1/3'>
          <Title>What is this</Title>
          <p>
            This is a small book opening simulator. It has no purpose other than
            enjoying the thrill of opening a new book. Pick the type of book you
            want to open, click the “Open” button below and see what you found!
          </p>
          <form onSubmit={open}>
            <Select
              label='Book type'
              id='bookType'
              required
              value={bookType}
              onChange={event => setBookType(event.target.value)}
              className={css({ marginBottom: '2em' })}
            >
              <option value=''>Pick a book type</option>
              {Object.keys(BOOKS).map(bookType => (
                <option value={bookType} key={bookType}>
                  {getBookName(bookType)} ({BOOKS[bookType].draws})
                </option>
              ))}
              <option value='CUSTOM'>Custom Book</option>
            </Select>
            {bookType === 'CUSTOM' && (
              <CustomBookFields
                amount={amount}
                setAmount={setAmount}
                expectations={expectations}
                setExpectations={setExpectations}
              />
            )}
            <Row>
              <Row.Column>
                <CTA type='submit' disabled={!isFormValid}>
                  Open
                </CTA>
              </Row.Column>
              <Row.Column>
                <ResetButton
                  label='Reset'
                  confirm='Are you sure you want to reset the book?'
                  reset={reset}
                  disabled={cards.length === 0}
                />
              </Row.Column>
            </Row>
            <Row>
              <Row.Column>
                <ShareButton disabled={cards.length === 0} />
              </Row.Column>
            </Row>
          </form>

          <Info icon='equalizer' title='Book Odds Calculator'>
            <p>
              If you are looking to figure out the odds of finding a certain
              card or type of cards when opening in-game books, have a look at
              the <Link to='/calculators/books'>Book Odds Calculator</Link>.
            </p>
          </Info>
        </Row.Column>
        <Row.Column width='2/3'>
          <Title>Your book contains…</Title>

          {cards.length ? (
            <div
              ref={container}
              style={{
                '--cards-per-row': viewportWidth > 700 ? 3 : 2,
              }}
            >
              <motion.ul className={css(styles.list)}>
                {cards.map((card, index) => (
                  <motion.li
                    className={css(styles.item)}
                    id={'card-' + card.id}
                    key={card.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      ease: 'easeOut',
                      duration: 0.3,
                      delay: index * 0.25,
                    }}
                  >
                    <Card {...card} key={card.id} />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ) : (
            <Notice icon='stack'>
              Pick a book type and open your book to see what’s inside!
            </Notice>
          )}
        </Row.Column>
      </Row>

      <PageMeta
        title='Book Opening Simulator'
        description='Recreate the thrill of opening books by playing with this simulator, opening the books of your choice!'
      />
    </>
  )
}

export default React.memo(BookOpeningSimulator)
