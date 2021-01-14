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
  Tooltip
} from 'react-bootstrap'

import TimeAgo from 'timeago-react'

/* Lib/timeago language format */
import * as timeago from 'timeago.js'
import sv from 'timeago.js/lib/lang/sv'

/* Own Libraries */
import {
  IconDashboard,
  IconCursor,
  IconEditPen,
  IconTrashBin
} from '../../common/svgIcons'

/* Components */
import EditMessage from './MessageEdit'

type MessageData = {
  created_at: string
  message_id: number
  producer_id: number
  text: string
  updated_at: string
  url: string
}

type MessageBoxProps = {
  data: MessageData
  key: number
  deleteFunction: (x: number) => void
  updateMessageFeed: () => void
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  key,
  deleteFunction,
  updateMessageFeed
}: MessageBoxProps) => {
  const [modalShow, setModalShow] = useState(false)
  timeago.register('sv', sv)

  /**
   * @description this useEffect is triggered as soon as modalShow changes value
   */
  useEffect(() => {
    /* Trigger update message feed only when modalShow sets to false; happens when modal gets closed. So that we get an updated message feed after update. */
    if (!modalShow) {
      updateMessageFeed()
    }
  }, [modalShow])

  return (
    <>
      <Toast
        className="border-0 position-relative mb-5"
        style={{
          flexBasis: '100%',
          maxWidth: '100%',
          borderRadius: '25px',
          overflow: 'visible'
        }}
        key={key}
      >
        <Toast.Body className="pt-4 pb-4">{data.text}</Toast.Body>
        <Toast.Body className="border-top position-relative">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Delete message</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                variant="outline-danger"
                className="m-1"
                style={{ fontSize: '.7rem' }}
                onClick={() => deleteFunction(data.message_id)}
              >
                <IconTrashBin width={12} height={12} />
              </Button>
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Edit message</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                variant="outline-secondary"
                className="m-1"
                style={{ fontSize: '.7rem' }}
                onClick={() => {
                  setModalShow(true)
                }}
              >
                <IconEditPen width={12} height={12} />
              </Button>
            </span>
          </OverlayTrigger>
        </Toast.Body>
        <div className="position-absolute" style={{ bottom: -25, left: 18 }}>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">{data.created_at}</Tooltip>}
          >
            <small className="mr-1 text-muted">
              <TimeAgo datetime={data.created_at} live={true} locale="sv" />
            </small>
          </OverlayTrigger>
        </div>
      </Toast>

      <EditMessage
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={data}
      />
    </>
  )
}

export default MessageBox
