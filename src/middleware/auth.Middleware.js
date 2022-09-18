import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { authSignInSchema, authSignUpSchema } from '../Schemas/authSchemas.js'
import { MONGO_SESSIONS, MONGO_USERS } from '../database/dataService.js'

async function authSignUp(req, res, next) {
    const { name, email, password,
        address, state, country } = req.body
    if (!name || !email || !password ||
        !address || !state || !country) return res.sendStatus(400);

    const data = {
        name,
        email,
        password,
        address,
        state: state.toUpperCase(),
        country,
    }

    const isValid = authSignUpSchema.validate(data, { abortEarly: false })

    if (isValid.error) {
        const errors = isValid.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    try {
        const alreadyExist = await MONGO_USERS({ find: { email, } })
        if (alreadyExist) return res.status(409).send({ message: 'Já existe uma conta nesse E-mail.' })
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }

    res.locals.user = {
        name, email, password,
        address, state, country
    }
    next()
}

async function authSignIn(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) return res.sendStatus(400)

    const data = {
        email,
        password,
    }

    const isValid = authSignInSchema.validate(data, { abortEarly: false })

    if (isValid.error) {
        const errors = isValid.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    try {
        const emailIsValid = await MONGO_USERS({ find: { email, } })
        if(!emailIsValid) return res.status(404).send({message:'E-mail não encontrado'})
        const hashPassword = bcrypt.compareSync(password, emailIsValid.hashPassword)
        if (!hashPassword) return res.status(401).send({ message: "email ou senha errada." })
        res.locals.user = { 
            userId: emailIsValid._id,
            Name: emailIsValid.name
        }
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }

    next()
}

async function authPrivateRoutes(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.send(400)
    const secretKey = process.env.JWT_SECRET

    try {
        const tokenIsValid = await MONGO_SESSIONS({ find: { token, } })
        if (!tokenIsValid) return res.sendStatus(401)
        const userId = jwt.verify(tokenIsValid.token, secretKey)
        res.locals.user = userId
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
    next()
}

export {
    authSignIn,
    authSignUp,
    authPrivateRoutes
}