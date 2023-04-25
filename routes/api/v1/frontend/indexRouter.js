import express from 'express';
const router = express.Router();
import authRouter from "./authRouter.js";
import userRouter from "./user/indexRouter.js";
import pageRouter from "./pageRouter.js"


router.use(authRouter);
router.use(pageRouter)
//User Namespace
router.use('/user',userRouter);

export {router};