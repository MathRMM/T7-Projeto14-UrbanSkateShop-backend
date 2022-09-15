import express from 'express';
import { addToCart, getCart }from '../controllers/cart.controller.js';
import { authPrivateRoutes } from '../middleware/auth.Middleware.js'

const routerCart = express.Router();

routerCart.post('/carrinho',  authPrivateRoutes,  addToCart);
routerCart.get('/carrinho',   authPrivateRoutes,  getCart);


export default routerCart;