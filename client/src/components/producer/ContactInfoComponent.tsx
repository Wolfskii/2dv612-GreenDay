/* eslint-disable multiline-ternary */
/* eslint-disable space-infix-ops */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import FooterImage from '../../img/bg-footer.jpg'
import styled from 'styled-components'
import { connect } from 'react-redux'
import RefreshLockIcon from '../../img/icons/client_src_img_icons_refresh-lock.svg'
import SaveIcon from '../../img/icons/client_src_img_icons_save.svg'
import PenIcon from '../../img/icons/client_src_img_icons_edit.svg'
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import { Container, Row, Col, Form } from 'react-bootstrap'

/* Own Libraries */
import {
  IconDashboard,
  IconCursor,
  IconEditPen,
  IconTrashBin,
  IconFarmWoman
} from '../common/svgIcons'

interface Producer {
  producerId: number
  orgNr: string
  name: string
  description: string
}

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const ContactInfoComponent = (props: any): any => {
  const { register, handleSubmit, errors } = useForm()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [producer, setProducer] = useState<any>(null)
  const [listings, setListings] = useState<any>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false)

  useEffect(() => {
    const getProducer = async () => {
      const producerId = props.user.id
      const result = await axios.get(`/api/producer/${producerId}`)
      setProducer(result.data)
    }
    const getListings = async () => {
      const result = await axios.get('/api/listing/', config)
      setListings(result.data) //  Latest listings
    }
    getProducer()
    getListings()
  }, [])

  const updateProducer = async (data: any) => {
    try {
      const config: any = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token()
        }
      }

      await axios.put('/api/producer', data, config)
      setIsEditPassword(false)
      setIsEdit(false)
    } catch (err) {
      // TODO: Add Bootstrap Alert component for errors
      console.error(err)
    }
  }

  let userStatus = (
    <p>
      <span className="strong">Status:</span>{' '}
    </p>
  )

  if (producer) {
    if (producer.is_blocked === 0) {
      userStatus = (
        <p>
          <span className="strong">Status:</span>{' '}
          <span className="green">Verifierad</span>
        </p>
      )
    } else {
      userStatus = (
        <p>
          <span className="strong">Status:</span>{' '}
          <span className="red">Blockerad</span>
        </p>
      )
    }
  }

  return (
    <>
      {producer ? (
        <>
          <Container style={{ textAlign: 'center', marginTop: '30px' }}>
            <Row
              className="banner-green-gradient"
              style={{
                borderRadius: '25px',
                marginBottom: '15px',
                marginTop: '100px'
              }}
            >
              <Col className="p-5" sm={9}>
                <h3 className="text-left">
                  Välkommen till din instrumentbräda!
                </h3>
                <p className="text-left">
                  Här kan du hantera dina produkter och annonser. Du har även
                  möjligheten att kunna skicka meddelande till kunder som
                  prenumerar på dina varor och som tidigare köpt av dig.
                </p>
              </Col>
              <Col className="position-relative">
                <div
                  className="position-absolute"
                  style={{
                    top: -100
                  }}
                >
                  <IconFarmWoman width={220} height={330} />
                </div>
              </Col>
            </Row>
            <Row className="bg-white" style={{ borderRadius: '25px' }}>
              <Col>
                <div className="user-card">
                  <h1>{producer.name}</h1>
                  {userStatus}
                  <p>
                    <span className="strong">Registrerad:</span>{' '}
                  </p>
                  {!isEditPassword ? (
                    <p
                      className="change-link"
                      onClick={() => setIsEditPassword(!isEditPassword)}
                    >
                      <img
                        className="icon"
                        src={RefreshLockIcon}
                        alt="Lock icon"
                      />
                      Ändra lösenord
                    </p>
                  ) : (
                    <>
                      <Form>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Nytt lösenord</Form.Label>
                              <Form.Control
                                type="password"
                                onChange={(e) =>
                                  setProducer((prevProducer: any) => ({
                                    ...prevProducer,
                                    password: e.target.value
                                  }))
                                }
                                name="password"
                              />
                              <Form.Text className="text-muted" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                      <p
                        className="change-link"
                        onClick={() => updateProducer(producer)}
                      >
                        <img className="icon" src={SaveIcon} alt="Save icon" />
                        Spara lösenord
                      </p>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="user-details" style={{ borderRadius: '25px' }}>
                <h3>Mina uppgifter</h3>
                {isEdit ? (
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Användarnamn</Form.Label>
                          <Form.Control
                            defaultValue={producer.username}
                            onChange={(e) =>
                              setProducer((prevProducer: any) => ({
                                ...prevProducer,
                                username: e.target.value
                              }))
                            }
                            name="username"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>E-post</Form.Label>
                          <Form.Control
                            defaultValue={producer.email}
                            onChange={(e) =>
                              setProducer((prevProducer: any) => ({
                                ...prevProducer,
                                email: e.target.value
                              }))
                            }
                            type="email"
                            name="email"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Namn</Form.Label>
                          <Form.Control
                            defaultValue={producer.name}
                            onChange={(e) =>
                              setProducer((prevProducer: any) => ({
                                ...prevProducer,
                                name: e.target.value
                              }))
                            }
                            name="name"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Org-nr</Form.Label>
                          <Form.Control
                            defaultValue={producer.org_nr}
                            onChange={(e) =>
                              setProducer((prevProducer: any) => ({
                                ...prevProducer,
                                org_nr: e.target.value
                              }))
                            }
                            name="org-nr"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>Beskrivning</Form.Label>
                      <Form.Control
                        defaultValue={producer.description}
                        onChange={(e) =>
                          setProducer((prevProducer: any) => ({
                            ...prevProducer,
                            description: e.target.value
                          }))
                        }
                        name="description"
                      />
                      <Form.Text className="text-muted" />
                    </Form.Group>
                  </Form>
                ) : (
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Användarnamn</Form.Label>
                          <Form.Control
                            defaultValue={producer.username}
                            name="username"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>E-post</Form.Label>
                          <Form.Control
                            defaultValue={producer.email}
                            type="email"
                            name="email"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Namn</Form.Label>
                          <Form.Control
                            defaultValue={producer.name}
                            name="name"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Org-nr</Form.Label>
                          <Form.Control
                            defaultValue={producer.org_nr}
                            name="org_nr"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>Beskrivning</Form.Label>
                      <Form.Control
                        defaultValue={producer.description}
                        name="description"
                        plaintext
                        readOnly
                      />
                      <Form.Text className="text-muted" />
                    </Form.Group>
                  </Form>
                )}
                {!isEdit ? (
                  <p className="change-link" onClick={() => setIsEdit(!isEdit)}>
                    <img className="icon" src={PenIcon} alt="Pen icon" />
                    Ändra uppgifter
                  </p>
                ) : (
                  <p
                    className="change-link"
                    onClick={() => updateProducer(producer)}
                  >
                    <img className="icon" src={SaveIcon} alt="Save icon" />
                    Spara ändringar
                  </p>
                )}
              </Col>
              <Col className="user-ads" style={{ borderRadius: '25px' }}>
                <h3>Mina annonser</h3>
                <table>
                  <tr>
                    <th>Annonsnummer</th>
                    <th>Produkt</th>
                    <th>Pris</th>
                  </tr>
                  {listings.map((listing: any) => {
                    return (
                      <tr key={listing.id}>
                        <td className="order-number">
                          <a href={`/annonser/${listing.id}`}>#{listing.id}</a>
                        </td>
                        <td>{listing.title}</td>
                        <td>{listing.price_per_unit} kr / {listing.Product.unit}</td>
                      </tr>
                    )
                  })}
                </table>
              </Col>
            </Row>
          </Container>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(ContactInfoComponent)
