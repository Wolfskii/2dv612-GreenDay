import { Router } from 'express'
import { verify } from './verifyToken' // This import is required for private routes, as well as the middleware call of 'verify' in the http-method functions below

const router = Router()

router.get('/', verify, (req: any, res: any) => {
  return res.json({
    examplePrivatePosts: {
      createdByUserId: req.user, // req.user object can be retrieved from private routes using the JWT-token
      title: 'Some content',
      description:
        'Some private data that requires the user to be logged in to see'
    }
  })
})

export default router
