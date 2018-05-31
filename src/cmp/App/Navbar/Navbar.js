import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import makeBem from 'bem-cx'

import {constants} from 'utils/constants/index'
import {translate, keys} from 'utils/translate/index'

import {LocaleSwitch} from './LocaleSwitch'

const cn = makeBem('Navbar')

export const Navbar = props => (
  <div className={cn}>
    <h1>
      <Link to={constants.paths.MAP_PAGE}>G&G</Link>
    </h1>
    <LocaleSwitch/>
    {props.isUser && <button onClick={props.logout}>{translate(keys.LOGOUT)}</button>}
  </div>
)

Navbar.propTypes = {
  isUser: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
