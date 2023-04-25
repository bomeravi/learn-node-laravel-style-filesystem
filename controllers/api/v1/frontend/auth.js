import User from '../../../../models/user.js';
import RefreshToken from '../../../../models/refresh-token.js';


import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
dotenv.config();

import { SuccessData, ServerErrorData ,FailedData} from '../responseData.js';

import jwt from 'jsonwebtoken'

//constants for session generation
const secret = process.env.JWT_SECRET
const tokenLife = process.env.JWT_EXPIRE
const refreshSecret = process.env.JWT_REFRESH_SECRET
const refreshLife = process.env.JWT_REFRESH_EXPIRE



const postLogin = (req,res,next)=> {

    const email = req.body.email;
    const password = req.body.password;
    const ip = req.ip;
    //const {email,password} = req.body
    let current_user;
    User.findOne({ email }).select('+password')
        .then(user => {
            //console.log(user)
            // req.user = user;
            if(user){
                current_user = user;
                console.log(password)
                return user.comparePassword(password).then(resp => {
                    if(resp){

                        let user=current_user.toJSON()
                        delete user.password

                        const token = jwt.sign(user, secret, { expiresIn: tokenLife})
                        //const token = jwt.sign(user, secret)
                        const refreshToken = uuidv4() //jwt.sign(user, refreshSecret, { expiresIn: refreshLife})


                        let temp_refreshToken =  new RefreshToken ({
                            userId: current_user,
                            token: token,
                            refreshToken: refreshToken,
                            createdByIp: ip
                        })
                        temp_refreshToken.save() .then(result => {

                            res.json(SuccessData({
                                success: true,
                                data: {
                                    user: user,
                                    token: token,
                                    refreshToken: refreshToken
                                },
                                message: "login Successful"
                            }))

                        })
                            .catch(err=>{
                                console.log(err)
                            })
                        //
                        // const message = {
                        //     from: 'admink@admin.com', // Sender address
                        //     to: 'to@email.com',         // List of recipients
                        //     subject: 'Login Success', // Subject line
                        //     // text: 'login successful' // Plain text body
                        //     html: '<b>login successful</b>' // Plain text body
                        // };
                        // transport.sendMail(message, function(err, info) {
                        //     if (err) {
                        //         console.log(err)
                        //     } else {
                        //         console.log(info);
                        //     }
                        // });
                    }
                    else {
                        res.status(401).json(FailedData({success: false, code: 401,message: "login Failed, Incorrect email or password"}))
                    }
                })
                    .catch(err=> {
                        console.log(err)
                    })
            }
            else {
                  res.status(401).json(FailedData({success: false,code: 401, message: "login Failed, User not found"}))
                return false;
            }
        })
        .catch(err =>{
            res.status(401).json(FailedData({success: false,code: 401, message: "login Failed, User not found"}))
        })
}



const postRegister = (req,res,next) =>{

    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password
    User.findOne({email: email}) 
    .then(user=>{
        if(!user){
            //create register
            const temp_user = new User({
                name: name,
                username: username,
                email: email,
                password : password
            })
            temp_user.save()
                .then(result => {
                    // console.log(result);
                    res.json(SuccessData({success: true, message: "User Created Successfully"}))
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(ServerErrorData({success: false, message: "Something went wrong"}))
                });
        }
        else {
            res.status(403).json(FailedData({
                success: false,
                code: 403,
                message: "Email already Exists"
            }))
            //res.redirect('/register')
            //display message already Registered.
            //Send back to register page.
        }
    })
}


const logout = (req, res, next) => {
    jwt.destroy(req.token)
    RefreshToken.findOneAndDelete({token: req.token }, function (err, docs) {
        if (err){
            req.status(403).json(FailedData({"success": false,message: "Logout not available"}))
            console.log(err)
        }
        else{
            req.status(200).json(SuccessData({"success": true,message: "Logout successfully"}))
        }
    });

}


export {postLogin,postRegister,logout}