/* Lib */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { registerCustomer } from '../../actions/authActions'

/* Components */
import { Modal, Button, Form } from 'react-bootstrap'
import {
  InputError,
  XError,
  BackendErrorMessage
} from '../common/errors/ErrorMessages'
import LoginModal from './LoginModal'

/* CSS Custom Styles */
import './styles.css'

type Inputs = {
  username: string
  email: string
  firstname: string
  lastname: string
  password: string
  repeatPassword: string
  phone: string
}

const RegisterModal = (props: any): any => {
  const history = useHistory()
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [samePassword, setSamePassword] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)

  /* Login modal */
  const [loginModalShow, setLoginModalShow] = React.useState(false)
  const [allowModal, setAllowModal] = React.useState(false)

  /* Manually toggles modal */
  const toggle = () => {
    props.onHide(true)
  }

  const toggleLogin = () => {
    setAllowModal(true)
    toggle()
    setLoginModalShow(true)
  }

  const onSubmit = (data: any) => {
    if (samePassword) {
      props.registerCustomer(data) // attempt registration from Register.defaultProps below
    }
  }

  /* Register fails set disabled true on button. This sets it back to false whenever an input is changed. */
  useEffect(() => {
    setDisabled(false)
  }, [watch()])

  /* This useEffect is called when password/repeatPassword is changed */
  useEffect(() => {
    if (watch('password') === watch('repeatPassword')) {
      setSamePassword(true)
    } else {
      setSamePassword(false)
    }
  }, [watch('password'), watch('repeatPassword')])

  useEffect(() => {
    console.log('auth')
    const { error, isAuthenticated, show, user } = props

    /* Add error handler here... figure out prevProps for hooks */
    if (error.id === 'REGISTER_FAIL') {
      setErrorMsgFromBackend(error.msg)
      setDisabled(true)
    } else {
      setErrorMsgFromBackend(null) // clear if error.id isn't REGISTER_FAIL
    }

    if (isAuthenticated && show) {
      const username: string = user.username
      const role: string = user.role
      toggle() // hides modal
      history.push(
        `/${
          role === 'customer' ? 'customer' : role === 'producer' && 'producer'
        }/dashboard`
      )
    }
  }, [props])

  return (
    <>
      <Modal
        {...props}
        size='medium'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className='bg-mild'
        // onExited={() => setLoginModalShow(true)}
      >
        <Modal.Header
          className='border-bottom-0'
          style={{ backgroundColor: '#159848' }}
          closeButton
        ></Modal.Header>
        <Modal.Body className='pb-5' style={{ backgroundColor: '#f3f3f3' }}>
          <div className='text-center'>
            <h2 style={{ fontSize: '1em', fontWeight: 'bold' }}>
              Registrera dig
            </h2>
            <p className='pl-5 pr-5' style={{ fontSize: '.7em' }}>
              Bli medlem, missa inte de senaste rabatterna på lokalt odlade grönsakerna!
            </p>
          </div>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Användarnamn<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.username || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                name='username'
                type='username'
                defaultValue='fredricfarholt'
                ref={register({ required: true, minLength: 6 })}
              />
              {errors.username && errors.username.type === 'required' && (
                <InputError text='Du måste skriva in ett användarnamn' />
              )}
              {errors.username && errors.username.type === 'minLength' && (
                <InputError text='Användarnamn måste ha minst 6 tecken' />
              )}
              {(errors.username || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Epostadress<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.email || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                defaultValue='fredricfarholt@live.se'
                type='email'
                name='email'
                ref={register({ required: true })}
              />
              {errors.email && (
                <InputError text='Skriv in en giltig epostadress' />
              )}
              {(errors.email || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Förnamn<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.firstname || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                defaultValue='Fredric'
                name='firstname'
                ref={register({ required: true })}
              />
              {errors.firstname && (
                <InputError text='Ett förnamn krävs! Vi kommer inte dela det med någon' />
              )}
              {(errors.firstname || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Efternamn<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.lastname || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                defaultValue='Färholt'
                name='lastname'
                ref={register({ required: true })}
              />
              {errors.lastname && (
                <InputError text='Ett efternamn krävs! Vi kommer inte dela det med någon' />
              )}
              {(errors.lastname || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Lösenord<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.password || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                type='password'
                name='password'
                defaultValue='hejhej'
                ref={register({ required: true })}
              />
              {errors.password && (
                <InputError text='Skriv in ett giltigt lösenord om minst 6 tecken' />
              )}
              {(errors.password || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Bekräfta Lösenord<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.password || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                type='password'
                name='repeatPassword'
                defaultValue='hejhej'
                ref={register({ required: true })}
              />
              {errors.password && (
                <InputError text='Skriv in ett giltigt lösenord om minst 6 tecken' />
              )}
              {(errors.repeatPassword || errorMsgFromBackend) && <XError />}
            </Form.Group>

            <Form.Group className='position-relative mb-3'>
              <Form.Label style={{ fontSize: '.7em' }}>
                Telefonnummer<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                className={
                  errors.phone || errorMsgFromBackend
                    ? 'border-danger rounded-pill'
                    : 'rounded-pill'
                }
                name='phone'
                ref={register({ required: true, minLength: 10 })}
              />
              {errors.phone && errors.phone.type === 'required' && (
                <InputError text='Skriv in ett mobilnummer. Används för aviseringar av varor' />
              )}
              {errors.phone && errors.phone.type === 'minLength' && (
                <InputError text='Mobilnummer måste ha minst 10 siffror' />
              )}
              {(errors.phone || errorMsgFromBackend) && <XError />}
            </Form.Group>

            {errorMsgFromBackend && (
              <BackendErrorMessage text={errorMsgFromBackend} />
            )}
            {!samePassword && (
              <BackendErrorMessage text={'Lösenorden matchar inte'} />
            )}
            <Button
              type='submit'
              className='border-0 w-100 mt-3 mb-3 rounded-pill bg-button border-0'
              disabled={disabled}
            >
              Registrera
            </Button>
            <Button
              variant='outline-dark'
              className='w-100 rounded-pill'
              onClick={() => {
                toggleLogin()
              }}
            >
              Redan medlem? Logga in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Conditional rendering crucial or the modal will be triggered infinitely or a swap between the modals can only be done once :) */}
      {allowModal && (
        <LoginModal
          show={loginModalShow}
          onHide={() => setLoginModalShow(false)}
        />
      )}
    </>
  )
}

RegisterModal.defaultProps = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerCustomer: PropTypes.func.isRequired // authActions
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error // from authReducer
})

export default connect(mapStateToProps, { registerCustomer })(RegisterModal)
