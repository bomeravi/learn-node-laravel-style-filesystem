import express from 'express'

import * as profileController from '../../../../../controllers/api/v1/frontend/user/profileController.js'
import authApiMiddleware from '../../../../../middlewares/authApi.js'

const router = express.Router()

router.get('/profile',authApiMiddleware,profileController.showProfile)
router.post('/profile',authApiMiddleware,profileController.updateProfile)
router.post('/change-password',authApiMiddleware,profileController.changePassword)


export default router