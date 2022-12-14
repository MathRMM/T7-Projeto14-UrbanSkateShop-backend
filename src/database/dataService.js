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
        return await db.collection('sessions').deleteOne(remove)
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
        return await db.collection('products').deleteOne(remove)
    }
}

async function MONGO_CART({find, insert, remove}){
    if(find){
        return await db.collection('cart').find(find).toArray();
    }
    if(insert){
        return await db.collection('cart').insertOne(insert)
    }
    if(remove){
        return await db.collection('cart').deleteOne(remove)
    }
}

async function MONGO_CARTUPDATE(accountId, update){
    await db.collection('cart').updateOne(
        { _id: accountId },
        { $set: update }
        )
}

async function MONGO_CHECKOUT({find, insert, remove}){
    if(find){
        return await db.collection('checkout').find(find).toArray();
    }
    if(insert){
        return await db.collection('checkout').insertOne(insert)
    }
    if(remove){
        return await db.collection('checkout').deleteOne(remove)
    }
}

export {
    MONGO_USERS,
    MONGO_SESSIONS,
    MONGO_PRODUCTS,
    MONGO_CART,
    MONGO_CHECKOUT,
    MONGO_CARTUPDATE
}