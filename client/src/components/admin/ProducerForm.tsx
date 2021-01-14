/* Lib */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import Styled from 'styled-components'
import axios from 'axios'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import Flash from '../common/Flash'

/* Models */
import FlashModel from '../../models/FlashModel'

const AddProdTitle = Styled.h1`
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  margin-top: 20px;
`

const StyledContainer = Styled(Container)`
  max-width: 800px;
  min-width: 400px;
`

const StyledSpan = Styled.span`
  color: red;
`

const ProducerForm = (props: any): any => {
  const [flash, setFlash] = useState<FlashModel | null>(null)
  const { register, handleSubmit, errors } = useForm()

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  const onSubmit = async (data: any, event: any): Promise<void> => {
    try {
      await axios.post('/api/register/producer', data, config)
      setFlash({ message: 'Producenten sparad', variant: 'success' })
      event.target.reset()
    } catch (err) {
      console.error(err)
      setFlash({
        message: 'Fel: Producenten inte sparad',
        variant: 'danger'
      })
    }
  }

  return (
    <StyledContainer>
      <Row className="justify-content-md-center">
        <Col sm={10}>
          <AddProdTitle>Lägg till producent</AddProdTitle>
          {flash && <Flash flashModel={flash}></Flash>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Användarnamn</Form.Label>
              <Form.Control
                type="text"
                name="username"
                ref={register({ required: true, minLength: 3, maxLength: 20 })}
              />
              {errors.username && errors.username.type === 'required' && (
                <StyledSpan>Du måste ange ett användarnamn</StyledSpan>
              )}
              {errors.username && errors.username.type === 'minLength' && (
                <StyledSpan>Användarnamn ej tillåtet</StyledSpan>
              )}
              {errors.username && errors.username.type === 'maxLength' && (
                <StyledSpan>Användarnamn för långt</StyledSpan>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                name="password"
                defaultValue="hejhejhej"
                ref={register({ required: true, minLength: 8, maxLength: 100 })}
              />
              {errors.password && errors.password.type === 'required' && (
                <StyledSpan>Du måste ange ett lösenord</StyledSpan>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <StyledSpan>Lösenordet måste ha minst 8 tecken</StyledSpan>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <StyledSpan>
                  Lösenordet får inte vara längre än 100 tecken
                </StyledSpan>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue="larsson@livelive.se"
                ref={register({ required: true, maxLength: 150 })}
              />
              {errors.email && errors.email.type === 'required' && (
                <StyledSpan>Du måste ange en emailadress</StyledSpan>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <StyledSpan>
                  Emailadressen får inte vara längre än 150 tecken
                </StyledSpan>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Företagsnamn</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue="Larssons Gröna AB"
                ref={register({ required: true, minLength: 3, maxLength: 100 })}
              />
              {errors.name && errors.name.type === 'required' && (
                <StyledSpan>Du måste ange ett företagsnamn</StyledSpan>
              )}
              {errors.name && errors.name.type === 'minLength' && (
                <StyledSpan>Företagsnamnet för kort</StyledSpan>
              )}
              {errors.name && errors.name.type === 'maxLength' && (
                <StyledSpan>För långt företagsnamn</StyledSpan>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Organisationsnummer</Form.Label>
              <Form.Control
                type="text"
                name="orgnr"
                defaultValue="12345678910"
                ref={register({ required: true, minLength: 10, maxLength: 12 })}
              />
              {errors.orgnr && (
                <StyledSpan>Du måste ange ett organisationsnummer</StyledSpan>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Beskrivning</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                name="description"
                defaultValue="Jag är ett företag, hehe."
                ref={register({ maxLength: 500 })}
              />
            </Form.Group>
            <Button variant="info" type="submit">
              Lägg till
            </Button>
          </Form>
        </Col>
      </Row>
    </StyledContainer>
  )
}

const mapStateToProps = (state: any): any => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(ProducerForm)
