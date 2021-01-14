import { Router } from 'express'
import messageController from '../controllers/messageController'
import { user, producer } from '../middleware/auth'

const router = Router()

router.get('/new-messages', user, messageController.getNewMessages)

router.get('/message/last10', user, messageController.getLast10Messages)

router.get('/message/all', user, messageController.getAllMessages)

router.get('/message', user, producer, messageController.getMessagesFromProducer)

router.post('/message', user, producer, messageController.createMessage)

router.put('/message/:id', user, producer, messageController.updateMessage)

router.delete('/message/:id', user, producer, messageController.deleteMessage)

export default router
