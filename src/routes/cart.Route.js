import express from 'express';
import { addToCart, getCart }from '../controllers/cart.controller.js';
import { authPrivateRoutes } from '../middleware/auth.Middleware.js'

const routerCart = express.Router();

routerCart.post('/carinho', /* authPrivateRoutes,  */addToCart);
routerCart.get('/carinho', /* authPrivateRoutes, */ getCart);

export default routerCart;