import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = React.memo(({ active, children, to }) => (
  <Link
    to={to}
    children={children}
    className={['Header__link', active && 'Header__link--active']
      .filter(Boolean)
      .join(' ')}
  />
))

export default NavLink
