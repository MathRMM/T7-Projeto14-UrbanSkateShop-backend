import express from "express";
import cors from 'cors'

import authRoute from './routes/auth.Route.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use(authRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Listen on port ${PORT}` ))