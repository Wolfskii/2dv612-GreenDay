import React, { useState, useEffect } from 'react'
import FooterImage from '../../img/bg-footer.jpg'
import './style.css'

const FooterContainer = () : any => {
  const currentYear = () : any => {
    return new Date().getFullYear()
  }

  return (
    <footer className="footer">
      <img alt='footer' src={FooterImage} style={{ width: '100%' }} />

      <div className="footer-content">
        <div className="footer-col2">
          <h4>Kort om oss</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet cursus sit amet dictum sit amet justo donec.</p>
        </div>
        <div className="footer-col1">
          <h4>Kategorier</h4>
          <p>Frukt & bär</p>
          <p>Grönsaker</p>
          <p>Skaldjur & fisk</p>
          <p>Kött & Mejerivaror</p>
        </div>
        <div className="footer-col1">
          <h4>Kontakta oss</h4>
          <p>Adress vägen</p>
          <p>Postnummer</p>
          <p>Telefonnummer</p>
          <p>Email</p>
        </div>
      </div>
      <div className="copyright-footer">
        <p>Copyright © {currentYear()} - Lokala grönsaker</p>
      </div>
    </footer>
  )
}

export default FooterContainer
