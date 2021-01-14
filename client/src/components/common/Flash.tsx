/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

import Styled from 'styled-components'

const StyledAlert = Styled(Alert)`
  width: max-content;
  padding: 1em;
  padding-left: 3em;
  padding-right: 3em;
  margin: 1em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

const Flash = ({ flashModel }: any): any => {
  const [show, setShow] = useState<boolean>(true)
  useEffect(() => {
    setShow(true)
    // Show Flash for 5 seconds
    window.setTimeout(() => {
      setShow(false)
    }, 5000)
  }, [flashModel])

  return (
    <>
    {show && (
      <StyledAlert variant={flashModel.variant}>{flashModel.message}</StyledAlert>
    )}
    </>
  )
}

export default Flash
