import express from 'express'

const router = express.Router()

import * as pageController from '../../../../controllers/api/v1/backend/pageController.js'
import authApiMiddleware from './../../../../middlewares/authApi.js'


router.get('/page',authApiMiddleware,pageController.listPage)
router.post('/page',authApiMiddleware,pageController.storePage)
router.get('/page/:pageId',authApiMiddleware,pageController.showPage)
router.post('/page/:pageId',authApiMiddleware,pageController.updatePage)
router.post('/page/:pageId/delete',authApiMiddleware, pageController.deletePage)


export default router