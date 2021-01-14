import { Router } from 'express'
import listingController from '../controllers/listingController'
import { user, producer } from '../middleware/auth'

const router = Router()

// List all listings
router.get('/listing/all', listingController.listAllListings)

// List latest listings
router.get('/listing/latest/', listingController.listLatestListings)

// List listings from a producer
router.get('/listing/', user, producer, listingController.listListings)

// Create listing
router.post('/listing', user, producer, listingController.createListing)

// Update Listing
router.put('/listing/:id', user, producer, listingController.updateListing)

// Delete listing
router.delete('/listing/:id', user, producer, listingController.deleteListing)

// Get listing by id
router.get('/listing/:id', listingController.getListing)

export default router
