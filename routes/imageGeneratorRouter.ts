import express,{ Express, Router } from "express";
const router:Router = express.Router();

import imageGenerateController from "../controllers/imageGenerateController";

router.post("/generate", imageGenerateController);


export default router;
