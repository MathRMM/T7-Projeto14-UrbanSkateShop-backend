import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.MONGO_URI)
const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATA_BASE)
})

async function MONGO_USERS({find, insert}){
    if(find){
        return await db.collection('users').findOne(find)
    }
    if(insert){
        return await db.collection('users').insertOne(insert)
    }
}

async function MONGO_SESSIONS({find, insert, remove}){
    if(find){
        return await db.collection('sessions').findOne(find)
    }
    if(insert){
        return await db.collection('sessions').insertOne(insert)
    }
    if(remove){
        return await db.collection('sessions').insertOne(remove)
    }
} 

async function MONGO_PRODUCTS({find, insert, remove}){
    if(find){
        return await db.collection('products').find(find).toArray();
    }
    if(insert){
        return await db.collection('products').insertOne(insert)
    }
    if(remove){
        return await db.collection('products').insertOne(remove)
    }
}

export {
    MONGO_USERS,
    MONGO_SESSIONS,
    MONGO_PRODUCTS
}