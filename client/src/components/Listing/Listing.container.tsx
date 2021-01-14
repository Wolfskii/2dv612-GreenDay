/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoadingSpinner from '../common/LoadingSpinner'
import ListingComponent from './Listing.component'
/* Components */
import { Container } from 'react-bootstrap'

export interface Listing {
  id: number
  producer_id: number
  product_id: number
  title: string
  description: string
  price_per_unit: string
  min_quantity: number
  delivery_method: string
  Product: ListingProduct
  Producer: Producer
}

export interface Producer {
  name: string,
  description: string,
  org_nr: string,
  producer_id: string
}

export interface ListingProduct {
  category_id: number
  description: string
  id: number
  image: any
  name: string
  producer_id: 4
  stock: number
  unit: string
}

type ListingContainerProps = {
  listings: Listing[],
  loading: boolean
}

const productSize = 250
const ProductContainer = styled.div`
    padding-top: 3em;
    margin: auto;
    max-width: 1300px;
    display: grid;
    grid-template-columns: repeat(4, ${productSize}px);
    grid-auto-rows: 400px;
    column-gap: 2em;
    row-gap: 3em;
    justify-content: center;
    transition: opacity 0.8s;
    opacity: 1;
`

const ListingContainer = ({ listings, loading } : ListingContainerProps) : any => {
  return (
    <Container fluid style={{ textAlign: 'center' }}>
      {loading ? <LoadingSpinner /> : <></>}
      <ProductContainer className={loading ? 'hide' : 'listing-container' }>
        {listings.map((listing, index) =>
          <ListingComponent listing={listing} key={index} size={productSize} />
        )}
      </ProductContainer>
  </Container>
  )
}

export default ListingContainer
