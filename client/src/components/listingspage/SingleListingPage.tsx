/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { token } from '../../assets/functions/getTokenFromLocalStorage'
import './style.css'
import dummyProductImage from '../../img/Group-8049-1-470x470.jpg'

const SingleListingPage = () => {
  const [errorMsgFromBackend, setErrorMsgFromBackend] = useState(null)
  const [listingId, setListingId] = useState<any>(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
  const [listing, setListing] = useState<any>({})
  const [product, setProduct] = useState<any>({})
  const [productImage, setProductImage] = useState<any>('')

  const bufferToImage = (data: number[]) => {
    return Buffer.from(data).toString('base64')
  }

  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  useEffect(() => {
    const getSingleListing = async () => {
      const result = await axios.get(
        '/api/listing/' + listingId,
        config
      )

      setListing(result.data)
      setProduct(result.data.Product)
      setProductImage(`data:image;base64,${bufferToImage(result.data.Product.image.data)}`)
    }

    getSingleListing()
  }, [])

  const productImageStyle = {
    backgroundImage: `url(${productImage})`
  }

  return (
      <div className='single-listing'>
        <div className='listing-left'>
          <div className='listing-image' style={productImageStyle} />
        </div>

        <div className='listing-right'>
          <h1 className='listing-heading'>{listing.title}</h1>
          <p className='listing-price'><span className='price'>{listing.price_per_unit} kr</span> / {product.unit}</p>
          <p className='listing-description'>{listing.description}</p>

          <div className='listing-details'>
            <div className='listing-delivery-method'>
              <p className='accented' >Leveranssätt:</p>
              <p>{listing.delivery_method}</p>
            </div>

            <div className='amount-row'>
              <p className='accented' >Antal:</p>
              <input className='input-amount' type='number' name='amount' min={listing.min_quantity} placeholder={listing.min_quantity} />
            </div>
          </div>

            <button className='add-to-cart-btn'>Lägg i kundvagnen</button>

          </div>

        </div>
  )
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(SingleListingPage)
