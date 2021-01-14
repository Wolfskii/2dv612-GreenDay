import { Router } from 'express'
import userController from '../controllers/userController'
import { user } from '../middleware/auth'

const router = Router()

// Update user last_time_read
router.put('/user', user, userController.updateLastTimeRead)

export default router
