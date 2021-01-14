/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Dropdown,
  Col,
  Container,
  Row,
  Card,
  Button,
  FormControl,
  InputGroup,
  Form,
  Toast,
  OverlayTrigger,
  Tooltip,
  Modal
} from 'react-bootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'

import TimeAgo from 'timeago-react'

/* Lib/timeago language format */
import * as timeago from 'timeago.js'
import sv from 'timeago.js/lib/lang/sv'

/* Img */
// eslint-disable-next-line camelcase
import Profile_avatar_placeholder_large from '../../img/Profile_avatar_placeholder_large.png'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const Toggle = styled(Dropdown.Toggle)`
  :after {
    display: none;
  }
`

const bell = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#fff"
    className="bi bi-bell-fill"
    viewBox="0 0 16 16"
  >
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
  </svg>
)

const AllMessages = (props: any) => {
  const [messages, setMessages] = useState([])

  const getAllMessages = () => {
    axios
      .get('/api/message/all', config)
      .then((res) => {
        console.log(res.data.length)
        setMessages(res.data)
      })
      .catch((err) => console.log(err))
    console.log('hello')
  }

  useEffect(() => {
    getAllMessages()
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Notifications
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '600px', overflowY: 'scroll' }}>
        {messages &&
          messages.map((m: any, i: number) => {
            return (
              <Row
                className="w-100 m-0 p-2"
                style={{ borderLeft: '5px solid green' }}
                key={i}
              >
                <Col md="auto" className="p-0 align-self-center">
                  <img
                    style={{ maxWidth: '125px' }}
                    src={Profile_avatar_placeholder_large}
                    className="rounded-circle"
                    alt=""
                  />
                </Col>
                <Col className="align-self-center p-3">
                  <div className="border-0">
                    <strong className="mr-auto">[Företagsnamn]</strong>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">{m.created_at}</Tooltip>
                      }
                    >
                      <small className="float-right text-muted font-weight-bolder">
                        <TimeAgo
                          datetime={m.created_at}
                          live={true}
                          locale="sv"
                        />
                      </small>
                    </OverlayTrigger>
                  </div>
                  <p className="overflow-hidden m-0 text-muted">{m.text}</p>
                </Col>
              </Row>
            )
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const Notifications: React.FC<any> = (props: any): any => {
  const [modalShow, setModalShow] = React.useState(false)
  const { user, messages } = props

  const updateLastTimeRead = () => {
    axios
      .put('/api/user', {}, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    console.log('hello')
  }

  const showRedDot = () => {
    if (messages[0] && messages[0].created_at > user.last_time_read) {
      return (
        <span
          className="d-block bg-danger position-absolute rounded-circle"
          style={{
            width: '8px',
            height: '8px',
            top: '11px',
            left: '11px',
            pointerEvents: 'none'
          }}
        ></span>
      )
    }
  }

  return (
    <>
      <div className="mr-3 position-relative">
        {console.log(messages)}
        <Dropdown drop="down" onClick={() => updateLastTimeRead()}>
          <Toggle variant="succes" id="dropdown-basic">
            {bell}
          </Toggle>

          <Dropdown.Menu style={{ width: '400px' }} align="right">
            <Row className="text-center p-3">
              <Col
                className="font-weight-bolder"
                style={{ fontSize: '1.3rem' }}
              >
                Notifikationer
              </Col>
            </Row>
            <Dropdown.Divider className="m-0" />
            {messages &&
              messages.map((m: any, i: number) => {
                return (
                  <Row
                    className="w-100 m-0 p-2 d-block"
                    style={
                      m.created_at < user.last_time_read
                        ? { borderLeft: '5px solid grey', opacity: '.3' }
                        : { borderLeft: '5px solid green' }
                    }
                    key={i}
                  >
                    <Col md="auto" className="p-0 align-self-center">
                      <img
                        style={{ maxWidth: '125px' }}
                        src={Profile_avatar_placeholder_large}
                        className="rounded-circle"
                        alt=""
                      />
                    </Col>
                    <Col className="align-self-center p-3">
                      <div className="border-0">
                        <strong className="mr-auto">[Företagsnamn]</strong>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              {m.created_at}
                            </Tooltip>
                          }
                        >
                          <small className="float-right text-muted font-weight-bolder">
                            <TimeAgo
                              datetime={m.created_at}
                              live={true}
                              locale="sv"
                            />
                          </small>
                        </OverlayTrigger>
                      </div>
                      <p className="overflow-hidden m-0 text-muted">{m.text}</p>
                    </Col>
                  </Row>
                )
              })}
            <Dropdown.Divider className="m-0" />
            <Row className="text-center p-3">
              <Col className="font-weight-bolder" style={{ color: 'green' }}>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Se alla notifikationer
                </Button>
              </Col>
            </Row>
          </Dropdown.Menu>
        </Dropdown>
        {/* TODO: Only show this if the user haven't read latest notifications from Producers */}
        {messages && showRedDot()}
      </div>

      <AllMessages show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.auth.user,
  messages: state.msg.messages
})

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     login: (username: string, password: string) =>
//       dispatch(login({ username, password }))
//   }
// }

export default connect(mapStateToProps)(Notifications)
