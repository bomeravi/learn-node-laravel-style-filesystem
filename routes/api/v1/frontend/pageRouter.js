import express from 'express'

const router = express.Router()

import * as pageController from '../../../../controllers/api/v1/backend/pageController.js'
import authApiMiddleware from './../../../../middlewares/authApi.js'



router.get('/page/:pageId',authApiMiddleware,pageController.showPage)


export default router