/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import {
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
import { useForm } from 'react-hook-form'
import axios from 'axios'

import TimeAgo from 'timeago-react'

/* Lib/timeago language format */
import * as timeago from 'timeago.js'
import sv from 'timeago.js/lib/lang/sv'

/* Functions */
import { token } from '../../../assets/functions/getTokenFromLocalStorage'

/* Styling */
import './style.css'

/* Own Libraries */
import {
  IconDashboard,
  IconCursor,
  IconEditPen,
  IconTrashBin
} from '../../common/svgIcons'

type MessageData = {
  created_at: string
  message_id: number
  producer_id: number
  text: string
  updated_at: string
  url: string
}

type ModalProps = {
  onHide: () => void
  show: boolean
  data: MessageData
}

const EditMessage: React.FC<ModalProps> = (props: ModalProps) => {
  const { register, handleSubmit, reset, watch, errors } = useForm<{
    message: string
  }>()

  const { text, created_at, producer_id, message_id } = props.data

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  /* Update message */
  const onSubmit = handleSubmit(async ({ message }) => {
    const data = {
      text: message,
      url: null
    }

    await axios
      .put(`/api/message/${message_id}`, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    props.onHide() // hide modal
  })

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <InputGroup className="shadow-sm" style={{ borderRadius: '25px' }}>
              <Form.Control
                placeholder="Meddelandet får ej vara tomt"
                name="message"
                className="border-0 p-3"
                as="textarea"
                rows={6}
                style={{
                  resize: 'none',
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  fontSize: '.8rem'
                }}
                defaultValue={text}
                ref={register({ required: true, maxLength: 250 })}
                maxLength={250}
              />
            </InputGroup>
            <div className="mt-3">
              <Button
                variant="success"
                type="submit"
                className="mr-3 rounded-pill"
              >
                Update
              </Button>
              <Button
                variant={'dark'}
                onClick={props.onHide}
                className="rounded-pill float-right"
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditMessage
