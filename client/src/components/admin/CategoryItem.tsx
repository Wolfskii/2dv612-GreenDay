/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable multiline-ternary */
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

interface Category {
  id: number
  name: string
  description: string
}

const CategoryItem = ({
  category,
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

  const handleDelete = async (category: Category) => {
    try {
      handleListDelete(category)
      await axios.delete(`/api/category/${category.id}`, config)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  const updateCategory = async (data: any) => {
    try {
      await axios.put(`/api/category/${category.id}`, data, config)
      category.name = data.name
      category.description = data.description
      handleListUpdate(category)
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
          <h1>{category.name}</h1>
          <Button variant="danger" onClick={() => handleDelete(category)}>
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
            <Form onSubmit={handleSubmit(updateCategory)}>
              <Form.Group controlId="categoryName">
                <Form.Label>Namn</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={category.name}
                  ref={register({
                    required: true,
                    minLength: 1,
                    maxLength: 50
                  })}
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
              <Form.Group controlId="categoryDescription">
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  defaultValue={category.description}
                  ref={register({
                    required: true,
                    minLength: 2,
                    maxLength: 500
                  })}
                />
                {errors.description &&
                  errors.description.type === 'required' && (
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
              <Button variant="success" type="submit">
                Spara
              </Button>
            </Form>
          ) : (
            <ListGroup style={{ textAlign: 'left' }}>
              <ListGroup.Item>
                Beskrivning: {category.description}
              </ListGroup.Item>
            </ListGroup>
          )}
        </Card.Body>
      </StyledCard>
    </>
  )
}

export default CategoryItem
