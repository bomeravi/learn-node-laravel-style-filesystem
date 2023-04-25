import express from 'express'

import * as diaryTagController from '../../../../../controllers/api/v1/frontend/user/diaryTagController.js'
import authApiMiddleware from './../../../../../middlewares/authApi.js'

const router = express.Router()

router.get('/diary-tag',authApiMiddleware,diaryTagController.listDiaryTag)
router.post('/diary-tag',authApiMiddleware,diaryTagController.storeDiaryTag)
router.get('/diary-tag/:diaryTagId',authApiMiddleware,diaryTagController.showDiaryTag)
router.post('/diary-tag/:diaryTagId',authApiMiddleware,diaryTagController.updateDiaryTag)
router.post('/diary-tag/:diaryTagId/delete',authApiMiddleware, diaryTagController.deleteDiaryTag)

export default router