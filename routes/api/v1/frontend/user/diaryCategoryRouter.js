import express from 'express'

import * as diaryCategoryController from '../../../../../controllers/api/v1/frontend/user/diaryCategoryController.js'
import authApiMiddleware from './../../../../../middlewares/authApi.js'

const router = express.Router()

router.get('/diary-category',authApiMiddleware,diaryCategoryController.listDiaryCategory)
router.post('/diary-category',authApiMiddleware,diaryCategoryController.storeDiaryCategory)
router.get('/diary-category/:diaryCategoryId',authApiMiddleware,diaryCategoryController.showDiaryCategory)
router.post('/diary-category/:diaryCategoryId',authApiMiddleware,diaryCategoryController.updateDiaryCategory)
router.post('/diary-category/:diaryCategoryId/delete',authApiMiddleware, diaryCategoryController.deleteDiaryCategory)

export default router