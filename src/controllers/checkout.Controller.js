import dayjs from 'dayjs'

import {MONGO_CARTUPDATE, MONGO_CART} from '../database/dataService.js'
import { ObjectId } from 'mongodb';

async function post_checkout(req,res){
    const{userId} = res.locals.user
    const {payment} = res.locals.payment
    if(!payment) return res.sendStatus(400);
    console.log(payment)

    try {
        const userCart = await MONGO_CART({find:({userId: ObjectId(userId)}, {paid:false})})
        if(!userCart[0]) return res.sendStatus(404)
        let amountCart = 0
        userCart[0].products.map(item => amountCart += item.newValue)
        userCart[0].amount = amountCart
        if(Number(payment) >= amountCart){
            userCart[0].paid = true,
            userCart[0].paymentTime = dayjs().format("HH:mm:ss / DD-MM-YYYY")
        }
        await MONGO_CARTUPDATE(userCart[0]._id, userCart[0])
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

async function get_checkout(req,res){
    const{userId} = res.locals.user

    try {
        const userCart = await MONGO_CART({find:({$and:[{userId: ObjectId(userId)}, {paid:true}]})})
        if(!userCart[0]) return res.sendStatus(404)
        
        return res.status(200).send(userCart)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export {
    post_checkout,
    get_checkout
}