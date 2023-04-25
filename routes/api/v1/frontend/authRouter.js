import express from 'express'

import * as authController from '../../../../controllers/api/v1/frontend/auth.js'
import userValidator from './../../../../validators/auth.js'
import apiValidationCheck from './../../../../middlewares/apiValidationCheck.js'


const router = express.Router()


router.post('/login',userValidator.userLoginValidator,apiValidationCheck,authController.postLogin)
router.post('/register',userValidator.userRegisterValidator,apiValidationCheck,authController.postRegister)

router.get('/logout', authController.logout)
router.post('/logout', authController.logout)

export default router;