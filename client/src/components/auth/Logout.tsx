/* Lib */
import { Link, useHistory } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { NavLink } from 'react-bootstrap'

const Logout = (props: any): any => {
  // const history = useHistory()

  const toggle = () => {
    // history.push('/')
    props.logout()
  }

  return (
    <Link className="text-dark d-block" to="/" onClick={() => toggle()}>
      Logout
    </Link>
  )
}

Logout.defaultProps = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)
