import express from 'express'

import {signIn, signUp} from '../controllers/auth.Controller.js'
import { addProduct, getProduct } from '../controllers/product.Controller.js'

const router = express.Router()

router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.post('/adicionarProdutos', addProduct);
router.get('/produtos', getProduct);

export default router