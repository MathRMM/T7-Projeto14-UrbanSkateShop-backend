import { MONGO_SESSIONS, MONGO_USERS } from "../database/dataService.js";
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

async function signIn(req, res){

    res.sendStatus(200)
}

async function signUp(req, res){
    const {name, email, password, 
        address, state, country} = req.body
    if(!name || !email || !password
        || !address || !state || !country)  return res.sendStatus(400)

    /* try {
        const user = MONGO_USERS({insert:{
            name,
            email,
            password,
            address,
            state,
            country,
        }})
        console.log(user)
    } catch (error) {
        return res.sendStatus(500)
    } */

    res.sendStatus(200)
}

export {
    signUp,
    signIn
}