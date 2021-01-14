import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const UserRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        /* TODO: lägg till rest.user.role === 'admin' för ännu ett condition, så fort user object returneras av login */
        if (rest.auth) {
          return <Component {...props} />
        } else if (rest.auth === false) {
          return (
            <Redirect
              to={{
                pathname: '/admin',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(UserRoute)
