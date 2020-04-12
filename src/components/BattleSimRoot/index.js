import React, { Fragment } from 'react'
import App from '../BattleSimApp'
import PageMeta from '../PageMeta'

const BattleSimRoot = props => (
  <Fragment>
    <h1 className='visually-hidden'>Battle Simulator</h1>

    <App mode='EDITOR' />

    <PageMeta
      title='Battle Simulator'
      description='Create your own Stormbound battles.'
    />
  </Fragment>
)

export default BattleSimRoot
