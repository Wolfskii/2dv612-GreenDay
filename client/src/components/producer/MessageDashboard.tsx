/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import { Container, Card, Button, InputGroup, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

/* Own Libraries */
import { IconCursor } from '../common/svgIcons'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import MessageBox from './MessageComponents/MessageBox'

type MessageData = {
  created_at: string
  message_id: number
  producer_id: number
  text: string
  updated_at: string
  url: string
}

const Messages: React.FC = () => {
  const { register, handleSubmit, reset, watch, errors } = useForm<{
    message: string
  }>()
  const [taRow, setTaRow] = useState<number>(1) // ta = textarea
  const [existingMessages, setExistingMessages] = useState<MessageData[]>([])

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  const getMessages = () => {
    axios
      .get('/api/message', config)
      .then((res) => {
        setExistingMessages(res.data)
      })
      .catch((err) => console.log({ err }))
  }

  useEffect(() => {
    getMessages()
  }, [])

  /* Expands textarea based on string length */
  useEffect(() => {
    const msgLength = watch('message').length

    switch (true) {
      case msgLength >= 40 && msgLength < 100:
        setTaRow(2)
        break
      case msgLength >= 100 && msgLength < 160:
        setTaRow(3)
        break
      case msgLength >= 160 && msgLength < 220:
        setTaRow(4)
        break
      case msgLength >= 220:
        setTaRow(5)
        break
      default:
        setTaRow(1)
        break
    }
  }, [watch('message')])

  /* Submit message to database */
  const onSubmit = handleSubmit(async ({ message }) => {
    const data = {
      message: message
    }

    await axios
      .post('/api/message', data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    reset()
    getMessages()
  })

  const deleteMessage = (id: number) => {
    console.log({ id })
    axios
      .delete(`/api/message/${id}`, config)
      .then((res) => {
        console.log(res)
        getMessages() // update message list
      })
      .catch((err) => console.log({ err }))
  }

  /**
   * @desc Checks whether existingMessages is empty
   */
  const isMessage = (): boolean => {
    return existingMessages.length > 0 && Array.isArray(existingMessages)
  }

  return (
    <Container
      className="mt-5 p-0"
      fluid
      style={{
        maxWidth: '600px',
        height: '75vh',
        maxHeight: '700px'
      }}
    >
      <Card
        className="p-0 border-0 shadow-sm position-relative overflow-hidden h-100"
        style={{ borderRadius: '25px' }}
      >
        <Card.Header
          className="border-0 text-center shadow-sm bg-success text-white"
          style={{
            fontSize: '.8rem',
            borderRadius: '25px'
          }}
        >
          <strong>Dina meddelanden</strong>
          <p className="text-white pr-5 pl-5 mb-0">
            Här kan du skapa meddelanden till alla som köpt av dig och är
            prenumererade på dina varor
          </p>
        </Card.Header>
        <Card.Body className={'bg-transparent'} style={{ overflowY: 'auto' }}>
          {!isMessage() && (
            <div className="text-center text-muted d-block w-100">
              <strong>Du har inte skrivit några meddelanden.</strong>
            </div>
          )}
          {isMessage() &&
            existingMessages.map((msg, i) => (
              <MessageBox
                key={i}
                data={msg}
                deleteFunction={deleteMessage}
                updateMessageFeed={getMessages}
              />
            ))}
        </Card.Body>
        <Card.Footer className="text-muted border-0 text-center p-4 bg-light">
          <Form onSubmit={onSubmit}>
            <InputGroup className="shadow-sm" style={{ borderRadius: '25px' }}>
              <Form.Control
                placeholder="Skriv ett meddelande"
                name="message"
                className="border-0 p-3"
                as="textarea"
                rows={taRow}
                style={{
                  resize: 'none',
                  backgroundColor: '#d8ffe1',
                  borderTopLeftRadius: '25px',
                  borderBottomLeftRadius: '25px',
                  fontSize: '.8rem'
                }}
                ref={register({ required: true, maxLength: 250 })}
                maxLength={250}
              />
              <InputGroup.Append>
                <Button
                  variant="success"
                  type="submit"
                  className="rounded pb-2"
                >
                  <IconCursor width={24} height={24} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Messages
