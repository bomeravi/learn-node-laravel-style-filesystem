import express from 'express';
const router = express.Router();
import diaryRouter from "./diaryRouter.js";
import profileRouter from "./profileRouter.js";
import diaryCategoryRouter from "./diaryCategoryRouter.js";
import diaryTagRouter from "./diaryTagController.js"

router.use(diaryCategoryRouter);
router.use(diaryTagRouter);
router.use(diaryRouter);
router.use(profileRouter)

export default router;