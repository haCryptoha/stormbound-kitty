import React from 'react'
import Column from '../Column'
import CTA from '../CTA'
import Only from '../Only'
import Row from '../Row'
import './index.css'

const Banner = props => (
  <div
    className={`Banner ${props.className || ''}`}
    style={{
      '--color': `var(--${props.faction}, rgba(222, 215, 164, 0.5))`,
    }}
  >
    <div className='Banner__inner'>
      <Row desktopOnly wideGutter>
        <Column width={66}>
          <h2 className='Banner__title'>{props.title}</h2>
          <p className='Banner__subline'>{props.subline}</p>
          <p className='Banner__copy'>{props.copy}</p>
          <CTA className='Banner__CTA' {...props.cta} />
        </Column>
        <Only.Desktop>
          <Column width={33}>
            <img src={props.image} alt='' className='Banner__image' />
          </Column>
        </Only.Desktop>
      </Row>
    </div>
  </div>
)

export default Banner
