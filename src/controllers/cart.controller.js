import { MONGO_CART } from "../database/dataService.js"; 

async function addToCart(req, res){
    const {title, description, newValue } = req.body;
    const {userId} = res.locals.user; 
    try {
        const product = await MONGO_CART({insert:{title, description, newValue, userId}});
    console.log(product);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function getCart(req, res){
    const {userId} = res.locals.user; 

    try {
        const product = await MONGO_CART({find:{userId}});
    console.log(product);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {addToCart, getCart};