import {authSignInSchema, authSignUpSchema} from '../Schemas/authSchemas.js'

async function authSignUp (req, res, next){
    const {name, email, password,
    address, state, country} = req.body
    if(!name || !email || !password||
    !address || !state || !country)  return res.sendStatus(400);
    
    const data = {
        name, 
        email, 
        password, 
        address,
        state: state.toUpperCase(),
        country,
    }
    
    const isValid = authSignUpSchema.validate(data, {abortEarly:false})

    if(isValid.error){
        const errors = isValid.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    res.locals.user = {name, email, password, 
        address, state, country}
    next()
}

async function authSignIn (req, res, next){
    const {email, password} = req.body
    if(!email || !password)  return res.sendStatus(400)

    const data = {
        email,
        password,
    }
    
    const isValid = authSignInSchema.validate(data, {abortEarly:false})

    if(isValid.error){
        const errors = isValid.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    res.locals.user = {email, password}
    next()
}

export {
    authSignIn,
    authSignUp
}