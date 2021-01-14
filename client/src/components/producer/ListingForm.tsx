/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import LoadingSpinnerComponent from '../Loadingspinner.component'
import './style.css'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Form, Button } from 'react-bootstrap'

const FormWrapper = Styled.div`
  max-width: 600px;
  margin: auto;
  margin-top: 100px;
`
const StyledSpan = Styled.span`
  display: block;
  margin: 10px;
  color: red;
`

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

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

const ListingForm = (props: any): any => {
  const { register, handleSubmit, errors } = useForm()

  // Sets component state
  const [products, setProducts] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('/api/product', config)
        setProducts(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getProducts()
  }, [])

  const onSubmit = (data: any, event: any) => {
    setComplete(false)
    setError(false)
    setLoading(true)
    data = { producer_id: props.user.id, ...data }
    axios
      .post('/api/listing', data, config)
      .then(() => {
        setLoading(false)
        setComplete(true)
        event.target.reset()
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  return (
    <>
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type='text'
            name='title'
            ref={register({ required: true, minLength: 2, maxLength: 100 })}
          />
          {errors.title && errors.title.type === 'required' && (
            <StyledSpan>Titel krävs</StyledSpan>
          )}
          {errors.title && errors.title.type === 'minLength' && (
            <StyledSpan>Titel måste minst 2 tecken</StyledSpan>
          )}
          {errors.title && errors.title.type === 'maxLength' && (
            <StyledSpan>Titel får ha max 100 tecken</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Pris per enhet</Form.Label>
          <Form.Control
            type='text'
            name='price_per_unit'
            ref={register({ required: true })}
          />
          {errors.price_per_unit && errors.price_per_unit.type === 'required' && (
            <StyledSpan>Pris per enhet krävs</StyledSpan>
          )}
          {errors.price_per_unit && errors.price_per_unit.type === 'minLength' && (
            <StyledSpan>Pris per enhet måste minst innehålla 1 tecken</StyledSpan>
          )}
          {errors.delivery_method && errors.delivery_method.type === 'maxLength' && (
            <StyledSpan>Pris per enhet får innehålla max 50 tecken</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Minimum mängd</Form.Label>
          <Form.Control
            type='number'
            name='min_quantity'
            ref={register({ required: true })}
          />
          {errors.min_quantity && errors.min_quantity.type === 'required' && (
            <StyledSpan>Minimum mängd krävs</StyledSpan>
          )}
          {errors.min_quantity && errors.min_quantity.type === 'minLength' && (
            <StyledSpan>Minimum mängs måste innehålla minst 1 siffra</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Leveransmetod</Form.Label>
          <Form.Control
            type='text'
            name='delivery_method'
            ref={register({ required: true })}
          />
          {errors.delivery_method && errors.delivery_method.type === 'required' && (
            <StyledSpan>Leveransmetod krävs</StyledSpan>
          )}
          {errors.delivery_method && errors.delivery_method.type === 'minLength' && (
            <StyledSpan>Leveransmetod måste innehålla minst 2 tecken</StyledSpan>
          )}
          {errors.delivery_method && errors.delivery_method.type === 'maxLength' && (
            <StyledSpan>Leveransmetod får innehålla max 50 tecken</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            as='textarea'
            name='description'
            ref={register({ required: true })}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Produkt</Form.Label>
          <Form.Control
            as='select'
            name='product_id'
            ref={register({ required: true })}
          >
            {products != null ? (
              products.map((product: any) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </Form.Control>
        </Form.Group>
        {loading ? <LoadingSpinnerComponent /> : <></>}
        {error ? <p>Något gick fel. Försök igen.</p> : <></>}
        {complete ? <p>Annons tillagd</p> : <></>}
        <Button variant='info' type='submit'>
          Lägg till
        </Button>
      </Form>
    </FormWrapper>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(ListingForm)
