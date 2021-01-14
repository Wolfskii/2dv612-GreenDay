import React, { useState, useEffect } from 'react'
import bgImage from '../img/404-bg.png'

const imgStyle = {
  width: '20em',
  margin: '2em'
}

const noPageFound404 = () :any => {
  return (
    <div className="not-found-div">
      <h1>404</h1>
      <h4>Oops. Sidan hittades inte, nya sidor växer fram allt eftersom...</h4>
      <img src={bgImage} style={imgStyle}></img>
    </div>
  )
}

export default noPageFound404
