import { MONGO_CART } from "../database/dataService.js"; 

async function addToCart(req, res){
    const { _id } = req.body;
    const {userId} = res.locals.user;

    try {
        const product = await MONGO_CART({insert:{_id, userId}});
    console.log(product);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {addToCart};