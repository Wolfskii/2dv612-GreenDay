import React from 'react'
import { useHistory, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminRoute = ({ component: Component, ...rest }: any) => {
  const history = useHistory()

  return (
    <Route
      {...rest}
      render={(props) => {
        /* TODO: lägg till rest.user.role === 'admin' för ännu ett condition, så fort user object returneras av login */
        if (rest.auth && rest.user.role === 'admin') {
          console.log(rest.auth)
          return <Component {...props} />
        } else if (rest.auth) {
          console.log(rest.auth)
          return history.push('/admin')
          // <Redirect
          //   to={{
          //     pathname: '/admin',
          //     state: {
          //       from: props.location
          //     }
          //   }}
          // />
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

export default connect(mapStateToProps)(AdminRoute)
