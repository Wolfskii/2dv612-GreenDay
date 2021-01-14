/* Lib */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import HeaderImage from '../../img/35-hero.jpg'
import styled from 'styled-components'
import ListingComponent from '../Listing/Listing.component'
import LoadingSpinner from '../common/LoadingSpinner'
import ListingContainer, { Listing } from '../Listing/Listing.container'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import {
  Button,
  Jumbotron,
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap'

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const headerImageStyle = {
  marginTop: '-2em',
  backgroundImage: 'url(' + HeaderImage + '), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))'
}

const StyledContainer = styled(Container)`
background-blend-mode: overlay;

background-repeat: no-repeat;
background-size: cover;

 h1{
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 0.4em;
 }

 p {
   font-size: 1.2em;
 }
`

const StyledJumbotron = styled(Jumbotron)`
  height: 95vh;
  display: flex;
  algin-items: center;
  justify-content: center;
`

const CenterContent = styled.div`
    display: grid;
    align-items: center;
    max-width: 1000px;
`

const SearchField = styled(Form)`
  padding-top: 1em;
  width: 40em;
  display: grid;
  grid-template-columns: 10fr 1fr;
  justify-content: space-between;
  margin: auto;
  height: 3em;

  input {
    margin-right: 1em;
    border-radius: 2em;
    border: none;
    padding: 0.9em;
  }

  .input-group-append {
    float: right;
  }

  button {
    width: 5em;
    border-radius: 2em;
    font-size: 1em;
    background: #159848;
    border: none;
  }
`

const NewProductsText = styled.p`
  color: #159848;
  font-size: 1.3em;
`

const FreshTitle = styled.h2`
  font-size: 2.8em;
  font-weight: bold;
`
const Homepage = (): any => {
  const history = useHistory()
  const [listings, setListing] = useState<Listing[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const getLatestListings = async () => {
      const result = await axios('/api/listing/latest', config)
      console.log(result.data)
      setLoadingProducts(false)
      setListing(result.data)
    }
    getLatestListings()
  }, [])

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    history.push(`/search/${data.query}`)
  }

  return (
    <>
      <StyledContainer fluid style={headerImageStyle}>
        <Row>
          <Col>
            <StyledJumbotron style={{ background: 'transparent', textAlign: 'center' }}>
              <CenterContent className='content-wrapper'>
                <div>
                  <h1 style={{ color: '#FFF' }}>Köp och sälj lokalt odlade grönsaker</h1>
                  <p className='mb-5' style={{ color: '#FFF' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius arcu in pretium ullamcorper.
                  </p>
                  <SearchField onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' name='query' ref={register({ required: true })}/>
                    <Button type='submit'>Sök</Button>
                  </SearchField>
                </div>
              </CenterContent>
            </StyledJumbotron>
          </Col>
        </Row>
      </StyledContainer>

      <Container fluid style={{ textAlign: 'center', marginTop: '5em' }}>
        <Row>
          <Col>
            <NewProductsText>Nyligen tillagda varor</NewProductsText>
          </Col>
        </Row>
        <Row>
          <Col>
            <FreshTitle>
              Färskt just nu
            </FreshTitle>
          </Col>
        </Row>
      </Container>
      <ListingContainer listings={listings} loading={loadingProducts} />
    </>
  )
}

export default Homepage
