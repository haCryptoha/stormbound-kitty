import React from 'react'
import { motion } from 'framer-motion'
import EyeCatcher from '../EyeCatcher'
import Footer from '../Footer'
import Header from '../Header'
import Only from '../Only'
import './index.css'

export default React.memo(function Layout(props) {
  return (
    <div className='Layout'>
      <Only.Desktop>
        <EyeCatcher id='donation-20200611'>
          Stormbound-Kitty is <span className='Highlight'>100% free</span>: no
          ads, no tracking, no paywall. If you can,{' '}
          <a
            href='https://gum.co/stormbound-kitty'
            target='_blank'
            rel='noopener noreferrer'
          >
            consider donating
          </a>
          !
        </EyeCatcher>
      </Only.Desktop>

      <Header active={props.active} />

      <main className='Layout__body'>
        <motion.div
          key='layout'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.8 }}
        >
          {props.children}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
})
