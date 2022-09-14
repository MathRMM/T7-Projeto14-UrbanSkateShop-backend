import { MONGO_SESSIONS, MONGO_USERS } from "../database/dataService.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function signIn(req, res){
    const {email, password} = res.locals.user
    const dataToToken = {email,}
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(dataToToken, secretKey)

    try {
        /* await MONGO_SESSIONS({insert:{
            email,
            token,
        }}) */
        return res.status(200).send(token)
    } catch (error) {
        return res.sendStatus(500)
    } 
}

async function signUp(req, res){
    const {name, email, password,
    address, state, country} = res.locals.user

    const SALT = Number(process.env.SALT)
    console.log(SALT)
    const hashPassword = bcrypt.hashSync(password, SALT)
        
    try {
        /* await MONGO_USERS({insert:{
            name,
            email,
            hashPassword,
            address,
            state,
            country,
        }}) */
        return res.sendStatus(201)
    } catch (error) {
        return res.sendStatus(500)
    } 
}

export {
    signUp,
    signIn
}