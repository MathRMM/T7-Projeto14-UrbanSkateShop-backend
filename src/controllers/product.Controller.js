import {MONGO_PRODUCTS} from "../database/dataService.js";

async   function addProduct (req, res) {
    const {title, description, url_image, type, value} = req.body;
    const newValue = value*100
    try {
        const product = await MONGO_PRODUCTS({insert:{title, description, url_image, type, newValue }});
    console.log(product);
    res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async   function getProduct (req, res) {
    try {
        const products = await MONGO_PRODUCTS({find:{}});

    console.log(products);
    res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export {
    addProduct,
    getProduct
}