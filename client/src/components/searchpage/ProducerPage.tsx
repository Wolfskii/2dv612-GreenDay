/* eslint-disable camelcase */
/* Lib */
import { useHistory, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { token } from '../../assets/functions/getTokenFromLocalStorage'
import { Container, Row, Col, Card, InputGroup, Form, Button, CardDeck } from 'react-bootstrap'
import Styled from 'styled-components'

interface Producer {
  producer_id: number,
  name: string,
  org_nr: string,
  description: string
}

const ProfileTitle = Styled.h1`
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`

const InfoContainer = Styled.div`
  margin-top: 1.5em;
  margin-bottom: 3em;
  h2 {
    text-align: left;
  }
  h3 {
    text-align: left;
    font-size: 18px;
    margin: 10px 0 10px 0;
    paddding: 0px;
    font-weight: bold;
  }
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

const ProducerPage = (props: any) => {
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [listings, setListings] = useState<any>([])
  const [producer, setProducer] = useState<any>({})
  const { match } = props
  const { id } = match.params

  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  useEffect(() => {
    const getProducerInfo = async () => {
      const result = await axios(`/api/search/producer/${id}`, config)
      setListings(result.data.producerListings)
      setProducer(result.data.producerInfo[0])
      console.log(producer)
    }
    getProducerInfo()
  }, [])

  const bufferToImage = (data: number[]) => {
    return Buffer.from(data).toString('base64')
  }

  return (
    <>
      <Container>
        <ProfileTitle>Profilsida</ProfileTitle>
        <hr/>
        <InfoContainer>
          <h2>{producer.name}</h2>
          <h3>Organisationsnummer:</h3>
          <p>{producer.org_nr}</p>
          <h3>Beskrivning:</h3>
          <p>{producer.description}</p>
        </InfoContainer>
        <hr/>
        <ResultContainer>
          <h2>Annonser:</h2>
          <CardDeck>
            {listings.map((listing: any, i: number) => {
              return (
                <a key={listing.id} href={'/annonser/' + listing.id}>
                  <CardLink style={{ width: '255px', height: '370px' }}>
                    <Card.Img
                      style={{ height: '230px', objectFit: 'cover' }}
                      variant='top'
                      src={`data:image;base64,${bufferToImage(listing.image.data)}`}
                    />
                    <Card.Body>
                      <Card.Title style={{ height: '30px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{listing.title}</Card.Title><hr />
                      <Card.Text style={{ height: '80px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '14px' }}>
                        Beskrivning:<br />{listing.description}
                      </Card.Text>
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

export default connect(mapStateToProps)(ProducerPage)
