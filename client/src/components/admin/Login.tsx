import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

/* Redux */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'

/* Lib */
import { useForm } from 'react-hook-form'

const LoginContainer = Styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: 30px;
  padding: 40px;
`

const AdminLogin = (props: any): any => {
  const history = useHistory()
  const {
    register,
    handleSubmit
    // errors
  } = useForm()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)

  const onSubmit = (data: any): void => {
    props.login(data.name, data.password)
  }

  useEffect((): void => {
    const { error, isAuthenticated, user } = props

    console.log('authenticated : ' + user)

    /* Add error handler here... figure out prevProps for hooks */
    if (error.id === 'LOGIN_FAIL') {
      setErrorMsgFromBackend(error.msg.message)
    } else {
      setErrorMsgFromBackend(null) // clear if error.id isn't LOGIN_FAIL
    }

    console.log(isAuthenticated)
    if (isAuthenticated && user.role === 'admin') {
      /* Hides modal as soon as the user is authenticated */
      /* TODO: push somewhere based on user role */
      history.push('/admin/panel')
    } else if (isAuthenticated && user.role !== 'admin') {
      history.push('/')
    }
  }, [props])

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            name="name"
            defaultValue="admin"
            placeholder="Enter email"
            ref={register({ required: true })}
          />
          <Form.Text className="text-muted" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            defaultValue="password123"
            placeholder="Password"
            ref={register({ required: true })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* {errors.password && <span>This field is required</span>} */}
        {errorMsgFromBackend && <span>{errorMsgFromBackend}</span>}
      </Form>
    </LoginContainer>
  )
}

AdminLogin.defaultProps = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired // authActions
}

const mapStateToProps = (state: any): any => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error // from authReducer
})

const mapDispatchToProps = (dispatch: any): any => {
  return {
    login: (username: string, password: string) =>
      dispatch(login({ username, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin)
