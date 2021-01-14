import { Router } from 'express'
import productController from '../controllers/productController'
import multer from 'multer'
import { user, producer } from '../middleware/auth'

const router = Router()

/**
 * Multer settings (for file upload)
 */
// Max size ca 3MB
const maxSize = 3 * 1024 * 1024
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(null, true)
  }
})

// Get product by id
router.get('/product/:id', user, producer, productController.getProduct)

// List products
router.get('/product/', user, producer, productController.listProducts)

// Add product
router.post('/product', user, producer, upload.single('file'), productController.addProduct)

// Update product
router.put('/product/:id', user, producer, upload.single('file'), productController.updateProduct)

// Delete product
router.delete('/product/:id', user, producer, productController.deleteProduct)

export default router
