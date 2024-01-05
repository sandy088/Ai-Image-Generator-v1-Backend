import { Request, Response } from "express";
import upscaleImg from "../utils/ImageGenerationUtils/imageGenerate";

import dotenv from "dotenv";
import { verifyKey } from "@unkey/api";
dotenv.config();
const generateImage = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    const tokenExp = req.headers['tokenexp'] || req.cookies.tokenExp || "expiryToken";
    console.log(req.headers)
    
    if(!tokenExp || tokenExp === "expiryToken"){
      console.log(tokenExp)
      return res.status(401).json({
        message: "Token Not Found",
      });
    }
    //validations
    const {result, error} = await verifyKey(tokenExp);

    if(!result?.valid){
      console.log("In Not valid function")
      return res.status(401).json({
        success:false,
        message: "unauthorized or your limit exceeded (Purchase a plan to increase your limit)",
      })
    }
    if(error){
      console.log("In error function")
      return res.status(401).json({
        success:false,
        error: error,
      })
    }

    if (!prompt || prompt === "") {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    if (!token || token !== process.env.API_TOKEN) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    const output: { error?: string } = await upscaleImg(prompt);

    if (output.error) {
      return res.status(500).json({
        message: "Error in generating image",
        error: output.error,
      });
    }

    return res.status(200).json({
      message: "Image generated",
      output: output,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in generating image",
      error: error,
    });
  }
};

export default [generateImage];
