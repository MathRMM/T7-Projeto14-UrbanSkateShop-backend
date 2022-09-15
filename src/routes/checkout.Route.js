import express from 'express'

import { authPrivateRoutes } from '../middleware/auth.Middleware.js'
import { post_checkout, get_checkout } from '../controllers/checkout.Controller.js'


const router = express.Router()

router.post('/checkout', authPrivateRoutes, post_checkout)
router.get('/checkout', authPrivateRoutes, get_checkout)

export default router