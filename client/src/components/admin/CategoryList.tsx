/* eslint-disable camelcase */
/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* Functions */
import { token } from '../../assets/functions/getTokenFromLocalStorage'

/* Components */
import CategoryItem from './CategoryItem'
import { Container, Row, Col } from 'react-bootstrap'

interface Category {
  id: number
  name: string
  description: string
}

const CategoryList = (): any => {
  const [categories, setCategories] = useState<Category[]>([])

  const config: any = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token()
    }
  }

  useEffect(() => {
    const getCategories = async () => {
      const result = await axios('/api/category', config)
      setCategories(result.data)
    }
    getCategories()
  }, [])

  const handleListUpdate = (updatedCategory: Category) => {
    let oldCategory = categories.find(
      (category) => category.id === updatedCategory.id
    )
    oldCategory = updatedCategory
    setCategories([...categories])
  }

  const handleListDelete = (updatedCategory: Category) => {
    setCategories(
      [...categories].filter((category) => category.id !== updatedCategory.id)
    )
  }

  // TODO: Use <Col> to change size depending on screen width (e.g., <Col sm={12}, md={6}>...)
  // <Row> should be moved outside the loop (one row has many columns)
  return (
    <Container fluid>
      {categories.map((category) => {
        return (
          <Row key={category.id} className="justify-content-md-center">
            <Col sm={10} style={{ maxWidth: '800px' }}>
              <CategoryItem
                category={category}
                handleListUpdate={handleListUpdate}
                handleListDelete={handleListDelete}
              ></CategoryItem>
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default CategoryList
