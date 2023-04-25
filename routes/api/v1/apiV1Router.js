import express from 'express';
const router = express.Router();
import  ErrorHandler from './../../../controllers/api/v1/errors/errorHandler.js'
import NotFoundHandler from './../../../controllers/api/v1/errors/notFound.js'
import {router as adminIndexRouter} from './backend/indexRouter.js'
import {router as frontendIndexRouter} from './frontend/indexRouter.js'


router.use('/admin',adminIndexRouter);
 router.use(frontendIndexRouter);
router.use('/*', NotFoundHandler)
router.use('/*', ErrorHandler)

export default router ;
