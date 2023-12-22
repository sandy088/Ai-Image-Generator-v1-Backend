import express,{ Express, Router } from "express";
import { auth } from "../middleware/auth";
const router:Router = express.Router();

import imageGenerateController from "../controllers/imageGenerateController";

router.post("/generate", imageGenerateController);


export default router;
