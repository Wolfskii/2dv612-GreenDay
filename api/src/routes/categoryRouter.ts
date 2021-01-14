import { Router } from 'express'
import categoryController from '../controllers/categoryController'
import { user, admin } from '../middleware/auth'

const router = Router()

// Get category by id
router.get('/category/:id', user, categoryController.getCategory)

// List categories
router.get('/category', categoryController.listCategories)

// Add category
router.post('/category', user, admin, categoryController.addCategory)

// Update category
router.put('/category/:id', user, admin, categoryController.updateCategory)

// Delete category
router.delete('/category/:id', user, admin, categoryController.deleteCategory)

export default router
