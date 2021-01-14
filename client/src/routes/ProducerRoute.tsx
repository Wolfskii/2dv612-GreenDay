import React from 'react'
import { useHistory, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProducerRoute = ({ component: Component, ...rest }: any) => {
  const history = useHistory()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.auth && rest.user.role === 'producer') {
          // console.log(rest.auth)
          // console.log(rest)
          return <Component {...props} />
        } else if (rest.auth) {
          // console.log(rest.auth)
          // console.log(rest)
          return history.push('/customer')
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

export default connect(mapStateToProps)(ProducerRoute)
