import express,{Router } from "express";
const router:Router = express.Router();

import { generateImage, generateImageWithForever } from "../controllers/imageGenerateController";
import { genSpeechToText } from "../controllers/speechToText";
import { genImageToVideo } from "../controllers/imageToVideo";
import { genMusic } from "../controllers/generateMusic";
import { restoreImageFaces } from "../controllers/restoreImage";
import { genImageFromSketch } from "../controllers/generateImageFromSketch";
import { convertEnglishToHinglish } from "../controllers/convertEnglishToHinglish";
router.post("/generate", generateImage);
router.post("/generateWithForever", generateImageWithForever);
router.post("/speech-to-text", genSpeechToText)
router.post("/image-to-video",genImageToVideo)
router.post('/generate-music', genMusic)
router.post('/restore-image-faces',restoreImageFaces)
router.post('/generate-image-from-sketch',genImageFromSketch)
router.post('/english-to-hinglish',convertEnglishToHinglish)


export default router;
