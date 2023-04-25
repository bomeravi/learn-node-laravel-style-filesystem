import express from 'express';
const router = express.Router();
import homepageRouter from "./homepageRouter.js";

router.use(homepageRouter);

export default router