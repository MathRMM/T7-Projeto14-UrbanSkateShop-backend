import joi from 'joi'

async function checkoutMiddleware(req, res, next){
    const payment = req.body.payment
    if(!payment) return res.sendStatus(400)

    
}