/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { token } from '../../assets/functions/getTokenFromLocalStorage'
import ListingContainer, { Listing } from '../Listing/Listing.container'
import './style.css'
import { Container, Row, Col, Card, InputGroup, Form } from 'react-bootstrap'

interface Category {
  id: number
  name: string
  description: string
}

const Listings = () => {
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [listings, setListings] = useState<any>([])
  const [activeListings, setActiveListings] = useState<any>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  useEffect(() => {
    const getAllListings = async () => {
      const result = await axios.get(
        '/api/listing/all',
        config
      )

      result.data.forEach((listing: any) => {
        setLoading(false)
        setListings((listings: any) => [...listings, listing])
        setActiveListings((activeListings: any) => [...activeListings, listing]) // Default is to show all adds
      })
    }

    const getAllCategories = async () => {
      const result = await axios.get('/api/category',
        config
      )

      result.data.forEach((category: any) => {
        setCategories((categories: any) => [...categories, category])
      })
    }

    getAllListings()
    getAllCategories()
  }, [])

  const handleFilter = (event: any) => {
    // Select option should return negative number to show all listings
    if (Number(event.target.value) < 0) {
      setActiveListings(listings)
      return
    }
    const filteredListings = listings.filter(
      (listing: any) => Number(listing.Product.category_id) === Number(event.target.value)
    )

    setActiveListings(filteredListings)
  }

  return (
    <>
      <h1 className='listings-heading'>Alla annonser</h1>

      <Container>
        <br />
        <Row className='justify-content-md-center'>
          <Col sm={6}>
            <Form>
              <Form.Label>Filtrera på kategori</Form.Label>
              <Form.Control
                as='select'
                onChange={handleFilter}
                defaultValue='ok'
              >
                <option value={-1}>Se alla annonser</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </Form.Control>
            </Form>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
      <ListingContainer listings={activeListings} loading={loading} />
    </>
  )
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(Listings)
