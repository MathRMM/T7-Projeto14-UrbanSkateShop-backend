import express from 'express';
import { addToCart, getCart }from '../controllers/cart.controller.js';
import { authPrivateRoutes } from '../middleware/auth.Middleware.js';
import {addToCartMiddleware} from '../middleware/addToCart.Middleware.js'

const router = express.Router();

router.post('/cart', authPrivateRoutes, addToCartMiddleware, addToCart);
router.get('/cart', authPrivateRoutes, getCart);


export default router;