import { Router } from 'express'
import customerController from '../controllers/customerController'
import { user, customer } from '../middleware/auth'

const router = Router()

// Get customer by id
router.get('/customer/:id', customerController.getCustomer)

// List customers
router.get('/customer', customerController.listCustomers)

// Update customer
router.put('/customer/', user, customer, customerController.updateCustomer)

// Delete customer
router.delete('/customer/:id', customerController.deleteCustomer)

export default router
