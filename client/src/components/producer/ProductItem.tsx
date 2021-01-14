/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Styled from 'styled-components'

/* Components */
import { Card, ListGroup, Button, Form } from 'react-bootstrap'

import { token } from '../../assets/functions/getTokenFromLocalStorage'

interface Product {
  id: number
  producer_id: number
  category_id: number
  name: string
  description: string
  stock: number
  unit: string
  image: any
}

interface Category {
  id: number
  name: string
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
        margin-left: 10px;
    }
`

const StyledSpan = Styled.span`
    display: block;
    margin: 10px;
    color: red;
`

const config: any = {
  headers: {
    'content-type': 'application/json',
    'x-auth-token': token()
  }
}

const configFormData: any = {
  headers: {
    'content-type': 'multipart/form-data',
    'x-auth-token': token()
  }
}

const ProductItem = ({
  product,
  categories,
  handleListUpdate,
  handleListDelete
}: any): any => {
  const [category, setCategory] = useState<Category>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm()

  useEffect(() => {
    const getCategory = async (id: number) => {
      const res = await axios.get(`/api/category/${id}`, config)
      setCategory(res.data)
    }
    getCategory(product.category_id)
  }, [product.category_id])

  const handleDelete = async (product: Product) => {
    try {
      handleListDelete(product)
      await axios.delete(`/api/product/${product.id}`, config)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  const updateProduct = async (data: any) => {
    if (isInvalidFile) {
      return
    }
    const { name, description, unit, stock, file, category } = data
    try {
      const formData = new FormData()
      formData.append(
        'product',
        JSON.stringify({ name, description, unit, stock, category })
      )
      formData.append('file', file[0])
      const res = await axios.put(
        `/api/product/${product.id}`,
        formData,
        configFormData
      )
      // API should return a product
      handleListUpdate(res.data)
      setIsEdit(false)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  const bufferToImage = (data: number[]) => {
    return Buffer.from(data).toString('base64')
  }

  const handleFileOnChange = (event: any) => {
    const file = event.target.files[0]
    if (!file.type.includes('image')) {
      setIsInvalidFile(true)
    } else {
      setIsInvalidFile(false)
    }
  }

  return (
    <>
      <StyledCard>
        <Card.Header>
          <span style={{ verticalAlign: 'middle' }}>{product.name}</span>
          <Button variant='danger' onClick={() => handleDelete(product)}>
            Ta Bort
          </Button>
          {!isEdit ? (
            <Button variant='info' onClick={() => setIsEdit(true)}>
              Ändra
            </Button>
          ) : null}
        </Card.Header>
        {product.image && (
          // TODO: Add mime type (must be sent from api?)
          <Card.Img
            style={{ height: '200px', objectFit: 'contain' }}
            variant='top'
            src={`data:image;base64,${bufferToImage(product.image.data)}`}
          />
        )}
        <Card.Body>
          {isEdit ? (
            <Form onSubmit={handleSubmit(updateProduct)}>
              <Form.Group controlId='name'>
                <Form.Label>Namn</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  defaultValue={product.name}
                  ref={register({
                    required: true,
                    minLength: 2,
                    maxLength: 50
                  })}
                />
                {errors.name && errors.name.type === 'required' && (
                  <StyledSpan>Namn krävs</StyledSpan>
                )}
                {errors.name && errors.name.type === 'minLength' && (
                  <StyledSpan>Namn måste minst 2 tecken</StyledSpan>
                )}
                {errors.name && errors.name.type === 'maxLength' && (
                  <StyledSpan>Namn får ha max 50 tecken</StyledSpan>
                )}
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  as='textarea'
                  name='description'
                  defaultValue={product.description}
                  ref={register({ maxLength: 500 })}
                />
                {errors.description &&
                  errors.description.type === 'maxLength' && (
                    <StyledSpan>Beskrivning får ha max 500 tecken</StyledSpan>
                )}
              </Form.Group>
              <Form.Group controlId='unit'>
                <Form.Label>Enhet</Form.Label>
                <Form.Control
                  name='unit'
                  defaultValue={product.unit}
                  as='select'
                  ref={register({ required: true })}
                >
                  <option>Styck</option>
                  <option>Kilogram</option>
                  <option>Hektogram</option>
                  <option>Gram</option>
                  <option>Liter</option>
                  <option>Deciliter</option>
                  <option>Milliliter</option>
                </Form.Control>
                {errors.unit && errors.unit.type === 'required' && (
                  <StyledSpan>Enhet krävs</StyledSpan>
                )}
              </Form.Group>
              <Form.Group controlId='stock'>
                <Form.Label>Antal i lager</Form.Label>
                <Form.Control
                  type='number'
                  name='stock'
                  defaultValue={product.stock}
                  ref={register({
                    required: true,
                    max: 10000
                  })}
                />
                {errors.stock && errors.stock.type === 'required' && (
                  <StyledSpan>Antal krävs</StyledSpan>
                )}
                {errors.stock && errors.stock.type === 'max' && (
                  <StyledSpan>Antal får max vara 10000</StyledSpan>
                )}
              </Form.Group>
              {category && (
                <Form.Group>
                  <Form.Label>Kategori</Form.Label>
                  <Form.Control
                    as='select'
                    name='category'
                    defaultValue={category.id}
                    ref={register({ required: true })}
                  >
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              <Form.Group>
                <Form.File onChange={handleFileOnChange} label='Bild' name='file' multiple ref={register} />
                {isInvalidFile && <StyledSpan>Denna filen stöds inte</StyledSpan>}
              </Form.Group>
              <Button variant='success' type='submit'>
                Spara
              </Button>
            </Form>
          ) : (
            <ListGroup>
              <ListGroup.Item>Antal: {product.stock}</ListGroup.Item>
              <ListGroup.Item>Enhet: {product.unit}</ListGroup.Item>
              <ListGroup.Item>
                Beskrivning: {product.description}
              </ListGroup.Item>
              {category && (
                <ListGroup.Item>Kategori: {category.name}</ListGroup.Item>
              )}
            </ListGroup>
          )}
        </Card.Body>
      </StyledCard>
    </>
  )
}

export default ProductItem
