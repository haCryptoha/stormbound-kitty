import React from 'react'
import { useFela } from 'react-fela'
import Link from '../Link'
import Icon from '../Icon'
import NewPulse from '../NewPulse'
import Row from '../Row'
import styles from './styles'

const useOutsideAlerter = (props, ref) => {
  const { open, close } = props

  const handleClickOutside = React.useCallback(
    event => {
      if (open && ref.current && !ref.current.contains(event.target)) close()
    },
    [ref, open, close]
  )

  React.useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => document.removeEventListener('mouseup', handleClickOutside)
  }, [handleClickOutside])
}

export default React.memo(function HeaderMegaMenu(props) {
  const { css } = useFela({ isOpen: props.open })
  const ref = React.useRef(null)

  useOutsideAlerter(props, ref)

  return (
    <div
      ref={ref}
      className={css(styles.menu)}
      style={{ '--columns': props.columns.length }}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
    >
      <Row desktopOnly>
        {props.columns.map((column, index) => (
          <Row.Column width={`1/${props.columns.length}`} key={index}>
            <h2 className={css(styles.title)}>
              {column.icon ? (
                <Icon icon={column.icon} extend={styles.icon} />
              ) : null}
              {column.to ? (
                <Link to={column.to}>{column.title}</Link>
              ) : (
                column.title
              )}
            </h2>
            <ul className={css(styles.list)}>
              {column.items.map(item => (
                <li key={item.label} className={css(styles.item)}>
                  <Link
                    href={item.href}
                    to={item.to}
                    inNewTab={!!item.href}
                    extend={styles.link({
                      isActive: props.active.includes(item.id),
                    })}
                  >
                    {item.label}
                    {item.href && (
                      <Icon icon='arrow-top-right' extend={styles.newTab} />
                    )}
                  </Link>
                  {item.new && <NewPulse />}
                </li>
              ))}
            </ul>
          </Row.Column>
        ))}
      </Row>
      {props.close && (
        <button
          type='button'
          onClick={props.close}
          aria-label='Close menu'
          className={css(styles.close)}
        >
          &times;
        </button>
      )}
    </div>
  )
})
