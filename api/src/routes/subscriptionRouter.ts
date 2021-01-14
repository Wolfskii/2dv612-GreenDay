import { Router } from 'express'
import subscriptionController from '../controllers/subscriptionController'
import { user } from '../middleware/auth'

const router = Router()

// All producers subscribed to.
router.get('/subscription', user, subscriptionController.getSubscriptions)

router.get('/subscription/producers', user, subscriptionController.getProducersSubscribedTo)

router.post('/subscription', user, subscriptionController.addSubscription)

router.delete('/subscription/:id', user, subscriptionController.removeSubscription)

export default router
