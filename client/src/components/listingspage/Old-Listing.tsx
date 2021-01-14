/* Lib */
import React from 'react'
import './style.css'

type Props = {
  key: number;
  listingData: any;
  productData: any;
}

const OldListing: React.FC<Props> = ({ key, listingData, productData }: Props) => {
  console.log(listingData.listing)

  const bufferToImage = (data: number[]) => {
    return Buffer.from(data).toString('base64')
  }

  const productImage = {
    backgroundImage: `url(${`data:image;base64,${bufferToImage(productData.image.data)}`})`
  }

  return (
    <div className='listing-container'>
      <a href={'/annonser/' + listingData.id}><div className='listing-wrapper' style={productImage} /></a>
      <div key={ key } className='listing'>
        <a href={'/annonser/' + listingData.id}><h3 className='listing-headings' >{listingData.title}</h3></a>
        <p className='min-qty'><span className='accented'>Minsta mängd: </span>{listingData.min_quantity}</p>
        <p className='price-text'>{listingData.price_per_unit} kr / {productData.unit}</p>
      </div>
    </div>
  )
}

export default OldListing
