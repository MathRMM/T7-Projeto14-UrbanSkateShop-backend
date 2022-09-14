import express from 'express'

import {signIn, signUp} from '../controllers/auth.Controller.js'
import {authSignUp, authSignIn} from '../middleware/auth.Middleware.js'

const router = express.Router()

router.post('/signIn',authSignIn, signIn)
router.post('/signUp',authSignUp, signUp)

export default router