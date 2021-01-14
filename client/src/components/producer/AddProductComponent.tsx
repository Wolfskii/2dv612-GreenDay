/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LoadingSpinnerComponent from '../Loadingspinner.component'
import './style.css'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Form, Button } from 'react-bootstrap'

const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  margin-top: 100px;
`
const StyledSpan = styled.span`
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

const configFormData: any = {
  headers: {
    'content-type': 'multipart/form-data',
    'x-auth-token': token()
  }
}

const AddProductComponent = (props: any): any => {
  const { register, handleSubmit, errors } = useForm()

  // Sets component state
  const [categories, setCategories] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [isInvalidFile, setIsInvalidFile] = useState<boolean>(false)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('/api/category', config)
        setCategories(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getCategories()
  }, [])

  const onSubmit = (data: any, event: any): void => {
    setComplete(false)
    setError(false)
    setLoading(true)
    const { name, description, unit, stock, file, category } = data
    const formData = new FormData()
    formData.append(
      'product',
      JSON.stringify({
        name,
        description,
        unit,
        stock,
        category,
        producer_id: props.user.id
      })
    )
    formData.append('file', file[0])
    axios
      .post('/api/product', formData, configFormData)
      .then(() => {
        setLoading(false)
        setComplete(true)
        event.target.reset()
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setError(true)
      })
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
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Namn</Form.Label>
          <Form.Control
            type='text'
            name='name'
            ref={register({ required: true, minLength: 2, maxLength: 50 })}
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
        <Form.Group>
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            as='textarea'
            name='description'
            ref={register({ required: true, maxLength: 500 })}
          />
          {errors.description && errors.description.type === 'required' && (
            <StyledSpan>Beskrivning krävs</StyledSpan>
          )}
          {errors.description && errors.description.type === 'maxLength' && (
            <StyledSpan>Beskrivning får ha max 500 tecken</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.File
            onChange={handleFileOnChange}
            label='Bild'
            name='file'
            ref={register}
          />
          {isInvalidFile && <StyledSpan>Denna filen stöds inte</StyledSpan>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Enhet</Form.Label>
          <Form.Control
            as='select'
            name='unit'
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
        <Form.Group>
          <Form.Label>Antal i lager</Form.Label>
          <Form.Control
            type='number'
            name='stock'
            ref={register({ required: true, max: 10000 })}
          />
          {errors.stock && errors.stock.type === 'required' && (
            <StyledSpan>Antal krävs</StyledSpan>
          )}
          {errors.stock && errors.stock.type === 'max' && (
            <StyledSpan>Antal får max vara 10000</StyledSpan>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Kategori</Form.Label>
          <Form.Control
            as='select'
            name='category'
            ref={register({ required: true })}
          >
            {categories != null ? (
              categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </Form.Control>
        </Form.Group>
        {loading ? <LoadingSpinnerComponent /> : <></>}
        {error ? <p>Något gick fel. Försök igen.</p> : <></>}
        {complete ? <p>Produkt tillagd</p> : <></>}
        <Button variant='info' type='submit'>
          Lägg till
        </Button>
      </Form>
    </FormWrapper>
  )
}
const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(AddProductComponent)
