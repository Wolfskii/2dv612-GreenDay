/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* Components */
import ListingItem from './ListingItem'
import { Container, Row, Col } from 'react-bootstrap'

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

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const ListingList = (): any => {
  const [listings, setListing] = useState<Listing[]>([])

  useEffect(() => {
    const getListings = async () => {
      const result = await axios('/api/listing', config)
      setListing(result.data)
    }
    getListings()
  }, [])

  const handleListUpdate = (updatedListing: Listing) => {
    const updatedListings = listings.map((listing) => {
      if (listing.id === updatedListing.id) {
        return updatedListing
      }
      return listing
    })
    setListing([...updatedListings])
  }

  const handleListDelete = (updatedListing: Listing) => {
    setListing(
      [...listings].filter((listing) => listing.id !== updatedListing.id)
    )
  }

  // TODO: Use <Col> to change size depending on screen width (e.g., <Col sm={12}, md={6}>...)
  // <Row> should be moved outside the loop (one row has many columns)
  return (
    <Container className="h-100">
      {!listings.length && (
        <div className="h-100 d-flex align-items-center w-100 text-gradient">
          <h1 className="text-center w-100">
            Åh nej! Här finns det inga annonser.
          </h1>
        </div>
      )}
      <Row className="justify-content-md-center">
        {listings.map((listing) => {
          return (
            <Col
              key={listing.id}
              sm={12}
              md={6}
              lg={4}
              style={{ maxWidth: '400px', margin: '2em' }}
            >
              <ListingItem
                listing={listing}
                handleListUpdate={handleListUpdate}
                handleListDelete={handleListDelete}
              ></ListingItem>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ListingList
