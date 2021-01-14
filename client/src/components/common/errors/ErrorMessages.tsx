/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const InputError = (props: any): any => {
  const { text } = props
  return <Form.Text className="text-danger">{text}</Form.Text>
}

export const XError = (): any => {
  return (
    <span
      className="position-absolute text-danger"
      style={{ right: 15, top: 36 }}
    >
      X
    </span>
  )
}

export const BackendErrorMessage = (props: any): any => {
  const { text } = props
  return <div className="mb-0 mt-3 alert alert-danger">{text}</div>
}
