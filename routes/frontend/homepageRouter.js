import homepage from "../../controllers/frontend/homepage.js";

import express from 'express';
const router = express.Router()
router.get('/',homepage);

export default router;
