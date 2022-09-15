import joi from 'joi'

import { MONGO_PRODUCTS } from "../database/dataService.js"; 
import { ObjectId } from 'mongodb';

async function addToCartMiddleware(req,res,next){
    const {productId} = req.body;
    const {userId} = res.locals.user;
    if(!productId || !userId) {
        return res.sendStatus(400);
    }
    
    try {
        const product = await MONGO_PRODUCTS({find:{_id: ObjectId(productId)}})
        if(!product) return res.sendStatus(404)
        res.locals.product = product[0]
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
    next()
}

export {addToCartMiddleware}