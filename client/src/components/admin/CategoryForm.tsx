/* Lib */
import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import Styled from 'styled-components'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import Flash from '../common/Flash'

/* Models */
import FlashModel from '../../models/FlashModel'

const StyledContainer = Styled(Container)`
  max-width: 800px;
  min-width: 400px;
`

const AddCatTitle = Styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  padding: 20px;
  margin-top: 20px;
`

const StyledSpan = Styled.span`
  display: block;
  margin: 10px;
  color: red;
`

const CategoryForm = (): any => {
  const [flash, setFlash] = useState<FlashModel | null>(null)
  const { register, handleSubmit, errors } = useForm()

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  const onSubmit = async (data: any, event: any) => {
    try {
      await axios.post('/api/category', data, config)
      setFlash({ message: 'Kategorin sparad', variant: 'success' })
      event.target.reset()
    } catch (err) {
      console.error(err)
      setFlash({
        message: 'Fel: Kategorin inte sparad',
        variant: 'danger'
      })
    }
  }

  return (
    <StyledContainer>
      <Row className='justify-content-md-center'>
        <Col sm={10}>
          <AddCatTitle>Lägg till kategori</AddCatTitle>
          {flash && <Flash flashModel={flash}></Flash>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='name'>
              <Form.Label>Namn</Form.Label>
              <Form.Control
                type='text'
                name='name'
                ref={register({ required: true, minLength: 1, maxLength: 50 })}
              />
              {errors.name && errors.name.type === 'required' && (
                <StyledSpan>Namn krävs</StyledSpan>
              )}
              {errors.name && errors.name.type === 'minLength' && (
                <StyledSpan>Namn måste ha minst 2 tecken</StyledSpan>
              )}
              {errors.name && errors.name.type === 'maxLength' && (
                <StyledSpan>Namn får ha max 50 tecken</StyledSpan>
              )}
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Beskrivning</Form.Label>
              <Form.Control
                type='text'
                as='textarea'
                name='description'
                ref={register({ required: true, minLength: 2, maxLength: 500 })}
              />
              {errors.description && errors.description.type === 'required' && (
                <StyledSpan>Beskrivning krävs</StyledSpan>
              )}
              {errors.description &&
                errors.description.type === 'minLength' && (
                  <StyledSpan>Beskrivning måste ha minst 2 tecken</StyledSpan>
              )}
              {errors.description &&
                errors.description.type === 'maxLength' && (
                  <StyledSpan>Beskrivning får ha max 500 tecken</StyledSpan>
              )}
            </Form.Group>
            <Button variant='info' type='submit'>
              Lägg till
            </Button>
          </Form>
        </Col>
      </Row>
    </StyledContainer>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(CategoryForm)
