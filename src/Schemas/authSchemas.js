import joi from 'joi';

const authSignInSchema = joi.object({
    email:joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    password: joi.string().min(8).max(30).required()
})

const authSignUpSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email:joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    password: joi.string().min(8).max(30).required(),
    address: joi.string().min(10).required(),
    state:joi.string().min(2).max(2).required(),
    country:joi.string().required()
})


export {
    authSignInSchema,
    authSignUpSchema
}