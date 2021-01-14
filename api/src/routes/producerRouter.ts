import { Router } from 'express'
import producerController from '../controllers/producerController'
import { user, admin, producer } from '../middleware/auth'

const router = Router()

// Get customer by id
router.get('/producer/:id', producerController.getProducer)

// List producers
router.get('/producer', user, producerController.listProducers)

router.get('/producer_users', user, producerController.listProducersAsUsers)

// Endpoint for admins
router.put('/producer/:producer_id', user, admin, producerController.updateProducer)

// Endpoint for producer
router.put('/producer/', user, producer, producerController.producerUpdateProducer)

router.get('/producer', producerController.listProducers)

router.get('/producer/:producer_id', producerController.getProducer)

export default router
