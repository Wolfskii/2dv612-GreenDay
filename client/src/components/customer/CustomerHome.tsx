/* eslint-disable multiline-ternary */
/* eslint-disable space-infix-ops */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import FooterImage from '../../img/bg-footer.jpg'
import styled from 'styled-components'
import { connect } from 'react-redux'
import RefreshLockIcon from '../../img/icons/refresh-lock.svg'
import PenIcon from '../../img/icons/edit.svg'
import SaveIcon from '../../img/icons/save.svg'
import { token } from '../../assets/functions/getTokenFromLocalStorage'

import './style.css'

/* Components */
import { Container, Row, Col, Form } from 'react-bootstrap'

/* Own Libraries */
import {
  IconDashboard,
  IconCursor,
  IconEditPen,
  IconTrashBin,
  IconFarmWoman,
  IconFarmMan
} from '../common/svgIcons'

interface Customer {
  customerId: number
  username: string
  email: string
  firstname: string
  lastname: string
  phone: string
}

const CustomerDashboard = (props: any): any => {
  const { register, handleSubmit, errors } = useForm()
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [customer, setCustomer] = useState<any>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false)

  const getCustomer = async () => {
    const customerId = props.user.id
    console.log(props.user.is_blocked)
    const result = await axios.get(`/api/customer/${customerId}`)
    setCustomer(result.data)
  }

  useEffect(() => {
    getCustomer()
  }, [])

  const updateCustomer = async (data: any) => {
    try {
      const config: any = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token()
        }
      }

      await axios.put('/api/customer/', data, config)
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

  if (customer) {
    if (customer.is_blocked === 0) {
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
      {customer ? (
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
                  Här kan du hantera dina prenumeranter och tidigare
                  beställningar. Det är även här du mekar med
                  kontoinställningar.
                </p>
              </Col>
              <Col className="position-relative">
                <div
                  className="position-absolute"
                  style={{
                    top: -100
                  }}
                >
                  <IconFarmMan width={220} height={330} />
                </div>
              </Col>
            </Row>
            <Row className="bg-white" style={{ borderRadius: '25px' }}>
              <Col>
                <div className="user-card">
                  <h1>
                    {customer.first_name} {customer.last_name}
                  </h1>
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
                                  setCustomer((prevCustomer: any) => ({
                                    ...prevCustomer,
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
                        onClick={() => updateCustomer(customer)}
                      >
                        <img className="icon" src={SaveIcon} alt="Save icon" />
                        Spara lösenord
                      </p>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="user-content">
              <Col className="user-details" style={{ borderRadius: '25px' }}>
                <h3>Mina uppgifter</h3>
                {isEdit ? (
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Användarnamn</Form.Label>
                          <Form.Control
                            defaultValue={customer.username}
                            onChange={(e) =>
                              setCustomer((prevCustomer: any) => ({
                                ...prevCustomer,
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
                            defaultValue={customer.email}
                            onChange={(e) =>
                              setCustomer((prevCustomer: any) => ({
                                ...prevCustomer,
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
                          <Form.Label>Förnamn</Form.Label>
                          <Form.Control
                            defaultValue={customer.first_name}
                            onChange={(e) =>
                              setCustomer((prevCustomer: any) => ({
                                ...prevCustomer,
                                first_name: e.target.value
                              }))
                            }
                            name="firstname"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Efternamn</Form.Label>
                          <Form.Control
                            defaultValue={customer.last_name}
                            onChange={(e) =>
                              setCustomer((prevCustomer: any) => ({
                                ...prevCustomer,
                                last_name: e.target.value
                              }))
                            }
                            name="lastname"
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        defaultValue={customer.phone}
                        onChange={(e) =>
                          setCustomer((prevCustomer: any) => ({
                            ...prevCustomer,
                            phone: e.target.value
                          }))
                        }
                        name="phone"
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
                            defaultValue={customer.username}
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
                            defaultValue={customer.email}
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
                          <Form.Label>Förnamn</Form.Label>
                          <Form.Control
                            defaultValue={customer.first_name}
                            name="firstname"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Efternamn</Form.Label>
                          <Form.Control
                            defaultValue={customer.last_name}
                            name="lastname"
                            plaintext
                            readOnly
                          />
                          <Form.Text className="text-muted" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        defaultValue={customer.phone}
                        name="phone"
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
                    onClick={() => updateCustomer(customer)}
                  >
                    <img className="icon" src={SaveIcon} alt="Save icon" />
                    Spara ändringar
                  </p>
                )}
              </Col>
              <Col className="user-orders" style={{ borderRadius: '25px' }}>
                <h3>Mina ordrar</h3>
                <table>
                  <tr>
                    <th>Ordernummer</th>
                    <th>Producent</th>
                    <th>Summa</th>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#5235</a>
                    </td>
                    <td>Kvillegården</td>
                    <td>479,49 kr</td>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#5362</a>
                    </td>
                    <td>Hvisbäckens</td>
                    <td>523,99 kr</td>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#6033</a>
                    </td>
                    <td>Enebäckens</td>
                    <td>42,00 kr</td>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#6523</a>
                    </td>
                    <td>Göstas farm</td>
                    <td>1023,99 kr</td>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#7123</a>
                    </td>
                    <td>Bergakungens</td>
                    <td>649,49 kr</td>
                  </tr>
                  <tr>
                    <td className="order-number">
                      <a href="#">#7543</a>
                    </td>
                    <td>Perssons</td>
                    <td>734,99 kr</td>
                  </tr>
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

export default connect(mapStateToProps)(CustomerDashboard)
