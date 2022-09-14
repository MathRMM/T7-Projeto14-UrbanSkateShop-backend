import express from 'express'

import {signIn, signUp} from '../controllers/auth.Controller.js'
import {authSignUp, authSignIn , authPrivateRoutes} from '../middleware/auth.Middleware.js'

const router = express.Router()

router.post('/signIn', authSignIn, signIn)
router.post('/signUp', authSignUp, signUp)

// exemplo para rota privada
//isso aqui é só um teste que sera apagado no futuro
router.get('/private', authPrivateRoutes, (req,res)=>res.send('valido'))

export default router