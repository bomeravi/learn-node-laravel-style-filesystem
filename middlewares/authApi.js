import User from '../models/user.js'
import RefreshToken from '../models/refresh-token.js'

import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
import { SessionExpiredError } from '../controllers/api/v1/errors/errors.js';

const secret = process.env.JWT_SECRET
const tokenLife = process.env.JWT_EXPIRE
const refreshSecret = process.env.JWT_REFRESH_SECRET
const refreshLife = process.env.JWT_REFRESH_EXPIRE

const authApi =  (req, res, next) => {

    const bearerHeader = req.headers['authorization'];


    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        //console.log('bearerToken : ' + bearerToken);
        //console.log('secret : ' + secret)
        jwt.verify(bearerToken, secret, (err, response) => {
            if (err) {
                console.log(err)
                throw new SessionExpiredError('Token Expired, Please Login again to continue.');
            } else {
                req.token = bearerToken;
                req.user = response;
                next();
            }
        })

    } else {
        throw new SessionExpiredError();
    }
}
export default  authApi