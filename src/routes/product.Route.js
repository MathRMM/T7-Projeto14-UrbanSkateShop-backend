import express from 'express'
import { addProduct, getProduct } from '../controllers/product.Controller.js'

const routerproduct = express.Router()

routerproduct.post('/adicionarProdutos', addProduct);
routerproduct.get('/produtos', getProduct);

export default routerproduct