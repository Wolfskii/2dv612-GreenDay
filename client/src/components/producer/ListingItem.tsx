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

interface Listing {
  id: number
  producer_id: number
  product_id: number
  title: string
  description: string
  price_per_unit: string
  min_quantity: number
  delivery_method: string
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

const ListingItem = ({
  listing,
  handleListUpdate,
  handleListDelete
}: any): any => {
  const [products, setProducts] = useState<any>()
  const [product, setProduct] = useState<any>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm()

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/product', config)
      setProducts(res.data)
      console.log(listing)
    } catch (err) {
      console.error(err)
    }
  }

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${listing.product_id}`, config)
      setProduct(res.data)
      console.log(listing)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getProducts()
    getProduct()
  }, [])

  useEffect(() => {
    getProduct()
  }, [listing.product_id])

  const handleDelete = async (listing: Listing) => {
    try {
      handleListDelete(listing)
      await axios.delete(`/api/listing/${listing.id}`, config)
    } catch (err) {
      // TODO: Listingd Bootstrap Alert component for errors
      console.error(err)
    }
  }

  const updateListing = async (data: any) => {
    try {
      console.log(data)
      await axios.put(`/api/listing/${listing.id}`, data, config)
      listing.title = data.title
      listing.description = data.description
      listing.price_per_unit = data.price_per_unit
      listing.min_quantity = data.min_quantity
      listing.delivery_method = data.delivery_method
      listing.product_id = data.product_id
      handleListUpdate(listing)
      setIsEdit(false)
    } catch (err) {
      // TODO: Listingd Bootstrap Alert component for errors
      console.error(err)
    }
  }

  return (
    <>
      <StyledCard>
        <Card.Header>
          <span style={{ verticalAlign: 'middle' }}>{listing.title}</span>
          <Button variant='danger' onClick={() => handleDelete(listing)}>
            Ta Bort
          </Button>
          {!isEdit ? (
            <Button variant='info' onClick={() => setIsEdit(true)}>
              Ändra
            </Button>
          ) : null}
        </Card.Header>
        <Card.Body>
          {isEdit ? (
            <Form onSubmit={handleSubmit(updateListing)}>
              <Form.Group>
                <Form.Label>Titel</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  defaultValue={listing.title}
                  ref={register({ required: true })} />
                  {errors.title && errors.title.type === 'required' && (
                  <StyledSpan>Titel krävs</StyledSpan>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Pris per enhet</Form.Label>
                <Form.Control
                  type='text'
                  name='price_per_unit'
                  defaultValue={listing.price_per_unit}
                  ref={register({ required: true })} />
                  {errors.price_per_unit && errors.price_per_unit.type === 'required' && (
                  <StyledSpan>Pris per enhet krävs</StyledSpan>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Minimum mängd</Form.Label>
                <Form.Control
                  type='number'
                  name='min_quantity'
                  defaultValue={listing.min_quantity}
                  ref={register({ required: true })} />
                  {errors.min_quantity && errors.min_quantity.type === 'required' && (
                  <StyledSpan>Minimum mängd krävs</StyledSpan>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Leverans metod</Form.Label>
                <Form.Control
                  type='text'
                  name='delivery_method'
                  defaultValue={listing.delivery_method}
                  ref={register({ required: true })} />
                  {errors.delivery_method && errors.delivery_method.type === 'required' && (
                  <StyledSpan>Leveransmetod krävs</StyledSpan>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  as='textarea'
                  name='description'
                  defaultValue={listing.description}
                  ref={register({ required: true })} />
                  {errors.description && errors.description.type === 'required' && (
                  <StyledSpan>Beskrivning krävs</StyledSpan>
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Produkt</Form.Label>
                <Form.Control
                  as='select'
                  name='product_id'
                  defaultValue={listing.product_id}
                  ref={register({ required: true })}>
                  {products != null
                    ? products.map((product: any) =>
                        (<option key={product.id} value={product.id}>{product.name}</option>))
                    : <></>
                  }
                  {errors.product_id && errors.product_id.type === 'required' && (
                  <StyledSpan>Produkt krävs</StyledSpan>
                  )}
                </Form.Control>
              </Form.Group>
              <Button variant='success' type='submit'>
                Spara
              </Button>
            </Form>
          ) : (
            <ListGroup>
            {product && <ListGroup.Item>Produkt: {product.name}</ListGroup.Item>}
            <ListGroup.Item>Pris per enhet: {listing.price_per_unit}</ListGroup.Item>
            <ListGroup.Item>Minsta mängd: {listing.min_quantity}</ListGroup.Item>
            <ListGroup.Item>Leveransmetod: {listing.delivery_method}</ListGroup.Item>
            <ListGroup.Item>
              Beskrivning: {listing.description}
            </ListGroup.Item>
          </ListGroup>
          )}
        </Card.Body>
      </StyledCard>
    </>
  )
}

export default ListingItem
