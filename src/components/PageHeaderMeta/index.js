import React from 'react'
import { useFela } from 'react-fela'
import Icon from '../Icon'
import Link from '../Link'
import styles from './styles'

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

const PageHeaderMeta = ({ action, authors, meta }) => {
  const { css } = useFela()

  return (
    <p className={css(styles.meta)}>
      {authors.length > 0 && (
        <span>
          By&nbsp;{authors.reduce(renderAuthorsLinks, [])}
          {meta && <>&nbsp;·&nbsp;</>}
        </span>
      )}

      {meta}

      {Object.keys(action).length > 0 &&
        (action.onClick ? (
          <button
            type='button'
            onClick={action.onClick}
            disabled={action.disabled}
            className={css(styles.action) + ' ButtonAsLink'}
          >
            {action.icon && (
              <Icon icon={action.icon} extend={styles.actionIcon} />
            )}
            <span>{action.children}</span>
          </button>
        ) : (
          <Link
            to={action.to}
            href={action.href}
            inNewTab={!!action.href}
            extend={styles.action}
          >
            {action.to && action.icon !== 'arrow-right' && (
              <Icon
                icon={action.icon || 'arrow-left'}
                extend={styles.actionIcon}
              />
            )}
            <span>{action.children}</span>
            {(action.href || action.icon === 'arrow-right') && (
              <Icon
                icon={action.icon || 'arrow-right'}
                extend={styles.actionIcon}
              />
            )}
          </Link>
        ))}
    </p>
  )
}

export default React.memo(PageHeaderMeta)
