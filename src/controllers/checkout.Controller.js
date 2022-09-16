import {MONGO_CARTUPDATE, MONGO_CART} from '../database/dataService.js'
import { ObjectId } from 'mongodb';

async function post_checkout(req,res){
    const{userId} = res.locals.user
    const {payment} = req.body
    if(!payment) return res.sendStatus(400);

    try {
        const userCart = await MONGO_CART({find:({userId: ObjectId(userId)}, {paid:false})})
        if(!userCart[0]) return res.sendStatus(404)
        let amountCart = 0
        let _userCart = userCart.find(cart => cart.paid === false)
        _userCart.products.map(item => amountCart += item.newValue)
        _userCart.amount = amountCart
        if(Number(payment) >= amountCart){
            console.log('pago')
            userCart[0].paid = true
        }
        console.log(userCart[0]._id)
        const up = await MONGO_CARTUPDATE(userCart[0]._id, userCart[0])
        console.log(up)
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

async function get_checkout(req,res){
    const{userId} = res.locals.user
    const {payment} = req.body
    if(!payment) return res.sendStatus(400);

    try {
        const userCart = await MONGO_CART({find:({userId: ObjectId(userId)}, {paid:true})})
        if(!userCart[0]) return res.sendStatus(404)
        
        return res.status(200).send(userCart)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export {
    post_checkout,
    get_checkout}