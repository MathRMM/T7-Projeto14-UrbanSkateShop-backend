import express from 'express'

import { authPrivateRoutes } from '../middleware/auth.Middleware.js'


const router = express.Router()

router.post('/checkout', /* authPrivateRoutes, */ (req,res)=> res.send('check'))

export default router