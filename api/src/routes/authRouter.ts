import { Router } from 'express'
import authController from '../controllers/authController'
import { user, admin } from '../middleware/auth'

const router = Router()
/* Auth user */
router.post('/login', authController.login)

/* Token needed for these routes */
router.get('/user', user, authController.user)

/* Register customer */
router.post('/register/customer', authController.registerCustomer) // TODO: Saknas middlewares som i producer?

/* Register producer */
router.post('/register/producer', user, admin, authController.registerProducer)

/* Delete user */
router.delete('/delete/:id', user, admin, authController.deleteUser)

export default router
