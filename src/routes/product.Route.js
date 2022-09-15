import express from 'express'
import { addProduct, getProduct } from '../controllers/product.Controller.js'

const router = express.Router()

router.post('/products', addProduct);
router.get('/products', getProduct);

export default router