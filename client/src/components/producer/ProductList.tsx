/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* Components */
import ProductItem from './ProductItem'
import { Container, Row, Col } from 'react-bootstrap'

/* Own Libraries */
import {
  IconDashboard,
  IconCursor,
  IconEditPen,
  IconTrashBin,
  IconFarmWoman,
  IconEmptySoil,
  IconBagPlus
} from '../common/svgIcons'

import { token } from '../../assets/functions/getTokenFromLocalStorage'

interface Product {
  id: number
  producer_id: number
  name: string
  description: string
  category_id: number
  stock: number
  unit: string
  image: any
}

interface Category {
  id: number
  name: string
  description: string
}

const config: any = {
  headers: {
    'Content-type': 'application/json',
    'x-auth-token': token()
  }
}

const ProductsList = (): any => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios('/api/category', config)
      setCategories(result.data)
    }
    const getProducts = async () => {
      // TODO: REPLACE WITH A SPECIFIC PRODUCER'S PRODUCTS
      const result = await axios('/api/product', config)
      setProducts(result.data)
    }
    getCategories().then(() => {
      getProducts()
    })
  }, [])

  const handleListUpdate = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct
      }
      return product
    })
    setProducts([...updatedProducts])
  }

  const handleListDelete = (updatedProduct: Product) => {
    setProducts(
      [...products].filter((product) => product.id !== updatedProduct.id)
    )
  }

  // TODO: Use <Col> to change size depending on screen width (e.g., <Col sm={12}, md={6}>...)
  // <Row> should be moved outside the loop (one row has many columns)
  return (
    <Container className="h-100">
      {!products.length && (
        <div className="h-100 d-flex align-items-center w-100 text-gradient">
          <h1 className="text-center w-100">
            Åh nej! Här finns det inga produkter.
          </h1>
        </div>
      )}
      <Row className="justify-content-md-center">
        {products.map((product) => {
          return (
            <Col
              key={product.id}
              sm={12}
              md={6}
              lg={4}
              style={{ maxWidth: '400px', margin: '2em' }}
            >
              <ProductItem
                product={product}
                categories={categories}
                handleListUpdate={handleListUpdate}
                handleListDelete={handleListDelete}
              ></ProductItem>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ProductsList
