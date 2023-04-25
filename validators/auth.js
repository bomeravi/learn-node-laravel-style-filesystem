import {check, validationResult} from 'express-validator';
import User from'./../models/user.js'

const userRegisterValidator =
     [ check('name','Full name is required').notEmpty(),



    check('username','Username is required').notEmpty()
        .bail()
        .trim()
        .isLength({
        min:4,
        max:32
    }).withMessage('Min 4 characters required')
        .custom(value => {
            return User.findOne( {username: value})
                .then(user=> {
                    if(user)
                    return Promise.reject('Username already taken')
                })
        }),
    check('email','Email address is required').notEmpty().bail()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Invalid Email Address')
        //.matches(/.+\@.+\..+/).withMessage('Email Must contain @')
        .isLength({
            min:4,
            max:32
        }).withMessage('Min 6 characters required')
        .custom((value) => {
            return User.findOne({email: value})
                .then(user=> {
                    if(user)
                    return Promise.reject('Email address already exists')

                })
        }),

    check('password','Password is required').notEmpty()
        .bail()
        .isLength({min:6})
        .withMessage('Min 6 characters required'),(req, res, next) => {
    next()
}]

const userLoginValidator =
         [
        check('email','Email is Required').notEmpty()
            .bail()
            .trim()
            .normalizeEmail()
            .isEmail().withMessage('Invalid Email Address')
            //.matches(/.+\@.+\..+/).withMessage('Invalid Email Address')
            .isLength({
                min:6,
                max:32
            }).withMessage('Min 6 characters required'),

        check('password','Password is required').notEmpty()
            .bail()
            .isLength({min:6})
            .withMessage('Min 6 characters required'),(req, res, next) => {
             next()
         }]


export  default { userLoginValidator, userRegisterValidator}
