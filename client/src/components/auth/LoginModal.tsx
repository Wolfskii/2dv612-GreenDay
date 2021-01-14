/* Lib */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { login } from '../../actions/authActions'
import { useHistory } from 'react-router-dom'

/* Components */
import { Modal, Button, Form } from 'react-bootstrap'
import {
  InputError,
  XError,
  BackendErrorMessage
} from '../common/errors/ErrorMessages'
import RegisterModal from './RegisterModal'
/* CSS Custom Styles */
import './styles.css'

const LoginModal = (props: any): any => {
  const history = useHistory()
  const { register, handleSubmit, errors, watch } = useForm()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [registerModalShow, setRegisterModalShow] = React.useState(false)
  const [allowModal, setAllowModal] = React.useState(false)

  /* Manually toggles modal */
  const toggle = () => {
    props.onHide(true)
  }

  const toggleRegister = async () => {
    setAllowModal(true)
    toggle()
    setRegisterModalShow(true)
  }

  useEffect(() => {
    setDisabled(false)
  }, [watch()])

  const onSubmit = (data: any): void => {
    props.login(data.name, data.password)
  }

  useEffect(() => {
    setDisabled(false)
  }, [watch()])

  useEffect((): any => {
    const { error, isAuthenticated, show, user } = props

    /* Add error handler here... figure out prevProps for hooks */
    if (error.id === 'LOGIN_FAIL') {
      setErrorMsgFromBackend(error.msg.message)
      setDisabled(true)
    } else {
      setErrorMsgFromBackend(null) // clear if error.id isn't LOGIN_FAIL
    }

    if (isAuthenticated && show) {
      /* Hides modal as soon as the user is authenticated */
      /* TODO: push somewhere based on user role */
      const username: string = user.username
      const role: string = user.role
      toggle()
      history.push(
        `/${
          role === 'customer' ? 'customer' : role === 'producer' && 'producer'
        }/dashboard`
      )
    }
    /* Checks whether props updates. This is the same as componentDidUpdate. */
  }, [props])

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bg-mild"
      >
        <Modal.Header
          className="border-bottom-0"
          style={{ backgroundColor: '#159848' }}
          closeButton
        ></Modal.Header>
        <Modal.Body className="pb-5" style={{ backgroundColor: '#f3f3f3' }}>
          <div className="text-center">
            <h2 style={{ fontSize: '1em', fontWeight: 'bold' }}>Logga in</h2>
          </div>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="position-relative">
              <Form.Label style={{ fontSize: '.7em' }}>
                Användarnamn<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.name || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                type="name"
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <InputError text="Du måste skriva in ett användarnamn" />
              )}

              {(errors.name || errorMsgFromBackend) && <XError />}
            </Form.Group>
            {/* include validation with required or other standard HTML validation rules */}
            <Form.Group className="position-relative">
              <Form.Label style={{ fontSize: '.7em' }}>
                Lösenord<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.password || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                type="password"
                name="password"
                ref={register({ required: true })}
                // style={errors.name && {}}
              />
              {errors.password && (
                <InputError text="Du måste skriva in ett lösenord" />
              )}
              {(errors.password || errorMsgFromBackend) && <XError />}
              {errorMsgFromBackend && (
                <>
                  <div className="mb-0 mt-3 alert alert-danger">
                    {errorMsgFromBackend}
                  </div>
                </>
              )}
            </Form.Group>
            {/* errors will return when field validation fails  */}
            <div>
              <span
                style={{ fontSize: '.7em' }}
                className="text-muted d-block text-right"
              >
                Glömt lösenordet?
              </span>
            </div>
            <Button
              type="submit"
              className="w-100 mt-3 mb-3 rounded-pill bg-button border-0"
              disabled={disabled}
            >
              Logga in
            </Button>
          </Form>
          <Button
            variant="outline-dark"
            className="w-100 rounded-pill"
            onClick={() => toggleRegister()}
            // closeButton
          >
            Bli medlem
          </Button>
        </Modal.Body>
      </Modal>
      {/* Conditional rendering crucial or the modal will be triggered infinitely or a swap between the modals can only be done once :) */}
      {allowModal && (
        <RegisterModal
          show={registerModalShow}
          onHide={() => setRegisterModalShow(false)}
        />
      )}
    </>
  )
}

LoginModal.defaultProps = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired // authActions
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error // from authReducer
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (username: string, password: string) =>
      dispatch(login({ username, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
