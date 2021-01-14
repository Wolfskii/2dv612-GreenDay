import { Router } from 'express'
import searchController from '../controllers/searchController'

const router = Router()

// Get category by id
router.get('/search/:query', searchController.list)

router.get('/search/producer/:id', searchController.listProducer)

export default router
