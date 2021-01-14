/* Lib */
import React from 'react'
import styled from 'styled-components'
import { Listing } from './Listing.container'
import PlaceHolderImg from '../../img/product-placeholder.svg'
import { useHistory } from 'react-router-dom'

type ProductProps = {
  listing: Listing,
  size: number
}

const bufferToImage = (data: number[]) => {
  return Buffer.from(data).toString('base64')
}

const ListingComponent = ({ listing, size } : ProductProps): any => {
  const history = useHistory()
  const onClickHandler = () => {
    history.push(`/annonser/${listing.id}`)
  }
  const hoverSize = size + 20
  const ProductWrapper = styled.div`
    display: grid;
    margin: auto;
    width: 100%;
    height: ${size}px;
    background: #F6F6F6;
    border-radius: 50px;
    border: 2px solid #F6F6F6;
    opacity: 1;
    padding: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 0.5em;
    transition: all .15s ease-in-out;
  `
  const ProductContainer = styled.div`
    position: relative;
    width: ${size}px;
    border-radius: 50px;
    transition: all .15s ease-in-out;
    :hover {
      width: ${hoverSize}px;
      cursor: pointer;
      margin-left: -${(hoverSize - size) / 2}px;

      .product-wrapper {
        height: ${hoverSize}px;
        -webkit-box-shadow: 0px 0px 32px -20px rgba(31,44,191,1);
        -moz-box-shadow: 0px 0px 32px -20px rgba(31,44,191,1);
        box-shadow: 0px 0px 32px -20px rgba(31,44,191,1);
      }
    }
  `
  const imgSrc = !listing.Product.image
    ? PlaceHolderImg
    : `data:image;base64,${bufferToImage(listing.Product.image.data)}`

  return (
    <ProductContainer onClick={onClickHandler} className='product-container'>
      <ProductWrapper className={'product-wrapper'} style={{ backgroundImage: `url(${imgSrc})` }} />
      <div>
        <h3>{listing.title}</h3>
        <p>{listing.Producer.name}</p>
        <p style={{ color: '#159847', fontWeight: 'bold' }}>{`${listing.price_per_unit} kr / ${listing.Product.unit}`}</p>
      </div>
    </ProductContainer>
  )
}

export default ListingComponent
