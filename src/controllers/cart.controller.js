import { MONGO_CART, MONGO_CARTUPDATE } from "../database/dataService.js"; 
import { ObjectId } from 'mongodb';

async function addToCart(req, res){
    const product = res.locals.product;
    const {userId} = res.locals.user;

    try {

        const userCart = await MONGO_CART({find:({userId: ObjectId(userId)}, {paid:false})})
        if(!userCart[0]) {
            await MONGO_CART({insert:{
                products: [
                    {
                        productId: ObjectId(product._id),
                        title: product.title,
                        description:product.description,
                        url_image: product.url_image,
                        type: product.type,
                        newValue: product.newValue 
                    }
                ], 
                userId: ObjectId(userId),
                paid: false
            }});
            return res.status(201).send('criado o primeiro item do carrinho');
        }

        userCart.map(async (cart)=>{
                cart.products.push( {
                    productId: ObjectId(product._id),
                    title: product.title,
                    description:product.description,
                    url_image: product.url_image,
                    type: product.type,
                    newValue: product.newValue 
                })
                await MONGO_CARTUPDATE(cart._id, {
                    products: cart.products,
                    userId: cart.userId,
                    paid: cart.paid
                })
                console.log(cart._id)
            })
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function getCart(req, res){
    const{userId} = res.locals.user
    try {
       
        const userCart = await MONGO_CART({find: ({userId: ObjectId(userId)}, {paid:false})})
        if(!userCart[0]) return res.status(404).send('Usuario não tem produtos no carrinho')
        let amountCart = 0
        userCart[0].products?.map(item => amountCart += item.newValue)
        userCart[0].amount = amountCart
        return res.status(200).send(userCart[0])
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export {addToCart, getCart};