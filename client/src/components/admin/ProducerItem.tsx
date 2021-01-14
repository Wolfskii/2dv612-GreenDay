/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* Lib */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Styled from 'styled-components'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Card, ListGroup, Button, Form } from 'react-bootstrap'

interface Producer {
  producer_id: number
  name: string
  org_nr: string
  description: string
}

const StyledCard = Styled(Card)`
    min-width: 400px;
    text-align: center;
    margin: 20px;
    h1 {
        text-align: left;
        float: left;
        font-size: 27px;
        margin: 7px;
    }

    Button {
        float: right;
        margin: 5px;
    }
`

const StyledSpan = Styled.span`
    display: block;
    margin: 10px;
    color: red;
`

const ProducerItem = ({
  producer,
  handleListUpdate,
  handleListDelete
}: any): any => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm()

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  const handleDelete = async (producer: Producer) => {
    try {
      handleListDelete(producer)
      await axios.delete(`/api/delete/${producer.producer_id}`, config)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  const updateProducer = async (data: any) => {
    try {
      await axios.put(`/api/producer/${producer.producer_id}`, data, config)
      producer.name = data.name
      producer.org_nr = data.org_nr
      producer.description = data.description
      handleListUpdate(producer)
      setIsEdit(false)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  return (
    <>
      <StyledCard>
        <Card.Header>
          <h1>{producer.name}</h1>
          <Button variant="danger" onClick={() => handleDelete(producer)}>
            Ta Bort
          </Button>
          {!isEdit ? (
            <Button variant="info" onClick={() => setIsEdit(true)}>
              Ändra
            </Button>
          ) : null}
        </Card.Header>
        <Card.Body>
          {isEdit ? (
            <Form onSubmit={handleSubmit(updateProducer)}>
              <Form.Group controlId="businessName">
                <Form.Label>Företagsnamn</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={producer.name}
                  ref={register({
                    required: true,
                    minLength: 2,
                    maxLength: 50
                  })}
                />
                {errors.name && errors.name.type === 'required' && (
                  <StyledSpan>Företagsnamn krävs</StyledSpan>
                )}
                {errors.name && errors.name.type === 'minLength' && (
                  <StyledSpan>Företagsnamn måste minst 2 tecken</StyledSpan>
                )}
                {errors.name && errors.name.type === 'maxLength' && (
                  <StyledSpan>Företagsnamn får ha max 50 tecken</StyledSpan>
                )}
              </Form.Group>
              <Form.Group controlId="organisationNumber">
                <Form.Label>Organisationsnummer</Form.Label>
                <Form.Control
                  type="text"
                  name="org_nr"
                  defaultValue={producer.org_nr}
                  ref={register({
                    required: true,
                    minLength: 10,
                    maxLength: 10
                  })}
                />
                {errors.org_nr && errors.org_nr.type === 'required' && (
                  <StyledSpan>Organisationsnummer krävs</StyledSpan>
                )}
                {errors.org_nr && errors.org_nr.type === 'minLength' && (
                  <StyledSpan>
                    Organisationsnummer måste ha minst 10 tecken
                  </StyledSpan>
                )}
                {errors.org_nr && errors.org_nr.type === 'maxLength' && (
                  <StyledSpan>
                    Organisationsnummer får ha max 11 tecken
                  </StyledSpan>
                )}
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  defaultValue={producer.description}
                  ref={register({ maxLength: 500 })}
                />
                {errors.description &&
                  errors.description.type === 'maxLength' && (
                    <StyledSpan>Beskrivning får ha max 500 tecken</StyledSpan>
                )}
              </Form.Group>
              <Button variant="success" type="submit">
                Spara
              </Button>
            </Form>
          ) : (
            <ListGroup style={{ textAlign: 'left' }}>
              <ListGroup.Item>Användarnamn: {producer.username}</ListGroup.Item>
              <ListGroup.Item>Email: {producer.email}</ListGroup.Item>
              <ListGroup.Item>Orgnummer: {producer.org_nr}</ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </StyledCard>
    </>
  )
}

export default ProducerItem
