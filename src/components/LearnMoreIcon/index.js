import React from 'react'
import { Link } from 'react-router-dom'
import QuestionMark from '../QuestionMark'
import './index.css'

const LearnMoreIcon = props => (
  <Link to={'/faq' + (props.anchor || '')} className='LearnMoreIcon'>
    <span className='visually-hidden'>
      {props.children || 'Learn more in the FAQ'}
    </span>
    <QuestionMark />
  </Link>
)

export default LearnMoreIcon
