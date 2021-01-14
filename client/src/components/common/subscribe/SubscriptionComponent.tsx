/* eslint-disable multiline-ternary */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect, useRef, createRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

/* Images */
import pp from '../../../img/product-placeholder.svg'

import './style.css'

/* Functions */
import { token } from '../../../assets/functions/getTokenFromLocalStorage'

/* Components */
import {
  Button,
  ListGroup,
  Container,
  Form,
  Tabs,
  Tab,
  Row,
  Col
} from 'react-bootstrap'

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const SubscriptionComponent: React.FC = () => {
  const [subProducers, setSubProducers] = useState<any>([])
  const [producers, setProducers] = useState<any>([])
  const { register, handleSubmit, errors } = useForm()

  const textInput = useRef<HTMLButtonElement>(null)

  const getProducersSubscribedTo = async () => {
    try {
      const res = await axios.get('/api/subscription/producers', config)
      setSubProducers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getProducers = async () => {
    try {
      const res = await axios.get('/api/producer', config)
      setProducers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const unSubscribe = async (id: number) => {
    try {
      await axios.delete(`/api/subscription/${id}`, config)
      getProducersSubscribedTo()
    } catch (err) {
      console.error(err)
    }
  }

  const subscribe = async (id: any) => {
    const data = { producer_id: id }

    console.log(data)
    try {
      await axios.post('/api/subscription', data, config)
      getProducersSubscribedTo()
    } catch (err) {
      console.error(err)
    }
  }

  const setDisabled = () => {
    const noSubProducers = producers.map((producer: any) => {
      if (
        subProducers.find(
          (subProducer: any) => subProducer.producer_id === producer.producer_id
        )
      ) {
        producer.disabled = true
      } else {
        producer.disabled = false
      }
      return producer
    })
    setProducers(noSubProducers)
  }

  useEffect(() => {
    getProducers().then(() => {
      getProducersSubscribedTo()
    })
  }, [])

  useEffect(() => {
    setDisabled()
  }, [subProducers])

  const onMouseOver = (e: any) => {
    e.target.innerText = 'Ta bort'
  }

  const onMouseLeave = (e: any) => {
    e.target.innerText = 'Följer'
  }

  return (
    <Container
      style={{
        textAlign: 'center',
        marginTop: '30px',
        width: '100%',
        maxWidth: '650px'
      }}
    >
      <h1
        className="text-left text-gradient mb-3"
        style={{ fontWeight: 'bold' }}
      >
        Prenumeration
      </h1>
      <p className="text-left text-muted mb-5">
        Här kan du hantera dina prenumerationer. Följ för att få reda på det
        senaste som producenten lagt upp. Avfölj för att sluta få nyheter av
        producenten.
      </p>
      <Tabs defaultActiveKey="följer" className="p-0">
        <Tab
          eventKey="följer"
          title={`${subProducers && subProducers.length} Följer`}
        >
          <div className="mt-4 pt-4">
            <ListGroup className="pt-2">
              {subProducers.length === 0 ? (
                <p className="text-muted">
                  Oj då! Här finns det inga prenumerationer. Välj företag i Följ
                  företag för att få det allra senaste av den producenten!
                </p>
              ) : (
                <p className="text-left mb-4" style={{ fontWeight: 'bold' }}>
                  Du följer
                </p>
              )}
              {subProducers &&
                subProducers.map((sp: any, i: number) => {
                  return (
                    <>
                      <Row className="d-flex align-items-center mb-4" key={i}>
                        <Col md="auto">
                          <div className="rounded-circle overflow-hidden">
                            <img width={100} src={pp} alt="" />
                          </div>
                        </Col>
                        <Col md="auto">{sp.Producer.name}</Col>
                        <Col className="text-right">
                          <Button
                            variant="outline-dark"
                            onClick={() => {
                              unSubscribe(sp.Producer.producer_id)
                            }}
                          >
                            Ta bort
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )
                })}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey="profile" title={'Följ företag'}>
          <div className="mt-4 pt-4">
            <p className="text-left mb-4" style={{ fontWeight: 'bold' }}>
              Hitta Företag
            </p>
            {producers &&
              // eslint-disable-next-line array-callback-return
              producers.map((producer: any) => {
                return (
                  <>
                    <Row
                      className="d-flex align-items-center mb-4"
                      key={producer.producer_id}
                    >
                      <Col md="auto">
                        <div className="rounded-circle overflow-hidden">
                          <img width={100} src={pp} alt="" />
                        </div>
                      </Col>
                      <Col md="auto">{producer.name}</Col>
                      <Col className="text-right">
                        {producer.disabled ? (
                          <Button
                            ref={textInput}
                            onMouseEnter={onMouseOver}
                            onMouseLeave={onMouseLeave}
                            variant={
                              producer.disabled ? 'outline-dark' : 'success'
                            }
                            onClick={() => unSubscribe(producer.producer_id)}
                          >
                            {producer.disabled ? 'Följer' : 'Följ'}
                          </Button>
                        ) : (
                          <Button
                            ref={textInput}
                            variant={
                              producer.disabled ? 'outline-dark' : 'success'
                            }
                            onClick={() => subscribe(producer.producer_id)}
                          >
                            {producer.disabled ? 'Följer' : 'Följ'}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </>
                )
              })}
          </div>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default SubscriptionComponent
