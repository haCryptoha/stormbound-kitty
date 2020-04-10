import React, { Fragment } from 'react'
import CTA from '../CTA'
import Checkbox from '../Checkbox'
import Dialog from '../Dialog'
import Share from '../Share'
import './index.css'

const BSShareButton = props => {
  const dialog = React.useRef(null)
  const [hideInterface, setHideInterface] = React.useState(false)
  const url = window.location.href

  const open = () => dialog.current.show()
  const close = () => dialog.current.hide()

  return (
    <Share url={hideInterface ? url + '/display' : url}>
      {({ share, hasCopied, canUseShareAPI }) => (
        <Fragment>
          <CTA onClick={open} type='button'>
            Share board
          </CTA>

          <Dialog
            id='deck-builder-save-dialog'
            title='Share board'
            dialogRef={instance => (dialog.current = instance)}
            image='/assets/images/cards/olf_the_hammer.png'
            close={close}
            ctaProps={{
              onClick: share,
              type: 'button',
              disabled: hasCopied,
              children: hasCopied
                ? '✓ Copied!'
                : canUseShareAPI
                ? 'Share board'
                : 'Copy link',
            }}
          >
            <p>
              Your board is automatically saved to the URL of the page as you
              work on it. You can safely reload the page, or bookmark it to come
              back to it later.
            </p>

            <p>
              If you would like to share your board with others, you can easily
              do so with the button below.
            </p>

            <div className='BSShareButton__checkbox'>
              <Checkbox
                name='hide-interface'
                id='hide-interface'
                checked={hideInterface}
                onChange={event => setHideInterface(event.target.checked)}
              >
                Hide editing interface
              </Checkbox>
            </div>
          </Dialog>
        </Fragment>
      )}
    </Share>
  )
}

export default BSShareButton
