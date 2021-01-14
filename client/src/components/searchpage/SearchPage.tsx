/* Lib */
import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { token } from '../../assets/functions/getTokenFromLocalStorage'
import { Container, Row, Col, Card, InputGroup, Form, Button, CardDeck } from 'react-bootstrap'
import Styled from 'styled-components'
import ListingContainer, { Listing } from '../Listing/Listing.container'
import { useForm } from 'react-hook-form'

const SearchTitle = Styled.h1`
  margin-top: 1.5em;
  margin-bottom: 1em;
`
const ResultContainer = Styled.div`
  margin-top: 1.5em;
  margin-bottom: 3em;
  h2 {
    text-align: left;
  }
`

const CardLink = Styled(Card)`
  :hover {
    -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.14);
    -moz-box-shadow:    0px 0px 10px 0px rgba(50, 50, 50, 0.14);
    box-shadow:         0px 0px 10px 0px rgba(50, 50, 50, 0.14);
    cursor: pointer;
  }
`

const SearchPage = (props: any) => {
  const history = useHistory()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [producers, setProducers] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const { register, handleSubmit, errors } = useForm()
  const [loading, setLoading] = useState(true)
  const { match } = props
  const { id } = match.params

  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  const getNewSearchResult = async (data: any) => {
    const search = !data.searchText ? data : data.searchText
    setLoading(true)
    const result = await axios(`/api/search/${search}`, config)
    setLoading(false)
    setListings(result.data.listings)
    setProducers(result.data.producerNames)
    setCategories(result.data.categoryNames)
  }

  useEffect(() => {
    getNewSearchResult(id)
  }, [])

  const bufferToImage = (data: number[]) => {
    return Buffer.from(data).toString('base64')
  }

  return (
    <>
      <Container>
        <SearchTitle>Sökresultat: {id}</SearchTitle>
        <Form onSubmit={handleSubmit(getNewSearchResult)}>
          <InputGroup>
          <Form.Control
              style={{ padding: '10px 20px 10px 20px', borderRadius: '5px' }}
              name='searchText'
              type='text'
              defaultValue={id}
              ref={register({ required: true })}
          />
          <Button variant='success' type='submit' style={{ marginLeft: '5px', padding: '0px 20px 0px 20px', borderRadius: '5px' }}>Sök</Button>
          </InputGroup>
        </Form>
        <br/><hr/>
        <ResultContainer>
          <h2>Annonser:</h2>
          <ListingContainer listings={listings} loading={loading} />
        </ResultContainer>
        <hr/>
        <ResultContainer>
          <h2>Producenter:</h2>
          <CardDeck>
            {producers.map((producer: any, i: number) => {
              return (
                <a key={producer.id} href={'/search/producer/' + producer.producer_id}>
                  <CardLink style={{ width: '255px', height: '145px', fontSize: '14px' }}>
                    <Card.Body>
                      <Card.Title style={{ height: '30px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{producer.name}</Card.Title><hr/>
                      <Card.Text style={{ height: '80px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '14px' }}>
                        Beskrivning:<br/>{producer.description}</Card.Text>
                    </Card.Body>
                  </CardLink>
                </a>
              )
            })}
          </CardDeck>
        </ResultContainer>
        <hr/>
        <ResultContainer>
          <h2>Kategorier:</h2>
          <CardDeck>
            {categories.map((category: any, i: number) => {
              return (
                <a key={category.id} href={'/'}>
                  <CardLink style={{ width: '255px', height: '145px', fontSize: '14px' }}>
                    <Card.Body>
                      <Card.Title style={{ height: '30px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{category.name}</Card.Title><hr/>
                      <Card.Text style={{ height: '80px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '14px' }}>
                        Beskrivning:<br/>{category.description}</Card.Text>
                    </Card.Body>
                  </CardLink>
                </a>
              )
            })}
          </CardDeck>
        </ResultContainer>
        <hr/>
      </Container>
      </>
  )
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(SearchPage)
