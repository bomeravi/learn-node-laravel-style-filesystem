import express from 'express';
const router = express.Router();

import pageRouter from "./pageRouter.js"

router.use(pageRouter)
//router.use('/user',userRouter);

export {router} ;