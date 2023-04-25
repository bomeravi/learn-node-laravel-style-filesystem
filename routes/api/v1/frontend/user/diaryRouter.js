import express from 'express'

import * as diaryController from '../../../../../controllers/api/v1/frontend/user/diaryController.js'
import authApiMiddleware from './../../../../../middlewares/authApi.js'

const router = express.Router()

router.get('/diary',authApiMiddleware,diaryController.listDiary)
router.post('/diary',authApiMiddleware,diaryController.storeDiary)
router.get('/diary/:diaryId',authApiMiddleware,diaryController.showDiary)
router.post('/diary/:diaryId',authApiMiddleware,diaryController.updateDiary)
router.post('/diary/:diaryId/delete',authApiMiddleware, diaryController.deleteDiary)


export default router