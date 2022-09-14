import express from "express";
import cors from 'cors'

import authRoute from './routes/auth.Route.js'
import productRoute from './routes/product.Route.js'
import cartRoute from './routes/cart.Route.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use(authRoute);
app.use(productRoute);
app.use(cartRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Listen on port ${PORT}` ))