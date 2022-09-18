import {paymentSchema} from '../Schemas/authSchemas.js'

async function checkoutMiddleware(req, res, next){
    const payment = req.body.payment
    if(!payment) return res.sendStatus(400)

    const isValid = paymentSchema.validate({payment,})
    if (isValid.error) {
        const errors = isValid.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    next()
}