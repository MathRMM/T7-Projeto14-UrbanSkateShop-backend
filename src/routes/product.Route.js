import express from 'express'
import { addProduct, getProduct, getProductId, getSearch } from '../controllers/product.Controller.js'

const router = express.Router()

router.post('/products', addProduct);
router.get('/products', getProduct);
router.get('/products/:productId', getProductId);
router.get('/products/search/:text', getSearch)

export default router