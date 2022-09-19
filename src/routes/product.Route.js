import express from 'express'
import { addProduct, getProduct, getProductId } from '../controllers/product.Controller.js'

const router = express.Router()

router.post('/products', addProduct);
router.get('/products', getProduct);
router.get('/products/:productId', getProductId);

export default router