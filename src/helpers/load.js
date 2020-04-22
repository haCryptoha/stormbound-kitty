import React from 'react'
import loadable from '@loadable/component'
import Loader from '../components/Loader'

const options = { fallback: <Loader /> }
const load = name => loadable(() => import('../components/' + name), options)

export default load
