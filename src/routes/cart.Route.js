import express from 'express';
import { addToCart }from '../controllers/cart.controller.js'

const routerCart = express.Router();

routerCart.post('/carinho', addToCart);

export default routerCart;