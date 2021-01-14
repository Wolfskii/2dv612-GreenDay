/* Lib */
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

/* Components */
import { Navbar, NavItem, DropdownButton, Dropdown, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import Logout from '../auth/Logout'
import { LinkContainer } from 'react-router-bootstrap'
import Notifications from './NotificationContainer'
import './style.css'

/* This is a temp navbar */
const NavbarContainer = (props: any): any => {
  const [registerModalShow, setRegisterModalShow] = React.useState(false)
  const [loginModalShow, setLoginModalShow] = React.useState(false)

  /* From default props below this function component */

  const { isAuthenticated, user } = props.auth // grabs initiatState from authReducer

  /* Only shown when logged in */
  const authLinks = (
    <>
      <Logout />
    </>
  )

  /* Only shown when logged out */
  const guestLinks = (
    <>
      <Nav.Link
        onClick={() => setRegisterModalShow(true)}
        style={{ color: '#fff' }}
      >
        Registrera
      </Nav.Link>
      <Nav.Link
        onClick={() => setLoginModalShow(true)}
        style={{ color: '#fff' }}
      >
        Logga in
      </Nav.Link>
    </>
  )

  const role = (): string => {
    let link = ''

    switch (user.role) {
      case 'admin':
        link = '/admin/panel'
        break
      case 'producer':
        link = '/producer/dashboard'
        break
      default:
        link = '/customer/dashboard'
    }

    return link
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#159848' }}>
        <a className="navbar-brand" href="/">GreenDay</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                <LinkContainer to="/om-oss" className="text-light">
                  <Nav.Link>Om oss</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/annonser" className="text-light">
                  <Nav.Link>Annonser</Nav.Link>
                </LinkContainer>
                {!isAuthenticated && guestLinks}
          </div>

          <div className="right-menu">
            {isAuthenticated && <Notifications />}

            {isAuthenticated && (
              <DropdownButton
                variant="light"
                className="text-light"
                menuAlign="right"
                title={`Hej, ${user.username}! `}
                id="dropdown-menu-align-right"
              >
                <Dropdown.ItemText className="username-dropdown">
                  {user.username}
                </Dropdown.ItemText>
                <Dropdown.Item as="button">
                  <Link to={role()}>Dashboard</Link>
                </Dropdown.Item>
                <Dropdown.ItemText>{authLinks}</Dropdown.ItemText>
              </DropdownButton>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      <RegisterModal
        show={registerModalShow}
        onHide={() => setRegisterModalShow(false)}
      />
      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </>
  )
}

NavbarContainer.defaultProps = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(NavbarContainer)
