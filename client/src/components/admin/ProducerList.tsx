/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import ProducerItem from './ProducerItem'
import { Container, Row, Col } from 'react-bootstrap'

interface Producer {
  producer_id: number
  description: string
  name: string
  org_nr: string
}

const ProducersList = (): any => {
  const [producers, setProducers] = useState<Producer[]>([])

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  useEffect(() => {
    const getProducers = async () => {
      const result = await axios.get('/api/producer_users', config)
      setProducers(result.data)
    }
    getProducers()
  }, [])

  const handleListUpdate = (updatedProducer: Producer) => {
    let oldProducer = producers.find(
      (producer) => producer.producer_id === updatedProducer.producer_id
    )
    oldProducer = updatedProducer
    setProducers([...producers])
  }

  const handleListDelete = (updatedProducer: Producer) => {
    setProducers(
      [...producers].filter(
        (producer) => producer.producer_id !== updatedProducer.producer_id
      )
    )
  }

  // TODO: Use <Col> to change size depending on screen width (e.g., <Col sm={12}, md={6}>...)
  // <Row> should be moved outside the loop (one row has many columns)
  return (
    <Container fluid>
      {producers.map((producer) => {
        return (
          <Row key={producer.producer_id} className="justify-content-md-center">
            <Col sm={10} style={{ maxWidth: '800px' }}>
              <ProducerItem
                producer={producer}
                handleListUpdate={handleListUpdate}
                handleListDelete={handleListDelete}
              ></ProducerItem>
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default ProducersList
