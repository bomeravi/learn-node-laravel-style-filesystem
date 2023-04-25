import express from 'express'
import * as apiController from '../../controllers/api/apiController.js'
const router = express.Router()
import  apiV1Router from './v1/apiV1Router.js'

router.get('/',apiController.api) //Since no default url on default. /v1/
router.get('/v1',apiController.v1)
router.use('/v1', apiV1Router)
//for v1 as latest api without /v1 

router.use( apiV1Router)
export default router;
